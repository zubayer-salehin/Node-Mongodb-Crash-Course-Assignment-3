const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const validator = require("validator");
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid Email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 3,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                }),
            message: "Password {VALUE} is not strong enough.",
        },
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Passwords don't match!",
        },
    },
    role: {
        type: String,
        enum: ["Candidate", "Hiring Manager", "Admin"],
        default: "Candidate",
    },
    firstName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    lastName: {
        type: String,
        required: [true, "Please provide a first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number"],
    },
    presentAddress: {
        type: String,
        trim: true,
        minLength: [3, "Present Address must be at least 3 characters."],
        maxLength: [100, "Present Address is too large"]
    },
    permanentAddress: {
        type: String,
        trim: true,
        minLength: [3, "Permanent Address must be at least 3 characters."],
        maxLength: [100, "Permanent Address is too large"]
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid image url"],
    },
    resumeURL: {
        type: String,
        required: [true, "Please provide a resume url"],
        validate: [validator.isURL, "Please provide a valid resume url"],
    },
    jobApplyIds: [{
        type: ObjectId,
        ref: "Job"
    }]
},
    {
        timestamps: true,
    }
);


userSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
})

userSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
}


const User = mongoose.model("User", userSchema);


module.exports = User;

/*

{
  "email": "zubayersalehin@gmail.com",
  "password": "zubayer12345#6",
  "confirmPassword": "zubayer12345#6",
  "firstName": "Zubayer",
  "lastName": "Salehin",
  "contactNumber": "01736261114",
  "presentAddress": "944 osthir Street",
  "permanentAddress": "944 Russell Street",
  "imageURL": "https://i.ibb.co/WnFSs9Y/unnamed.webp",
  "resumeURL": "https://drive.google.com/file/d/16DMCQX1kGPhMUVdz7xBZ-2pCWxGM94p2/view?usp=share_link"
}

*/