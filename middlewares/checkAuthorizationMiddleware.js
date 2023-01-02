const jwt = require('jsonwebtoken');

function checkAuthorization(req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'User is unauthorized' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        req.user = decodedToken;

        next();

    } catch (err) {
        res.status(401).json({ message: 'User is unauthorized' });
    }
}

module.exports = checkAuthorization;