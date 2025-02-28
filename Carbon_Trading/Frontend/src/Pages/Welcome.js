import React from 'react';
import './Welcome.css';

const Welcome = () => {
    return (
        <div className="welcome-container">
            <main>
                <h1>Welcome to Carbon Exchange</h1>
                <p>Your trusted platform for trading carbon credits and reducing your carbon footprint.</p>
                <p>
                    At Carbon Exchange, we empower companies to buy and sell carbon credits seamlessly, enabling businesses to meet their sustainability goals while contributing to a greener future.
                </p>
                <p>
                    By participating in carbon trading, companies can sell their unused carbon allowances to other businesses that exceed their limits. This not only promotes environmental responsibility but also opens new revenue streams for companies committed to reducing their carbon emissions.
                </p>
                <p>
                    Join us in the fight against climate change by trading carbon credits effectively and transparently. Whether you're a small business or a large corporation, Carbon Exchange is designed to support your sustainability initiatives.
                </p>
                <button onClick={() => window.location.href='/signup'}>Get Started</button>
                {/* New Features Section */}
                <section className="features-section">
                    <h2>Why Choose Carbon Exchange?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Seamless Trading</h3>
                            <p>Experience a user-friendly interface designed for efficient trading.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Real-Time Analytics</h3>
                            <p>Make informed decisions with our comprehensive data analytics tools.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Community Support</h3>
                            <p>Join a community of like-minded individuals committed to sustainability.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="testimonials-section">
                    <h2>What Our Users Say</h2>
                    <div className="testimonial-card">
                        <p>"Carbon Exchange has transformed the way we approach carbon trading. The platform is intuitive and the support team is outstanding!"</p>
                        <p className="user-name">- Jane Doe, CEO of GreenTech</p>
                    </div>
                    <div className="testimonial-card">
                        <p>"We were able to sell our unused carbon credits quickly and easily. Highly recommend this platform!"</p>
                        <p className="user-name">- John Smith, Sustainability Manager at EcoCorp</p>
                    </div>
                </section>

               
            </main>
        </div>
    );
};

export default Welcome;
