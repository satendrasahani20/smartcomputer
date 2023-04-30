import Quardinator from "@/utils/models/Quardinator";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export default async function (req, res) {
    let result;
    try {
        // const user = await getSession({ req })
        // if (!!user && user?.user=="admin") {
        if (req.method == "POST") {
            const checkExists = await Quardinator.findOne({ "centre.centreName": req.body.centreName })
            if (checkExists) {
                return res.status(200).json({ status: 401, message: "User is Already Exists" });
            }
            result = await Quardinator.findOneAndUpdate({ _id: req.query.id }, {
                $push: {
                    centre: {
                        ...req.body
                    }
                }
            }, { new: true })
        } else if (req.method == "PUT") {
            const data = await Quardinator.findOne({ "centre._id": req.body._id })
            data?.centre?.map((item) => {
                if (item?._id?.toString() == req.body._id) {
                        item.centreName = req.body.centreName,
                        item.ownerName = req.body.ownerName,
                        item.fatherName = req.body.fatherName,
                        item.gender = req.body.gender,
                        item.qualification = req.body.qualification,
                        item.adharNo = req.body.adharNo,
                        item.state = req.body.state,
                        item.district = req.body.district,
                        item.address = req.body.address,
                        item.pincode = req.body.pincode,
                        item.mobileNo = req.body.mobileNo,
                        item.email = req.body.email,
                        item.centrePhoto = req.body.centrePhoto,
                        item.teacher = req.body.teacher
                        item.password = req.body.password
                }
            })
            await data.save();
            result = data;
            if (!result) {
                return res.status(200).json({ message: "Record Not Found" });
            }
        } else if (req.method == "DELETE") {
            result = await Quardinator.findOneAndUpdate({ "centre._id": req.query.id }, {
                $pull: {
                    centre: {
                        _id: req.query.id
                    }
                }
            })

        } else {
            result = await Quardinator.find();
            if (!result) {
                return res.status(401).json({ message: "Record Not Found" });
            }
        }
        if (result) {
            return res.status(200).json({ status: 200, data: result, message: "Success" })
        } else {
            return res.status(200).json({ message: "FAILED" })
        }
        // } else {
        //     return res.status(401).json({ message: "Unautherized" })
        // }

    } catch (e) {
        return res.status(200).json({ message: e.message })
    }


}