import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const VolunteerDashboard = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [view, setView] = useState('available'); // 'available', 'requests', or 'accepted'

    useEffect(() => {
        fetchFoodItems();
    }, [view]);

    const fetchFoodItems = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            let endpoint;
            
            switch(view) {
                case 'available':
                    endpoint = 'http://localhost:3000/food/available';
                    break;
                case 'requests':
                    endpoint = 'http://localhost:3000/food/volunteer/my-requests';
                    break;
                case 'accepted':
                    endpoint = 'http://localhost:3000/food/volunteer/accepted-requests';
                    break;
            }
            
            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            setFoodItems(response.data);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch food items');
        } finally {
            setLoading(false);
        }
    };

    const handleRequest = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:3000/food/volunteer/${id}/request`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFoodItems();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to request food item');
        }
    };

    const handleCancelRequest = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:3000/food/volunteer/${id}/cancel-request`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFoodItems();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to cancel request');
        }
    };

    const handleMarkDelivered = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:3000/food/volunteer/${id}/mark-delivered`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFoodItems();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to mark as delivered');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="dashboard">
            <h1>Volunteer Dashboard</h1>
            
            <div className="view-buttons">
                <button 
                    className={`view-button ${view === 'available' ? 'active' : ''}`}
                    onClick={() => setView('available')}
                >
                    Available Food
                </button>
                <button 
                    className={`view-button ${view === 'requests' ? 'active' : ''}`}
                    onClick={() => setView('requests')}
                >
                    My Requests
                </button>
                <button 
                    className={`view-button ${view === 'accepted' ? 'active' : ''}`}
                    onClick={() => setView('accepted')}
                >
                    Accepted Requests
                </button>
            </div>

            <div className="food-items">
                {foodItems.map(item => (
                    <div key={item._id} className="food-item">
                        <h3>{item.foodName}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Location: {item.address}</p>
                        <p>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</p>
                        <p>Donated by: {item.user.name}</p>
                        <p className={`status ${item.status}`}>{item.status}</p>
                        
                        {view === 'available' && item.status === 'available' && (
                            <button 
                                onClick={() => handleRequest(item._id)}
                                className="request-button"
                            >
                                Request Food
                            </button>
                        )}
                        
                        {view === 'requests' && item.status === 'pending' && (
                            <button 
                                onClick={() => handleCancelRequest(item._id)}
                                className="cancel-button"
                            >
                                Cancel Request
                            </button>
                        )}

                        {view === 'accepted' && item.status === 'claimed' && !item.isDelivered && (
                            <button 
                                onClick={() => handleMarkDelivered(item._id)}
                                className="deliver-button"
                            >
                                Mark as Delivered
                            </button>
                        )}

                        {view === 'accepted' && item.status === 'claimed' && item.isDelivered && (
                            <p className="delivery-status delivered">
                                Delivered on: {new Date(item.deliveryDate).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VolunteerDashboard; 