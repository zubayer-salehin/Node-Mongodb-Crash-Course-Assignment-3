const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./Middleware/errorHandler");
const candidateRouter = require("./Routes/Candidate.Route");
const managerRouter = require("./Routes/Manager.Route");
const authRouter = require("./Routes/Auth.Route");
const adminRouter = require("./Routes/Admin.Route");


/* Application Middleware */
app.use(express.json())
app.use(cors())


/* Home Route */
app.get('/', (req, res) => {
    res.send("Job Portal Website");
})



/****** All Routes ******/
app.use(authRouter, candidateRouter, managerRouter, adminRouter)



/* Undefined Route */
app.all('*', (req, res) => {
    res.send('No Route Found')
})


/* Global Error Handler*/
app.use(errorHandler);


/* Uncaught Error Handler */
process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    app.close(() => {
        process.exit(1);
    })
})


module.exports = app;