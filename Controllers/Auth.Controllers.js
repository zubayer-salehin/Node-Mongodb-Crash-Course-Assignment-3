const { createUserServices, findUserByEmail } = require("../Services/Auth.Services");
const { generateToken } = require("../Utils/generateToken");


exports.getUserByToken = async (req, res) => {
    try {

        const user = await findUserByEmail(req.user.email);

        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: "Success",
            message: "Successfully Get User information",
            data: others
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get User information",
            error: error.message
        })
    }
}


exports.createUser = async (req, res) => {
    try {

        const newUser = await createUserServices(req.body);

        res.status(200).json({
            status: "Success",
            message: "Successfully created a new User",
            data: newUser
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't create User",
            error: error.message
        })
    }
}


exports.userLogin = async (req, res) => {

    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                message: "Please provide your credantials"
            })
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "No user Found, Please create an Account"
            })
        }

        const isPasswordValid = user.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({
                status: "fail",
                message: "Password is not correct"
            })
        }

        const token = await generateToken(user);
        const { password: pwd, ...others } = user.toObject();

        res.status(200).json({
            status: "success",
            messgae: "Login user successfully!",
            data: { user: others, token }
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Something Went Wrong, Please try again",
            error: error.message,
        });
    }
}