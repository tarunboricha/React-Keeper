import React from "react";

function Footer(props) {
    const year = new Date().getFullYear();
    return (
        <div className="footer" style={{ bottom: props.notes.length === 0 ? 0 : '-10vh' }}>
            Copyright &copy; {year}
        </div>
    );
}

export default Footer;