import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const DonorDashboard = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        foodName: '',
        foodTag: '',
        quantity: '',
        expiryDate: '',
        address: ''
    });

    useEffect(() => {
        fetchDonatedFood();
    }, []);

    const fetchDonatedFood = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/donor/my-food', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFoodItems(response.data);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch donated food items');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/donor/add-food', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShowForm(false);
            setFormData({
                foodName: '',
                foodTag: '',
                quantity: '',
                expiryDate: '',
                address: ''
            });
            fetchDonatedFood();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add food item');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/donor/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchDonatedFood();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to delete food item');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="dashboard">
            <h1>Donor Dashboard</h1>
            
            <button 
                className="add-food-button"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'Add Food Item'}
            </button>

            {showForm && (
                <form className="food-form" onSubmit={handleSubmit}>
                    <h2>Add New Food Item</h2>
                    <div className="form-group">
                        <label>Food Name</label>
                        <input
                            type="text"
                            name="foodName"
                            value={formData.foodName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Food Tag</label>
                        <input
                            type="text"
                            name="foodTag"
                            value={formData.foodTag}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            required
                            min="1"
                        />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            )}

            <div className="food-items">
                {foodItems.map(item => (
                    <div key={item._id} className="food-item">
                        <h3>{item.foodName}</h3>
                        <p>Tag: {item.foodTag}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Location: {item.address}</p>
                        <p>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</p>
                        <p className={`status ${item.status}`}>{item.status}</p>
                        
                        {item.requestedBy && (
                            <p>Requested by: {item.requestedBy.name}</p>
                        )}
                        
                        <button 
                            onClick={() => handleDelete(item._id)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonorDashboard; 