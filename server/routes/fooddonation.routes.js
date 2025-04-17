import { Router } from "express";
import { auth } from '../middleware/auth.js';
import Food from "../models/food.js";
import User from "../models/user.js";

const router = Router();

// Route to handle food donation form submission
router.post("/", auth, async (req, res) => {
    try {
        const { foodName, foodTag, quantity, expiryDate, address } = req.body;

        // Save the form data to the database
        const food = await Food.create({
            foodName,
            quantity,
            expiryDate,
            address,
            foodTag,
            user: req.user._id,
        });

        await food.save();
        
        // Update user's food array
        const user = await User.findById(req.user._id);
        user.food.push(food._id);
        await user.save();

        res.status(201).json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get all food items for the logged-in user
router.get("/my-food", auth, async (req, res) => {
    try {
        const foods = await Food.find({ user: req.user._id });
        res.json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
