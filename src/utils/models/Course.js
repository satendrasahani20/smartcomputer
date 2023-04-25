import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        default: "",
    },
    cuttOffScore: {
        type: Number,
        required: true
    },
    maxMark: {
        type: Number,
        required: true
    },
    testTiming: {
        type: Number,
        required: true
    },


})

export default mongoose.models.course || mongoose.model("course", courseSchema)