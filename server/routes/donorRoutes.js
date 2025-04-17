import express from 'express';
import { 
    getDonatedFood, 
    addFood, 
    updateFood, 
    deleteFood 
} from '../controllers/donorController.js';
import { auth } from '../middleware/auth.js';
import { isDonor } from '../middleware/isDonor.js';

const donorRouter = express.Router();

// All routes require authentication and donor role
donorRouter.use(auth, isDonor);

// Get all food items donated by the user
donorRouter.get('/my-food', getDonatedFood);

// Add new food item
donorRouter.post('/add-food', addFood);

// Update food item
donorRouter.put('/:id', updateFood);

// Delete food item
donorRouter.delete('/:id', deleteFood);

export default donorRouter; 