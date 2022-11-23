const { createJobService, getManagerSpecificJobsService, getManagerSpecificJobDetailService, updateJobService } = require("../Services/Manager.Services");


exports.getManagerSpecificJobs = async (req, res) => {
    try {

        const jobs = await getManagerSpecificJobsService(req.user.email);

        res.status(200).json({
            status: "Success",
            message: "Successfully get Jobs",
            data: jobs
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Jobs",
            error: error.message
        })
    }
}


exports.getManagerSpecificJobDetails = async (req, res) => {
    try {

        const id = req.params.id;
        const job = await getManagerSpecificJobDetailService(id);

        res.status(200).json({
            status: "Success",
            message: "Successfully get Job",
            data: job
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Job",
            error: error.message
        })
    }
}


exports.createJobs = async (req, res) => {
    try {

        const newJobs = await createJobService(req.body, req.user.email);

        res.status(200).json({
            status: "Success",
            message: "Successfully created a new Job",
            data: newJobs
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't create Job",
            error: error.message
        })
    }
}


exports.updateJob = async (req, res) => {
    try {

        const id = req.params.id;
        const updateJob = await updateJobService(id, req.body);

        res.status(200).json({
            status: "Success",
            message: "Successfully created a new Job",
            data: updateJob
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't create Job",
            error: error.message
        })
    }
}