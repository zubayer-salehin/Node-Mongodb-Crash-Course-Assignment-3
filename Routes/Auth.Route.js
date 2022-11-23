const express = require('express');
const router = express.Router();
const userControllers = require("../Controllers/Auth.Controllers");
const verifyToken = require('../Middleware/verifyToken');



router.post("/user/signup", userControllers.createUser);

router.post("/user/login", userControllers.userLogin);

router.get("/user/me", verifyToken, userControllers.getUserByToken);



module.exports = router;