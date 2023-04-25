import Course from "@/utils/models/Course"
import Quardinator from "@/utils/models/Quardinator";
import { getSession } from "next-auth/react";

export default async function (req, res) {
    let result;
    try {
        // const user = await getSession({ req })
        // if (!!user && user?.user=="admin") {
        if (req.method == "POST") {
            const checkExists = await Quardinator.findOne({ adhar: req.body.adhar })
            if (checkExists) {
                return res.status(200).json({ status: 401, message: "User is Already Exists" });
            }
            result = await Quardinator.create(req.body)
        } else if (req.method == "PUT") {
            result = await Quardinator.findByIdAndUpdate(req.query.id, req.body)
            if (result) {
                result = { ...req.body, _id: req.query.id }
            }
            if (!result) {
                return res.status(401).json({ message: "Record Not Found" });
            }
        } else if (req.method == "DELETE") {
            result = await Quardinator.findByIdAndDelete(req.query.id)

        } else {
            result = await Quardinator.find();
            if (!result) {
                return res.status(401).json({ message: "Record Not Found" });
            }
        }
        if (result) {
            return res.status(200).json({ status: 200, data: result, message: "Success" })
        } else {
            return res.status(401).json({ message: "FAILED" })
        }
        // } else {
        //     return res.status(401).json({ message: "Unautherized" })
        // }

    } catch (e) {
        return res.status(401).json({ message: e.message })
    }


}