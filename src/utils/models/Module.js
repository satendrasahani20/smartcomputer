import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    moduleName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: "",
    },
    questions: {
        type:[
            {
                question: String,
                options: Array,
                answer: String
            }
        ],
        default:""
    }



})

export default mongoose.models.module || mongoose.model("module", moduleSchema)