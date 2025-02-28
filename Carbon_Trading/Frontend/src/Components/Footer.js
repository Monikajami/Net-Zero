import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-links">
                    <h4>Options Available</h4>
                    <ul>
                        <li><a href="/features">Features</a></li>
                        <li><a href="/pricing">Pricing</a></li>
                        <li><a href="/support">Support</a></li>
                    </ul>
                </div>
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="/Users/hemanth/Desktop/Carbon_Trading/Carbon_Trading/carbontrading/src/Images/2023_Facebook_icon.svg.png" alt="Facebook" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <img src="Carbon_Trading/carbontrading/src/Images/8e72f7331b652b842b0c271ab144d332.jpg" alt="Twitter" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src="Carbon_Trading/carbontrading/src/Images/LinkedIn_icon.svg.png" alt="LinkedIn" />
                        </a>
                    </div>
                </div>
            </div>
            <p>© 2024 Carbon Exchange. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
