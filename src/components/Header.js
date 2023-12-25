import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header(props) {
    const nav = useNavigate();
    const [username, setUsername] = useState(undefined);
    useEffect(() => {
        let user = localStorage.getItem('user');
        if (user)
            setUsername(JSON.parse(user)[0].firstname);
    }, []);

    function logout() {
        localStorage.removeItem('/React-Keeper');
        setUsername(undefined);
        props.logout();
    }

    return (
        <div className="header">
            <h1 onClick={() => { nav('/React-Keeper') }}>Keeper</h1>
            <div className="header-item">
                <h5 onClick={() => {
                    if (!username) {
                        nav('/React-Keeper/user')
                    }
                }}>{username ? username : "User"}</h5>
                <h5 onClick={() => {
                    if (username) {
                        logout();
                    }
                }}>{username ? "Logout" : ""}</h5>
            </div>
        </div>
    );
};

export default Header;