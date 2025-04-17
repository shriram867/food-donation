import Food from '../models/food.js';
import User from '../models/user.js';

// Get all available food items
export const getAvailableFood = async (req, res) => {
    try {
        const foodItems = await Food.find({ status: 'available' })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get food items requested by a specific user
export const getUserRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const foodItems = await Food.find({ requestedBy: userId })
            .populate('user', 'name email')
            .sort({ requestDate: -1 });
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Request a food item
export const requestFood = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const foodItem = await Food.findById(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        if (foodItem.status !== 'available') {
            return res.status(400).json({ message: 'Food item is not available' });
        }

        foodItem.status = 'pending';
        foodItem.requestedBy = userId;
        foodItem.requestDate = new Date();
        await foodItem.save();

        res.json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel a food request
export const cancelRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const foodItem = await Food.findById(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        if (foodItem.requestedBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this request' });
        }

        if (foodItem.status !== 'pending') {
            return res.status(400).json({ message: 'Food item is not in pending state' });
        }

        foodItem.status = 'available';
        foodItem.requestedBy = null;
        foodItem.requestDate = null;
        await foodItem.save();

        res.json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Approve a food request
export const approveRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const foodItem = await Food.findById(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        if (foodItem.status !== 'pending') {
            return res.status(400).json({ message: 'Food item is not in pending state' });
        }

        foodItem.status = 'claimed';
        await foodItem.save();

        res.json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Reject a food request
export const rejectRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const foodItem = await Food.findById(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        if (foodItem.status !== 'pending') {
            return res.status(400).json({ message: 'Food item is not in pending state' });
        }

        foodItem.status = 'available';
        foodItem.requestedBy = null;
        foodItem.requestDate = null;
        await foodItem.save();

        res.json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all pending food requests (Admin only)
export const getPendingRequests = async (req, res) => {
    try {
        const foodItems = await Food.find({ status: 'pending' })
            .populate('user', 'name email')
            .populate('requestedBy', 'name email')
            .sort({ requestDate: -1 });
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all accepted requests (Admin only)
export const getAcceptedRequests = async (req, res) => {
    try {
        const foodItems = await Food.find({ status: 'claimed' })
            .populate('user', 'name email')
            .populate('requestedBy', 'name email')
            .sort({ updatedAt: -1 });
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get volunteer's accepted requests
export const getVolunteerAcceptedRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const foodItems = await Food.find({ 
            status: 'claimed',
            requestedBy: userId 
        })
        .populate('user', 'name email')
        .sort({ updatedAt: -1 });
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark food as delivered (Volunteer)
export const markAsDelivered = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const foodItem = await Food.findById(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        if (foodItem.requestedBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to mark this item as delivered' });
        }

        if (foodItem.status !== 'claimed') {
            return res.status(400).json({ message: 'Food item is not in claimed state' });
        }

        foodItem.isDelivered = true;
        foodItem.deliveryDate = new Date();
        await foodItem.save();

        res.json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 