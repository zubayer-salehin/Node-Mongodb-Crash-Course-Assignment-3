const jwt = require("jsonwebtoken");
const { promisify } = require("util");


module.exports = async (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")?.[1]
        if (!token) {
            res.status(400).json({
                status: "fail",
                message: "You are not logged In"
            });
        }
        const decoded = await promisify(jwt.verify)(token, process.env.tokenSecret);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }

}