import React, { useState } from "react";
import axios from "axios";
import "../css/signin.css"

function SignUp(props) {
    const headers = {
        'ngrok-skip-browser-warning': 'any_value_you_want',
        'Content-Type': 'application/json',
    };
    const [isdanger, setisDanger] = useState(false);
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
        setisDanger(false);
        setMessage("Please wait your OTP is generating...")
        const url = "https://e12f-103-250-162-221.ngrok-free.app";

        axios.post(`${url}/sendEmail`, signupdetail, {headers}).then((response) => {
            // console.log(response);
            setisOtp(true);
            signupdetail.otp = response.data.otp;
            setMessage("Please enter the code sent to " + signupdetail.email);
        }).catch((error) => {
            // console.log(error);
            setMessage("OTP failed please try again...");
            setisDanger(true);
        })
    }

    function submit() {
        const url = "https://e12f-103-250-162-221.ngrok-free.app/users";
        if (signupdetail.otp === signupdetail.userotp) {
            axios.post(url, signupdetail, {headers})
                .then((response) => {
                    setMessage("Signup suceessfully!!..");
                    setTimeout(() => {
                        showSignin();
                    }, 1000);
                })
                .catch((error) => {
                    // console.log(error);
                    setMessage("Error");
                    setisDanger(true);
                    setTimeout(() => {
                        setMessage("");
                        setisDanger(false);
                    }, 2500);
                })
        }
        else {
            setMessage("Please enter a valid otp");
            setisDanger(true);
            setTimeout(() => {
                setMessage("Please enter the code sent to " + signupdetail.email);
                setisDanger(false);
            }, 2500);
        }
    }

    return (
        <div>
            <div className="con">
                <p style={{ textAlign: 'center', color: isdanger ? 'red' : 'green' }}>{message}</p>
                <div className="outsidediv">
                    <div className="containerr">
                        <div className="headerr">
                            <div className="headersub">Sign up</div>
                            <div className="headersub">Create your account</div>
                        </div>
                        <div className="name">
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
                        </div>
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