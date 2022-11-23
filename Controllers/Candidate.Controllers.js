const { getAllJobsServices, getJobDetailService, applyJobService, findJobById, findUserByEmail } = require("../Services/Candidate.Services");


exports.getAllJobs = async (req, res) => {
    try {


        let filters = { ...req.query };
        delete filters["sort"]

        //gt ,lt ,gte, lte
        let filtersString = JSON.stringify(filters)
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        filters = JSON.parse(filtersString)

        const query = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query.sortBy = sortBy
        }

        const allJobs = await getAllJobsServices(filters, query);


        res.status(200).json({
            status: "Success",
            message: "Successfully get Jobs",
            data: allJobs
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Jobs",
            error: error.message
        })
    }
}


exports.getJobDetails = async (req, res) => {
    try {

        const id = req.params.id;
        const job = await getJobDetailService(id);

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


exports.applyJob = async (req, res) => {
    try {

        const id = req.params.id;
        const job = await findJobById(id);

        if (!job) {
            return res.status(400).json({
                status: "fail",
                message: "Couldn't find Job. Please send valid Job Id",
            })
        }

        const isDeadline = new Date() < new Date(job.deadline)

        if (!isDeadline) {
            return res.status(400).json({
                status: "fail",
                message: "Can’t apply after Deadline",
            })
        }

        const user = await findUserByEmail(req.user.email);

        const applyJob = await applyJobService(user._id, job._id);

        res.status(200).json({
            status: "Success",
            message: "Successfully get Job",
            data: applyJob
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Job",
            error: error.message
        })
    }
}