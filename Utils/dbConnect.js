const mongoose = require('mongoose');

function DBConnect() {
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5pmu7.mongodb.net/job-portal?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log(`Mongoess Connection Successfully`);
        })
}

module.exports = DBConnect;