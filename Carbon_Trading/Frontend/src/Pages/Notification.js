import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('You must be logged in to view notifications.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/requests', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                setRequests(response.data);
            } catch (error) {
                setError('Failed to fetch requests data.');
            }
        };

        fetchRequests();
    }, []);

    // Inline styles
    const styles = {
        container: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f7f7f7',
            minHeight: '100vh',
        },
        heading: {
            textAlign: 'center',
            color: '#333',
        },
        errorMessage: {
            color: 'red',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        listContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
        },
        card: {
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            padding: '20px',
            width: '80%',
            maxWidth: '600px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
        cardHeader: {
            margin: '0 0 10px',
            color: '#333',
        },
        cardText: {
            margin: '5px 0',
            color: '#555',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Notifications</h2>

            {/* Display Error if Any */}
            {error && <div style={styles.errorMessage}>{error}</div>}

            {/* Display Requests */}
            {requests.length === 0 ? (
                <p>No new requests.</p>
            ) : (
                <div style={styles.listContainer}>
                    {requests.map((request) => (
                        <div key={request._id} style={styles.card}>
                            <h3 style={styles.cardHeader}>Request from {request.buyerName}</h3>
                            <p style={styles.cardText}><strong>Company:</strong> {request.companyName}</p>
                            <p style={styles.cardText}><strong>Seller:</strong> {request.sellerId.companyName}</p>
                            <p style={styles.cardText}><strong>Date Requested:</strong> {new Date(request.dateRequested).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
