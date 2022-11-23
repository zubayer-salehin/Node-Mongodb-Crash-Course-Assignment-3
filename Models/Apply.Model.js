const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types


const applySchema = mongoose.Schema({
    candidateDetails: {
        type: ObjectId,
        ref: "User"
    },
    jobDetails: {
        type: ObjectId,
        ref: "Job"
    }
}, {
    timestamps: true,
})

const Apply = mongoose.model("ApplyingJobCandidate", applySchema);


module.exports = Apply;