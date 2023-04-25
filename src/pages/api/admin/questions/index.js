import Module from "@/utils/models/Module";

export default async function (req, res) {
    let result;
    let id = req.query.id;
    try {
        const existsModule = await Module.findOne({ _id: id }).select("questions");

        if (req.method == "POST") {
            if(!req.body.answer){
                return res.status(200).json({ status: 401, message: "Please Enter Answer" });
            }
            if (!!existsModule && !!existsModule.questions) {
                let questionExist;
                for await (let element of existsModule.questions) {
                    if (element.question == req.body.question) {
                        questionExist = true;
                    }
                }
                if (questionExist) {
                    return res.status(200).json({ status: 401, message: "This Question is already exists:" });
                } else {
                    let data = { questions: [...existsModule.questions, req.body] }
                    result = await Module.findByIdAndUpdate(id, data, { new: true })
                    result = result.questions[result.questions.length - 1]
                }
            }

        } else if (req.method == "PUT") {
            if (!!existsModule && !!existsModule.questions) {
                let indexNo;
                for await (let [index, element] of existsModule.questions.entries()) {
                    if (element._id == req.body._id) {
                        indexNo = index;
                    }
                }
                if (indexNo == 0 || indexNo) {
                    existsModule.questions[indexNo] = req.body;
                }
                let data = { questions: existsModule.questions }
                result = await Module.findByIdAndUpdate(id, data, { new: true })
            }
        } else if (req.method == "DELETE") {
            const existsData = await Module.findOne({ _id: req.query.id }).select("questions");
            if (!!existsData && !!existsData.questions) {
                let indexNo;
                let filterData;
                for await (let [index, element] of existsData.questions.entries()) {
                    if (element._id == req.query.questionid) {
                        indexNo = index;
                    }
                }
                if (indexNo == 0 || indexNo) {
                    filterData = existsData.questions.filter((item) => item._id != req.query.questionid)
                }

                result = await Module.updateOne({ _id: req.query.id }, {
                    $set: {
                        questions: filterData
                    }
                })
            }
        } else {
            result = await Module.findOne({ _id: req.query.id }).select("questions");
        }
        if (result) {
            return res.status(200).json({ status:200,message: "success", data: result })
        } else {
            return res.status(200).json({status:401, message: "FAILED" })
        }
    } catch (e) {
        return res.status(401).json({ message: e.message })
    }


}   