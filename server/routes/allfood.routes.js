import { Router } from "express";
import { auth, adminAuth } from '../middleware/auth.js';
import Food from "../models/food.js";

const router = Router();

// Get all food items (admin only)
router.get("/", adminAuth, async (req, res) => {
    try {
        const foods = await Food.find().populate('user', 'name email');
        res.json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// Get available food items (volunteers can see this)
router.get("/available", auth, async (req, res) => {
    try {
        // const foods = await Food.find({ claimed: false }).populate('user', 'name email');
        const foods = await Food.find({ });
        res.json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" }); 
    }
});

// Claim a food item (volunteers only)
router.post("/:id/claim", auth, async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        
        if (food.claimed) {
            return res.status(400).json({ message: "Food item already claimed" });
        }
        
        food.claimed = true;
        food.claimedBy = req.user._id;
        await food.save();
        
        res.json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.delete("/deletefood/:id", async (req, res) => {
    try {
        const foodId = req.params.id;
        const deletedFood = await Food.findByIdAndDelete(foodId);
        
        if (!deletedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        
        res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
