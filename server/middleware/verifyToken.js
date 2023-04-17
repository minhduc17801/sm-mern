import jwt from 'jsonwebtoken';

export const verifyToken = async function (req, res, next) {
    try {
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader)
            return res
                .status(401)
                .json({ msg: 'Invalid authorization header' });
        const token = authorizationHeader.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET_ACCESS_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};
