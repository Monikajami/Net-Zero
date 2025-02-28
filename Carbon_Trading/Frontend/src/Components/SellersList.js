import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SellersList.css';

const SellersList = () => {
    const [sellers, setSellers] = useState([]);
    const [filteredSellers, setFilteredSellers] = useState([]);
    const [error, setError] = useState(null);

    const [minEmissions, setMinEmissions] = useState('');
    const [maxEmissions, setMaxEmissions] = useState('');
    const [sortField, setSortField] = useState('emissionsAvailable');
    const [sortOrder, setSortOrder] = useState('asc');
    const [buyerName, setBuyerName] = useState('');
    const [companyName, setCompanyName] = useState('');

    // Popup form state
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState(null);

    useEffect(() => {
        const fetchSellers = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('You must be logged in to view the seller list.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:4000/sellers', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                setSellers(response.data);
                setFilteredSellers(response.data);
            } catch (error) {
                setError('Failed to fetch sellers data.');
            }
        };

        fetchSellers();
    }, []);

    const handleFilterChange = () => {
        let filtered = sellers;

        if (minEmissions) {
            filtered = filtered.filter(seller => seller.emissionsAvailable >= minEmissions);
        }
        if (maxEmissions) {
            filtered = filtered.filter(seller => seller.emissionsAvailable <= maxEmissions);
        }

        filtered = filtered.sort((a, b) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];

            if (sortOrder === 'asc') {
                return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
            } else {
                return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
            }
        });

        setFilteredSellers(filtered);
    };

    const handleSortFieldChange = (event) => {
        setSortField(event.target.value);
        handleFilterChange();
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
        handleFilterChange();
    };

    // Handle Send Request (open the popup)
    const handleSendRequest = (seller) => {
        setSelectedSeller(seller);
        setIsPopupOpen(true);
    };

    // Close the popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleRequestSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to send a request.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/request', 
                {
                    sellerId: selectedSeller._id, 
                    buyerName,
                    companyName,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('Request sent successfully!');
            closePopup();
        } catch (error) {
            setError('Failed to send request.');
        }
    };

    return (
        <div className="sellers-list-container">
            <h2>Sellers List</h2>

            {/* Display Error if Any */}
            {error && <div className="error-message">{error}</div>}

            {/* Filter Inputs for Emissions */}
            <div className="filter-container">
                <div className="filter-input">
                    <label>Min Emissions (tons):</label>
                    <input
                        type="number"
                        value={minEmissions}
                        onChange={(e) => setMinEmissions(e.target.value)}
                        placeholder="Min Emissions"
                    />
                </div>
                <div className="filter-input">
                    <label>Max Emissions (tons):</label>
                    <input
                        type="number"
                        value={maxEmissions}
                        onChange={(e) => setMaxEmissions(e.target.value)}
                        placeholder="Max Emissions"
                    />
                </div>
            </div>

            {/* Sort Dropdowns for Sorting by Field and Order */}
            <div className="sort-container">
                <div className="sort-input">
                    <label>Sort by:</label>
                    <select value={sortField} onChange={handleSortFieldChange}>
                        <option value="companyName">Company Name</option>
                        <option value="emissionsAvailable">Emissions Available</option>
                        <option value="price">Price per Ton</option>
                        <option value="industry">Industry</option>
                    </select>
                </div>

                <div className="sort-input">
                    <label>Order:</label>
                    <select value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <button className="apply-filters-button" onClick={handleFilterChange}>Apply Filters & Sort</button>
            </div>

            {/* Display Sellers in Grid Layout */}
            <div className="company-cards">
                {filteredSellers.length === 0 ? (
                    <p>No sellers found.</p>
                ) : (
                    filteredSellers.map((company) => (
                        <div key={company._id} className="company-card">
                            <h3>{company.companyName}</h3>
                            <p>Emissions Available: {company.emissionsAvailable} tons</p>
                            <p>Due Date: {new Date(company.dueDate).toLocaleDateString()}</p>
                            <p>Price per ton: ${company.price.toFixed(2)}</p>
                            <p>Industry: {company.industry}</p>

                            <button 
                                className="send-request-button" 
                                onClick={() => handleSendRequest(company)}
                            >
                                Send Request
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Popup Form */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-form">
                        <h3>Send Request</h3>
                        <label>Buyer Name:</label>
                        <input
                            type="text"
                            value={buyerName}
                            onChange={(e) => setBuyerName(e.target.value)}
                            placeholder="Enter Buyer Name"
                        />
                        <label>Your Company Name:</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Enter Company Name"
                        />
                        <button onClick={handleRequestSubmit}>Submit Request</button>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellersList;
