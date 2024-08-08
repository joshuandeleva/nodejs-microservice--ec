const jwt = require('jsonwebtoken');
exports.isAuthenticated = (req, res, next) => {
    const token = req.headers("X-Authorization")
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized', status: 'FAILED' });
    }
    try {
        //check if token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token', status: 'FAILED' });
    }
}