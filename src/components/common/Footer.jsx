import React from "react";
import "../../style/footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <ul>
                    <li><NavLink to="/">About Us</NavLink></li>
                    <li><NavLink to="/">Contact Us</NavLink></li>
                    <li><NavLink to="/">Terms & Conditions</NavLink></li>
                    <li><NavLink to="/">Privacy Policy</NavLink></li>
                    <li><NavLink to="/">FAQs</NavLink></li>
                </ul>
            </div>
            <div className="footer-info">
                <p>&copy; 2024 Swiftmart. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
