const express = require('express');
const router = express.Router();
const candidateControllers = require("../Controllers/Candidate.Controllers");
const verifyToken = require('../Middleware/verifyToken');



router.get("/jobs", candidateControllers.getAllJobs)

router.get("/jobs/:id", candidateControllers.getJobDetails)

router.post("/jobs/:id/apply", verifyToken, candidateControllers.applyJob)


module.exports = router;