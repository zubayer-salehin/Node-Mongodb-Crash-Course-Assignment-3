const User = require("../Models/Auth.Model")


exports.createUserServices = async (userInfo) => {
    const newUser = await User.create(userInfo);
    return newUser;
}

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}