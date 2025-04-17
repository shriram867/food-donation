import Food from '../models/food.js';
import User from '../models/user.js';

// Get all food items donated by a specific user
export const getDonatedFood = async (req, res) => {
    try {
        const userId = req.user._id;
        const foodItems = await Food.find({ user: userId })
            .populate('requestedBy', 'name email')
            .sort({ createdAt: -1 });
        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new food item
export const addFood = async (req, res) => {
    try {
        const userId = req.user._id;
        const { foodName, foodTag, quantity, expiryDate, address } = req.body;

        const foodItem = new Food({
            foodName,
            foodTag,
            quantity,
            expiryDate,
            address,
            user: userId,
            status: 'available'
        });

        await foodItem.save();
        res.status(201).json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update food item
export const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const updates = req.body;

        const foodItem = await Food.findOne({ _id: id, user: userId });
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        Object.keys(updates).forEach(key => {
            foodItem[key] = updates[key];
        });

        await foodItem.save();
        res.json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete food item
export const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const foodItem = await Food.findOne({ _id: id, user: userId });
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        await foodItem.remove();
        res.json({ message: 'Food item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 