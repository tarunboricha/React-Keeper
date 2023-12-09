import React from "react";

function Footer(props) {
    return (
        <div className="footer" style={{ bottom: props.notes.length === 0 ? '0' : '-10vh' }}>
            Footer
        </div>
    );
}

export default Footer;