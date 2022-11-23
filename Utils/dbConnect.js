const mongoose = require('mongoose');

function DBConnect() {
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log(`Mongoess Connection Successfully`);
        })
}

module.exports = DBConnect;