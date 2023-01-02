const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../errors-handlers/apiError');
const { User, Basket } = require('../models/models');

const generateJWTToken = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.JWT_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async signUp(req, res, next) {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return next(ApiError.handleBadRequestError('Email and password is required'));
        }

        const isUserAlreadyExists = await User.findOne({where: {email}});

        if (isUserAlreadyExists) {
            return next(ApiError.handleBadRequestError('User with that email is already exists'));
        }

        const passwordHash = await bcrypt.hash(password, 7);

        const user = await User.create({ email, role, password: passwordHash});

        const userBasket = await Basket.create({ userId: user.id });

        const token = generateJWTToken(user.id, user.email, user.role);

        return res.json({token});
    }

    async signIn(req, res, next) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }});

        if (!user) {
            return next(ApiError.handleBadRequestError('User with that email is not exists'));
        }

        let isCorrectPassword = bcrypt.compareSync(password, user.password);

        if (!isCorrectPassword) {
            return next(ApiError.handleBadRequestError('Incorrect password'));
        }

        const token = generateJWTToken(user.id, user.email, user.role);

        return res.json({token});
    }

    async authCheck(req, res, next) {
        const token = generateJWTToken(req.user.id, req.user.email, req.user.role);
        return res.json({token});
    }
}

module.exports = new UserController();