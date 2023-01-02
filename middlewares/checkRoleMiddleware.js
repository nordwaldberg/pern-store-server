const jwt = require('jsonwebtoken');

function checkRole(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: 'User is unauthorized' });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_KEY);

            if (decodedToken.role !== role) {
                return res.status(403).json({ message: 'Access denied' });
            }

            req.user = decodedToken;

            next();

        } catch (err) {
            res.status(401).json({ message: 'User is unauthorized' });
        }
    }
}

module.exports = checkRole;