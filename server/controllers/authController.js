const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Sign up
exports.signup = async (req, res) => {
    try {
        const { name, email, password, address, number, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password,
            address,
            number,
            role
        });

        await user.save();

        // Generate token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
                number: user.number
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Sign in
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email, password);
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
                number: user.number
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 