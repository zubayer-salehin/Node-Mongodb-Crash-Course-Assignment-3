const { getAllCandidateService, getCandidateService, getAllHiringManagerService, updateCandidateRoleService, getAllHighestPaidJobsService, getMostAppliedJobsService } = require("../Services/Admin.Services");



exports.getAllCandidate = async (req, res) => {
    try {

        const candidates = await getAllCandidateService(req.user.email);

        res.status(200).json({
            status: "Success",
            message: "Successfully Get All Candidate",
            data: candidates
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Candidate",
            error: error.message
        })
    }
}


exports.getCandidate = async (req, res) => {
    try {

        const candidate = await getCandidateService(req.params.id);

        res.status(200).json({
            status: "Success",
            message: "Successfully Get Candidate",
            data: candidate
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Candidate",
            error: error.message
        })
    }
}


exports.getAllHiringManager = async (req, res) => {
    try {

        const hiringManagers = await getAllHiringManagerService();

        res.status(200).json({
            status: "Success",
            message: "Successfully Get Hiring Managers",
            data: hiringManagers
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Hiring Managers",
            error: error.message
        })
    }
}


exports.updateCandidateRole = async (req, res) => {
    try {

        const updateRole = await updateCandidateRoleService(req.params.id);

        res.status(200).json({
            status: "Success",
            message: "Successfully update Candidate Role",
            data: updateRole
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't update Candidate Role",
            error: error.message
        })
    }
}


exports.getHighestPaidJobs = async (req, res) => {
    try {

        const highestPaidJobs = await getAllHighestPaidJobsService();

        res.status(200).json({
            status: "Success",
            message: "Successfully get 10 Highest Paid Jobs",
            data: highestPaidJobs
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get Highest Paid Jobs",
            error: error.message
        })
    }
}


exports.getMostAppliedJobs = async (req, res) => {
    try {

        const mostAppliedJobs = await getMostAppliedJobsService();

        res.status(200).json({
            status: "Success",
            message: "Successfully get 5 most Applied Jobs",
            data: mostAppliedJobs
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get most Applied Jobs",
            error: error.message
        })
    }
}