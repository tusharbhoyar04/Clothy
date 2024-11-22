import React from 'react';
import '../style/Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h1><span>Clothy.</span></h1>
                    <p>Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context.</p>
                </div>
                <div className="footer-links">
                    <div className="link-section">
                        <h4>Home</h4>
                        <p>Mens</p>
                        <p>Womens</p>
                        <p>Accessories</p>
                    </div>
                    <div className="link-section">
                        <h4>Company</h4>
                        <p>About us</p>
                        <p>Community</p>
                        <p>Reviews</p>
                        <p>FAQ</p>
                    </div>
                    <div className="link-section">
                        <h4>Gift Cards</h4>
                        <p>Buy gift card</p>
                        <p>About gift card</p>
                        <p>Redeem gift card</p>
                        <p>Corporate gift card</p>
                    </div>
                    <div className="link-section">
                        <h4>Social</h4>
                        <div><p><FaInstagram /></p><span>Instagram</span></div>
                        <div><p><FaTwitter /></p><span>Twitter</span></div>
                        <div> <p><FaFacebook /></p><span>Facebook</span></div>
                        <div> <p><FaLinkedin /></p><span>LinkedIn</span></div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer-info">
                <p>Privacy Policy</p>
                <p>All rights reserved 2013 @Clothy</p>
                <p>Terms & Conditions</p>
            </div>
        </footer>
    );
};

export default Footer;
