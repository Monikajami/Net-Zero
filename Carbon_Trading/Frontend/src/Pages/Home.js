import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleTradeClick = (type) => {
        if (type === 'buy') {
            navigate('/sellerlist'); // Redirect to /sellerlist for buying
        } else {
            navigate('/seller', { state: { type } }); // Redirect to /seller for selling
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Carbon Exchange</h1>
                <p>Your trusted platform for trading carbon credits.</p>
            </header>
            <section className="buyer-seller-section">
                <h2>Trade Carbon Credits</h2>
                <div className="buyer-seller-cards">
                    <div className="card buyer-card">
                        <h3>Buy Carbon Credits</h3>
                        <p>Invest in carbon credits to offset your emissions.</p>
                        <button onClick={() => handleTradeClick('buy')}>Buy Now</button>
                    </div>
                    <div className="card seller-card">
                        <h3>Sell Carbon Credits</h3>
                        <p>Monetize your surplus carbon credits.</p>
                        <button onClick={() => handleTradeClick('sell')}>Sell Now</button>
                    </div>
                </div>
            </section>
            <section className="features">
                <h2>Features</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                            <path d="M12 2v20M2 12h20M5 7l-3 3 3 3M19 17l3-3-3-3" />
                        </svg>
                        <h3>Easy Trading</h3>
                        <p>Seamlessly buy and sell carbon credits with our user-friendly platform.</p>
                    </div>
                    <div className="feature-card">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                            <path d="M3 17.5V20h18v-2.5M7 11V8h2v3h-2zm4 0V8h2v3h-2zm4 0V8h2v3h-2zm4 0V8h2v3h-2zM3 7h18M3 4h18" />
                        </svg>
                        <h3>Real-Time Analytics</h3>
                        <p>Access real-time data and analytics to make informed trading decisions.</p>
                    </div>
                    <div className="feature-card">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 1c-3.86 0-7 3.14-7 7v1h14v-1c0-3.86-3.14-7-7-7z" />
                        </svg>
                        <h3>Community Support</h3>
                        <p>Join our community of traders and experts for guidance and support.</p>
                    </div>
                    <div className="feature-card">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                            <path d="M12 2L2 12h3v8h6v-5h2v5h6v-8h3L12 2z" />
                        </svg>
                        <h3>Sustainability Initiatives</h3>
                        <p>Support projects that promote sustainability and reduce emissions.</p>
                    </div>
                    <div className="feature-card">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                            <path d="M12 2c-3.31 0-6 2.69-6 6 0 1.7.68 3.24 1.76 4.24L1 22l4-4.88A5.973 5.973 0 0012 20c3.31 0 6-2.69 6-6s-2.69-6-6-6zM8 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
                        </svg>
                        <h3>Carbon Offsetting</h3>
                        <p>Offset your carbon footprint by investing in renewable projects.</p>
                    </div>
                    <div className="feature-card">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                            <path d="M10 18h8v2h-8zm-8-6h16v2H2zm0-6h20v2H2z" />
                        </svg>
                        <h3>Transparent Pricing</h3>
                        <p>Clear and transparent pricing structures for all transactions.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
