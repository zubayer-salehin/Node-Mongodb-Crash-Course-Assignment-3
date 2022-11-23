const Job = require("../Models/Job.Model")
const User = require("../Models/Auth.Model");
const Apply = require("../Models/Apply.Model");



exports.getAllJobsServices = async (filters, query) => {
    const allJobs = await Job
        .find(filters)
        .sort(query.sortBy)
    return allJobs;
}

exports.getJobDetailService = async (id) => {
    const job = await Job
        .findOne({ _id: id })
        .populate({
            path: "hiringManagerUserId",
            select: "-jobApplyIds",
            model: User
        });
    return job;
}

exports.findJobById = async (id) => {
    const job = await Job.findOne({ _id: id })
    return job;
}

exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

exports.applyJobService = async (userId, jobId) => {
    await User.updateOne({ _id: userId }, { $push: { "jobApplyIds": jobId } });
    const applyJob = new Apply();
    applyJob.candidateDetails = userId;
    applyJob.jobDetails = jobId;
    const appliedJobInfo = await applyJob.save();
    await Job.updateOne({ _id: jobId }, { $push: { "applyCandidateDetails": appliedJobInfo._id } })
    return appliedJobInfo;
}