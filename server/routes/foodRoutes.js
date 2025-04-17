import express from 'express';
import { 
    getAvailableFood, 
    getUserRequests, 
    requestFood, 
    cancelRequest,
    approveRequest,
    rejectRequest,
    getPendingRequests,
    getAcceptedRequests,
    getVolunteerAcceptedRequests,
    markAsDelivered
} from '../controllers/foodController.js';
import { auth } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/available', getAvailableFood);

// Volunteer routes - require authentication
const volunteerRoutes = express.Router();
volunteerRoutes.use(auth);
volunteerRoutes.get('/my-requests', getUserRequests);
volunteerRoutes.get('/accepted-requests', getVolunteerAcceptedRequests);
volunteerRoutes.post('/:id/request', requestFood);
volunteerRoutes.post('/:id/cancel-request', cancelRequest);
volunteerRoutes.post('/:id/mark-delivered', markAsDelivered);
router.use('/volunteer', volunteerRoutes);

// Admin routes - require admin role
const adminRoutes = express.Router();
adminRoutes.use(auth, isAdmin);
adminRoutes.get('/pending-requests', getPendingRequests);
adminRoutes.get('/accepted-requests', getAcceptedRequests);
adminRoutes.post('/:id/approve', approveRequest);
adminRoutes.post('/:id/reject', rejectRequest);
router.use('/admin', adminRoutes);

export default router; 