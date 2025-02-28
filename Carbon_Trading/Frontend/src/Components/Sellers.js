import React, { useState } from 'react';
import styles from './Sellers.module.css';

const Sellers = () => {
    const [companyName, setCompanyName] = useState('');
    const [emissionsAvailable, setEmissionsAvailable] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [price, setPrice] = useState('');
    const [industry, setIndustry] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        if (!token) {
            setError('You must be logged in to submit this form.');
            return;
        }

        const sellerData = {
            companyName,
            emissionsAvailable: parseFloat(emissionsAvailable), // Ensure this is a number
            dueDate: new Date(dueDate).toISOString(), // Format the date correctly
            price: parseFloat(price), // Ensure this is a number
            industry,
        };

        console.log('Submitting seller data:', sellerData); // Debugging line

        try {
            const response = await fetch('http://localhost:4000/sellers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include token in Authorization header
                },
                body: JSON.stringify(sellerData), // Ensure this is a valid JSON string
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                setSuccess('Seller data saved successfully!');
                setError('');
                // Clear form fields after successful submission
                setCompanyName('');
                setEmissionsAvailable('');
                setDueDate('');
                setPrice('');
                setIndustry('');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to save seller data');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Error submitting form');
            setSuccess('');
        }
    };

    return (
        <div className={styles.sellerForm}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="companyName">Company Name:</label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="emissionsAvailable">Emissions Available (tons):</label>
                    <input
                        type="number"
                        id="emissionsAvailable"
                        value={emissionsAvailable}
                        onChange={(e) => setEmissionsAvailable(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="price">Price per ton (USD):</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="industry">Industry:</label>
                    <input
                        type="text"
                        id="industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
                
                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>{success}</div>}
            </form>
        </div>
    );
};

export default Sellers;
