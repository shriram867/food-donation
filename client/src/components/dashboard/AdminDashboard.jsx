import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const AdminDashboard = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [view, setView] = useState('pending'); // 'pending', 'accepted', or 'all'

    useEffect(() => {
        fetchFoodItems();
    }, [view]);

    const fetchFoodItems = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            let endpoint;
            
            switch(view) {
                case 'pending':
                    endpoint = 'http://localhost:3000/food/admin/pending-requests';
                    break;
                case 'accepted':
                    endpoint = 'http://localhost:3000/food/admin/accepted-requests';
                    break;
                default:
                    endpoint = 'http://localhost:3000/food/available';
            }
            
            const response = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFoodItems(response.data);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch food items');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:3000/food/admin/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFoodItems();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to approve request');
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:3000/food/admin/${id}/reject`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFoodItems();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to reject request');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="dashboard">
            <h1>Admin Dashboard</h1>
            
            <div className="view-buttons">
                <button 
                    className={`view-button ${view === 'pending' ? 'active' : ''}`}
                    onClick={() => setView('pending')}
                >
                    Pending Requests
                </button>
                <button 
                    className={`view-button ${view === 'accepted' ? 'active' : ''}`}
                    onClick={() => setView('accepted')}
                >
                    Accepted Requests
                </button>
                <button 
                    className={`view-button ${view === 'all' ? 'active' : ''}`}
                    onClick={() => setView('all')}
                >
                    All Food Items
                </button>
            </div>

            <div className="food-items">
                {foodItems.map(item => (
                    <div key={item._id} className="food-item">
                        <h3>{item.foodName}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Location: {item.address}</p>
                        <p>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</p>
                        <p>Donated by: {item.user?.name}</p>
                        <p className={`status ${item.status}`}>{item.status}</p>
                        
                        {view === 'pending' && item.status === 'pending' && (
                            <>
                                <p>Requested by: {item.requestedBy?.name}</p>
                                <p>Requested on: {new Date(item.requestDate).toLocaleDateString()}</p>
                                <div className="action-buttons">
                                    <button 
                                        onClick={() => handleApprove(item._id)}
                                        className="approve-button"
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => handleReject(item._id)}
                                        className="reject-button"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </>
                        )}

                        {view === 'accepted' && item.status === 'claimed' && (
                            <>
                                <p>Requested by: {item.requestedBy?.name}</p>
                                <p>Approved on: {new Date(item.updatedAt).toLocaleDateString()}</p>
                                <p className={`delivery-status ${item.isDelivered ? 'delivered' : 'pending'}`}>
                                    Delivery Status: {item.isDelivered ? 'Delivered' : 'Pending'}
                                </p>
                                {item.isDelivered && (
                                    <p>Delivered on: {new Date(item.deliveryDate).toLocaleDateString()}</p>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard; 