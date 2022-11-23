module.exports = (role) => {
    return (req, res, next) => {
        const userRole = req?.user?.role;
        if (userRole !== role) {
            return res.status(403).json({
                status: "fail",
                error: "You are not authorized access this!"
            })
        }
        next();
    }
}