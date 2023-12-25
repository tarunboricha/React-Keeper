import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Signin from "../components/Signin";
import SignUp from "../components/Signup";
import Header from "../components/Header";

const UserScreen = (props) => {
    const nav = useNavigate();
    const [check, setCheck] = useState(true);

    useEffect(() => {
        // console.log('user effect called');
        let user = localStorage.getItem('user');
        if (user) {
            nav('/React-Keeper')
        }
    }, [nav]);

    function showSignup() {
        setCheck(false);
    }

    function showSignin() {
        setCheck(true);
    }
    return (
        <div>
            <Header setTemp={props.setTemp}></Header>
            {check ? <div><Signin signup={showSignup}></Signin></div> : ''}
            {!check ? <div><SignUp signin={showSignin}></SignUp></div> : ''}
        </div>
    );
}

export default UserScreen;