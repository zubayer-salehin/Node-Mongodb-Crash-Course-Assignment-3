const express = require('express');
const router = express.Router();
const adminControllers = require("../Controllers/Admin.Controllers");
const authorization = require('../Middleware/authorization');
const verifyToken = require('../Middleware/verifyToken');


router.use(verifyToken);

router.get("/candidates", authorization("Admin"), adminControllers.getAllCandidate);

router.get("/candidates/:id", authorization("Admin"), adminControllers.getCandidate);

router.patch("/candidates/:id", authorization("Admin"), adminControllers.updateCandidateRole);

router.get("/manager", authorization("Admin"), adminControllers.getAllHiringManager);

router.get("/highestPaidJobs", authorization("Admin"), adminControllers.getHighestPaidJobs);

router.get("/mostAppliedJobs", authorization("Admin"), adminControllers.getMostAppliedJobs);



module.exports = router;