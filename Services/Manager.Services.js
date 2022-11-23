const Apply = require("../Models/Apply.Model");
const User = require("../Models/Auth.Model");
const Job = require("../Models/Job.Model")


exports.getManagerSpecificJobsService = async (managerEmail) => {
    const managerInfo = await User
        .findOne({ email: managerEmail })
    const jobs = await Job
        .find({ hiringManagerUserId: managerInfo._id });
    return jobs;
}

exports.getManagerSpecificJobDetailService = async (id) => {
    const job = await Job
        .findOne({ _id: id })
        .populate({
            path: 'applyCandidateDetails',
            select:"-jobDetails -__v",
            model: Apply
        })
    return job;
}

exports.createJobService = async (jobInfo, managerEmail) => {
    const managerInfo = await User.findOne({ email: managerEmail })
    const newJobs = new Job(jobInfo);
    newJobs.hiringManagerUserId = managerInfo._id;
    await newJobs.save();
    return newJobs;
}

exports.updateJobService = async (id, updateInfo) => {
    const updateJob = await Job.updateOne({ _id: id }, { $set: updateInfo }, { runValidators: true });
    return updateJob;
}