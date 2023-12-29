import React, { useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import "../css/signin.css"

function SignUp(props) {
    const headers = {
        'ngrok-skip-browser-warning': 'any_value_you_want',
        'Content-Type': 'application/json',
    };
    const [isSpinner, setisSpinner] = useState(false);
    const [message, setMessage] = useState("");
    const [isOtp, setisOtp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [signupdetail, updateSignup] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        otp: undefined,
        userotp: undefined
    });

    function showSignin() {
        props.signin();
    }

    function handleshowpass(event) {
        setShowPassword((prev) => !prev);
    }

    const getValueFromInput = (event) => {
        updateSignup({ ...signupdetail, [event.target.id]: event.target.value });
    }

    function generateOtp() {
        if (signupdetail.email === "" || signupdetail.password === "" || signupdetail.firstname === "" || signupdetail.lastname === "") {
            document.getElementById("signupmsg").style.color = 'red';
            setMessage("Fields are Empty");
            setTimeout(() => {
                setMessage("");
            }, 2000);
            return;
        }
        document.getElementById("signupmsg").style.color = 'black';
        setMessage("Please wait..");
        setisSpinner(true);
        const url = "https://822f-2409-4041-d07-20f7-c90c-9fde-200-4c8e.ngrok-free.app";
        let emailAlreadyRegistered = false;
        axios.get(`${url}/users/${signupdetail.email}`, { headers })
            .then((response) => {
                setisSpinner(false);
                if (response && response.data && response.data.length) {
                    document.getElementById("signupmsg").style.color = 'red';
                    setMessage("Email is already registered");
                    emailAlreadyRegistered = true;
                }
            })
            .catch((error) => {
                setisSpinner(false);
                document.getElementById("signupmsg").style.color = 'red';
                setMessage("Server is down please try again later");
                emailAlreadyRegistered = true;
                setTimeout(() => {
                    setMessage("");
                }, 2000);
            }).then(() => {
                if (!emailAlreadyRegistered) {
                    document.getElementById("signupmsg").style.color = 'green';
                    setMessage("Please wait your OTP is generating...")
                    axios.post(`${url}/sendEmail`, signupdetail, { headers }).then((response) => {
                        // console.log(response);
                        setisOtp(true);
                        signupdetail.otp = response.data.otp;
                        document.getElementById("signupmsg").style.color = 'green';
                        setMessage("Please enter the code sent to " + signupdetail.email);
                    }).catch((error) => {
                        // console.log(error);
                        setisSpinner(false);
                        document.getElementById("signupmsg").style.color = 'red';
                        setMessage("OTP failed please try again...");
                    })
                }
            })
    }

    function submit() {
        const url = "https://822f-2409-4041-d07-20f7-c90c-9fde-200-4c8e.ngrok-free.app/users";
        if (signupdetail.otp === signupdetail.userotp) {
            setisSpinner(true);
            document.getElementById("signupmsg").style.color = 'black';
            setMessage("Please wait...");
            axios.post(url, signupdetail, { headers })
                .then((response) => {
                    setisSpinner(false);
                    document.getElementById("signupmsg").style.color = 'green';
                    setMessage("Signup suceessfully!!..");
                    setTimeout(() => {
                        showSignin();
                    }, 1000);
                })
                .catch((error) => {
                    // console.log(error);
                    setisSpinner(false);
                    document.getElementById("signupmsg").style.color = 'red';
                    setMessage("Error");
                    setTimeout(() => {
                        setMessage("");
                    }, 2500);
                })
        }
        else {
            document.getElementById("signupmsg").style.color = 'red';
            setMessage("Please enter a valid otp");
            setTimeout(() => {
                document.getElementById("signupmsg").style.color = 'green';
                setMessage("Please enter the code sent to " + signupdetail.email);
            }, 2500);
        }
    }

    return (
        <div>
            <div className="con">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'5px' }}>
                    {isSpinner ? <Spinner animation="border" size="sm" /> : ""}
                    <p style={{ textAlign: 'center', margin: '0' }} id="signupmsg">{message}</p>
                </div>
                <div className="outsidediv">
                    <div className="containerr">
                        <div className="headerr">
                            <div className="headersub">Sign up</div>
                            <div className="headersub">Create your account</div>
                        </div>
                        {!isOtp ? <div className="name">
                            <div className="firstname">
                                <div className="labl">First name</div>
                                <div>
                                    <input type="text" onChange={getValueFromInput} id="firstname" />
                                </div>
                            </div>
                            <div className="lastname">
                                <div className="labl">Last name</div>
                                <div>
                                    <input type="text" onChange={getValueFromInput} id="lastname" />
                                </div>
                            </div>
                        </div> : ""}
                        <div className="email">
                            <div className="labl">Email address</div>
                            <div>
                                <input type="text" onChange={getValueFromInput} id="email" />
                            </div>
                        </div>
                        <div className="password">
                            <div className="labl">Password</div>
                            <div><input type={
                                showPassword ? "text" : "password"
                            } onChange={getValueFromInput} id="password" /></div>
                            <div className="showpass"><p onClick={handleshowpass} style={{ color: '#005ea2', position: 'absolute', right: '10%', cursor: 'pointer' }}>{!showPassword ? "Show password" : "Hide password"}</p></div>
                        </div>
                        {isOtp ? <div className="otp" style={{ marginTop: '4%' }}>
                            <div className="labl">OTP</div>
                            <div>
                                <input type="text" onChange={getValueFromInput} id="userotp" />
                            </div>
                        </div> : ""}
                        <div className="button" style={{ marginBottom: '0' }}>
                            <button onClick={isOtp ? submit : generateOtp}>{isOtp ? "Create Account" : "Sign up"}</button>
                        </div>
                    </div>
                    {!isOtp ? <div className="dontacc">
                        Already have an account?<p onClick={showSignin} style={{ color: '#005ea2', paddingLeft: '1%', cursor: 'pointer', margin: '0' }}>Sign in now</p>
                    </div> : ""}
                </div>
            </div>
        </div>
    );
}

export default SignUp;