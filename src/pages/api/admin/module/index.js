import Module from "@/utils/models/Module";

export default async function (req, res) {
    let result;
    try {
        if (req.method == "POST") {
            const checkExists = await Module.findOne({ moduleName: req.body.moduleName })
            if (checkExists) {
                return res.status(201).json({status:401, message: "Module Already Exists" });
            } else {
                result = await Module.create(req.body)
            }

        } else if (req.method == "PUT") {
            result = await Module.findByIdAndUpdate(req.query.id, req.body,{new: true})
            if (!result) {
                return res.status(401).json({ message: "Record Not Found" });
            }
        } else if (req.method == "DELETE") {
            result = await Module.findByIdAndDelete(req.query.id)
            if (!result) {
                return res.status(401).json({ message: "Record Not Found" });
            }
        } else {
            result = await Module.find({ courseId: req.query.id })
        }
        if (result) {
            return res.status(200).json({ message: "success", status: 200, data: result })
        } else {
            return res.status(401).json({ message: "FAILED" })
        }
    } catch (e) {
        return res.status(401).json({ message: e.message })
    }


}   