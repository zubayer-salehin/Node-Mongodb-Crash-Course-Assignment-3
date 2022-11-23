const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types


const jobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please Provide a company Name"],
        trim: true,
        minLength: [3, "Company name must have at least minimum 3 Characters"],
        maxLength: [100, "Company name must have at least maximum 100 Characters"]
    },
    title: {
        type: String,
        required: [true, "Please Provide a job Title"],
        trim: true,
        minLength: [3, "Job title must have at least minimum 3 Characters"],
        maxLength: [50, "Job title name must have at least maximum 50 Characters"]
    },
    responsibilities: {
        type: String,
        required: [true, "Please Provide a job responsibilities"],
        trim: true,
        minLength: [5, "Job requirements must have at least minimum 5 Characters"]
    },
    requirements: {
        type: String,
        required: [true, "Please Provide a job requirements"],
        trim: true,
        minLength: [5, "Job requirements must have at least minimum 5 Characters"]
    },
    education: {
        type: String,
        trim: true,
        minLength: [5, "Educational requirements must have at least minimum 5 Characters"]
    },
    type: {
        type: String,
        required: [true, "Please Provide a job Type"],
        lowercase: true,
        trim: true
    },
    location: {
        type: String,
        required: [true, "Please Provide a Office Location"],
        lowercase: true,
        trim: true
    },
    hours: {
        type: String,
        required: [true, "Please Provide a office Hours"],
        trim: true
    },
    days: {
        type: String,
        required: [true, "Please Provide a office Days"],
        trim: true
    },
    salary: {
        type: Number,
        trim: true
    },
    languages: {
        type: String,
        trim: true
    },
    bonus: {
        type: String,
        trim: true
    },
    deadline: {
        type: Date,
        trim: true
    },
    hiringManagerUserId: {
        type: ObjectId,
        ref: "User"
    },
    applyCandidateDetails: [{
        type: ObjectId,
        ref: "Apply"
    }]
}, {
    timestamps: true,
})


const Job = mongoose.model("Job", jobSchema)
module.exports = Job;


/*

{
  "company": "Get-Aid Ltd",
  "title": "Flutter Developer",
  "responsibilities": "Develop and Maintain Flutter apps, Collaborate with team members on the  project, Be interested in the latest technologies, Test Applications for Optimal Performance,Need to fix application bugs before final release",
  "requirements": "Excellent knowledge of Flutter and Dart, Know how to deal with different screen sizes, Hands-on experience in the full life cycle of Mobile application development,Strong knowledge of RESTful web services, Strong understanding of object-oriented programming, and design patterns including MVP/MVVM/MVC and BLoC architecture patterns,Working with a version control system Like Git, Willing to learn and work on different mobile platforms/frameworks when needed, Follows best practices according to community rules and Maintains proper coding convention",
  "education": "Graduated in CSE or other Equivalent subjects",
  "type": "Full Time",
  "location": "Dhaka",
  "hours": "11.30 am to 8.30 pm",
  "days": "Friday to Wednesday (Thursday off)",
  "salary": 45000,
  "languages": "Bangla, Dhaka",
  "bonus": "2 Festival bonus",
  "deadline": "2022-9-25"
}

*/