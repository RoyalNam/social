const isAuthenticated = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default isAuthenticated;
