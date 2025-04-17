export const isDonor = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.user.role !== 'donor') {
        return res.status(403).json({ message: 'Donor access required' });
    }

    next();
}; 