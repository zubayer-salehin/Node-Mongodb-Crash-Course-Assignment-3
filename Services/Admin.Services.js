const User = require("../Models/Auth.Model");
const Job = require("../Models/Job.Model");


exports.getAllCandidateService = async (userInfo) => {
    const candidates = await User.find({});
    return candidates;
}

exports.getCandidateService = async (id) => {
    const candidate = await User.findOne({ _id: id });
    return candidate;
}

exports.getAllHiringManagerService = async () => {
    const hiringManager = await User.find({ role: "Hiring Manager" });
    return hiringManager;
}

exports.updateCandidateRoleService = async (id) => {
    const roleUpdate = await User.updateOne({ _id: id }, { $set: { role: "Hiring Manager" } }, { runValidators: true });
    return roleUpdate;
}

exports.getAllHighestPaidJobsService = async () => {
    const highestPaidJobs = await Job
        .find({})
        .sort("-salary")
        .limit(10)
    return highestPaidJobs;
}


exports.getMostAppliedJobsService = async () => {
    const mostAppliedJobs = await Job
        .aggregate([
            {
                "$project": {
                    "company": 1,
                    "title": 1,
                    "responsibilities": 1,
                    "requirements": 1,
                    "education": 1,
                    "type": 1,
                    "location": 1,
                    "hours": 1,
                    "days": 1,
                    "salary": 1,
                    "languages": 1,
                    "bonus": 1,
                    "deadline": 1,
                    "hiringManagerUserId": 1,
                    "createdAt": 1,
                    "updatedAt": 1,
                    "applyCandidateDetails": 1,
                    "length": { "$size": "$applyCandidateDetails" }
                }
            },
            { "$sort": { "length": -1 } },
            { "$limit": 5 }
        ])
    return mostAppliedJobs;
}