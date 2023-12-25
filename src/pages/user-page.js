import React, { useState } from "react";
import Signin from "../components/Signin";
import SignUp from "../components/Signup";
import Header from "../components/Header";

const UserScreen = (props) => {
    const [check, setCheck] = useState(true);

    function showSignup() {
        setCheck(false);
    }

    function showSignin() {
        setCheck(true);
    }
    return (
        <div>
            <Header setTemp={props.setTemp}></Header>
            {check ? <div><Signin setTemp={props.setTemp} signup={showSignup}></Signin></div> : ''}
            {!check ? <div><SignUp signin={showSignin}></SignUp></div> : ''}
        </div>
    );
}

export default UserScreen;