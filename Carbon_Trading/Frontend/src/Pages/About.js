import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <section className="about-content">
                <h1>About Carbon Exchange</h1>
                <p>
                    At Carbon Exchange, our mission is to enable individuals, organizations, and companies 
                    to reduce their carbon footprint by trading carbon credits easily and efficiently.
                </p>
                <p>
                    We aim to promote sustainability by connecting sellers and buyers of carbon credits,
                    helping to mitigate the impacts of climate change. Join us in making the world a greener
                    place for future generations.
                </p>
                <h2>Our Goals</h2>
                <p>
                    Our primary goals are to increase awareness about carbon trading, facilitate easy access to carbon credits, 
                    and empower all stakeholders to participate in sustainable practices.
                </p>
                <p>
                    We strive to educate our users on the importance of reducing carbon emissions and the role that carbon credits 
                    play in achieving this goal. By providing a transparent and user-friendly platform, we encourage proactive 
                    engagement in sustainability efforts.
                </p>
            </section>

            <section className="impact">
                <h2>Environmental Impact</h2>
                <p>
                    Since our inception, Carbon Exchange has facilitated the trading of over <strong>10 million tons</strong> of carbon credits, 
                    contributing significantly to emission reduction initiatives worldwide. 
                </p>
                <p>
                    By connecting businesses with verified carbon offset projects, we ensure that every transaction 
                    leads to real, measurable environmental benefits. Our platform not only supports carbon offsetting projects 
                    but also encourages reforestation, renewable energy, and sustainable agriculture practices.
                </p>
            </section>

            <section className="team">
                <h2>Meet Our Team</h2>
                <p>
                    Our team is composed of passionate environmentalists, technologists, and innovators 
                    who are committed to creating a sustainable future.
                </p>
                <p>
                    Together, we bring a wealth of experience in environmental science, technology development, 
                    and policy advocacy, all aimed at driving meaningful change in carbon management.
                </p>
            </section>

            <section className="future-plans">
                <h2>Future Plans</h2>
                <p>
                    Looking ahead, we plan to expand our platform to include additional features such as real-time tracking 
                    of carbon credits, educational resources on sustainability practices, and partnerships with global 
                    organizations dedicated to environmental protection.
                </p>
                <p>
                    We are committed to continuous improvement and innovation to better serve our community and 
                    contribute to a more sustainable planet. Join us on this journey towards a cleaner, greener future.
                </p>
            </section>
        </div>
    );
};

export default About;
