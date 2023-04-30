import mongoose from "mongoose";
const quardinatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        default: "",
    },
    contact: {
        type: String,
        default: "",
    },
    motherName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: "",
    },
    qualification: {
        type: String,
        required: true
    },
    adhar: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    centre: [
        {
            centreName: { type: String },
            ownerName: { type: String },
            password: { type: String },
            fatherName: { type: String },
            gender: { type: String },
            qualification: { type: String },
            adharNo: { type: String },
            state: { type: String },
            district: { type: String },
            address: { type: String },
            pincode: { type: String },
            mobileNo: { type: String },
            email: { type: String },
            centrePhoto: {
                inner: { type: String },
                outer: { type: String }
            }
            ,

            teacher: [
                {
                    name: { type: String },
                    email: { type: String },
                    mobileNo: { type: String },
                    qualification: { type: String },
                }
            ]
        }
    ]


})

export default mongoose.models.quardinator || mongoose.model("quardinator", quardinatorSchema)