const express = require('express');
const router = express.Router();
const managerControllers = require("../Controllers/Manager.Controllers");
const authorization = require('../Middleware/authorization');
const verifyToken = require('../Middleware/verifyToken');



router.use(verifyToken);


router.post("/jobs", authorization("Hiring Manager"), managerControllers.createJobs);

router.get("/manager/jobs", authorization("Hiring Manager"), managerControllers.getManagerSpecificJobs);

router.patch("/jobs/:id", authorization("Hiring Manager"), managerControllers.updateJob);

router.get("/manager/jobs/:id", authorization("Hiring Manager"), managerControllers.getManagerSpecificJobDetails);

module.exports = router;