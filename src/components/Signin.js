import React, { useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import "../css/signin.css"

function Signin(props) {
    const headers = {
        'ngrok-skip-browser-warning': 'any_value_you_want',
        'Content-Type': 'application/json',
    };
    const [isSpinner, setisSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formmessage, setFormmessage] = useState("");
    const [signindetail, updateSignin] = useState({
        email: "",
        password: ""
    })


    const getValueFromInput = (event) => {
        if (event.target.id === "email") {
            updateSignin(prevNote => {
                return {
                    ...prevNote,
                    email: event.target.value
                };
            });
        }
        else {
            updateSignin(prevNote => {
                return {
                    ...prevNote,
                    password: event.target.value
                };
            });
        }
        // console.log(signindetail);
    }

    function showSignup() {
        props.signup();
    }

    function handleshowpass(event) {
        setShowPassword((prev) => !prev);
    }

    function signin() {
        if(isSpinner)
            return;
        if (signindetail.email === "" || signindetail.password === "") {
            setFormmessage("Fields are Empty");
            setTimeout(() => {
                setFormmessage("");
            }, 2000);
            return;
        }
        setisSpinner(true);
        const url = `https://e209-103-250-162-221.ngrok-free.app/users/${signindetail.email}/${signindetail.password}`;
        axios.get(url, {headers})
            .then((response) => {
                setisSpinner(false);
                if (response && response.data && response.data.length) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    document.getElementById("formmessage").style.color = "green"
                    setFormmessage("Sign in successfully!!..")
                    setTimeout(() => {
                        props.setTemp(true);
                    }, 1500);
                }
                else {
                    setisSpinner(false);
                    setFormmessage("Email or password is incorrect");
                    setTimeout(() => {
                        setFormmessage("");
                    }, 2000);
                }
            })
            .catch((error) => {
                setisSpinner(false);
                setFormmessage("Server is down please try again later");
                setTimeout(() => {
                    setFormmessage("");
                }, 2000);
            })
    }

    return (
        <div>
            <div className="con">
                <div className="outsidediv">
                    <div style={{display:'flex', justifyContent:'center'}}>
                        {isSpinner ? <div><Spinner animation="border" size="sm" /> Please wait</div> : ""}
                        <p id="formmessage" style={{ color: 'red', textAlign: 'center' }}>{formmessage}</p>
                    </div>
                    <div className="containerr">
                        <div className="headerr">
                            <div className="headersub">Sign in</div>
                            <div className="headersub">Access your account</div>
                        </div>
                        <div className="email">
                            <div className="labl">Email address</div>
                            <div>
                                <input onChange={getValueFromInput} id="email" type="text" />
                            </div>
                        </div>
                        <div className="password">
                            <div className="labl">Password</div>
                            <div><input type={
                                showPassword ? "text" : "password"
                            } onChange={getValueFromInput} id="password" /></div>
                            <div className="showpass"><p onClick={handleshowpass} style={{ color: '#005ea2', position: 'absolute', right: '10%', cursor: 'pointer' }}>{
                                showPassword ? "Hide password" : "Show password"
                            }</p></div>
                        </div>
                        <div className="button">
                            <button onClick={signin}>Sign
                                in</button>
                        </div>
                        <div className="forgotpass" style={{ color: '#005ea2', cursor: 'pointer' }}>
                            Forgot password?

                        </div>
                    </div>
                    <div className="dontacc">
                        Don't have an account?<p onClick={showSignup} style={{ color: '#005ea2', paddingLeft: '1%', cursor: 'pointer' }}>Create your account now</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;