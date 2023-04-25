import Course from "@/utils/models/Course"
import { getSession } from "next-auth/react";

export default async function (req, res) {
    let result;
    try {
        // const user = await getSession({ req })
        // if (!!user && user?.user=="admin") {
        if (req.method == "POST") {
            const checkExists = await Course.findOne({ name: req.body.name })
            if (checkExists) {
                return res.status(200).json({ status: 401, message: "Course Already Exists" });
            }
            result = await Course.create(req.body)
        } else if (req.method == "PUT") {
            result = await Course.findByIdAndUpdate(req.query.id, req.body)
            if (!result) {
                return res.status(401).json({ message: "Record Not Found" });
            }
        } else if (req.method == "DELETE") {
            result = await Course.findByIdAndDelete(req.query.id)

        } else {
            result = await Course.aggregate([
                {
                    $lookup: {
                        from: "modules",
                        localField: "_id",
                        foreignField: "courseId",
                        as: "modules"
                    },

                }, {
                    $lookup: {
                        from: "modules",
                        localField: "_id",
                        foreignField: "courseId",
                        as: "questions",
                        // pipeline: [
                        //     { '$project': { 'questions': 1,"couseId":1 } }
                        // ]
                    }
                },
                {
                    $addFields: { module: { $size: "$modules" } }
                },
                //  {
                //     $project: { modules: 0, }
                // },

            ])
            const courseCountData = []
            for await (const item of result) {
                for await (const innerItem of item?.modules) {
                    courseCountData?.push({ courseId: innerItem?.courseId, count: innerItem?.questions?.length })
                }
            }

            let x={};
            let origin=[];
            for await (const item of courseCountData) {
                if(JSON.stringify(item?.courseId)==JSON.stringify(x?.courseId)){
                  let indx=origin?.findIndex((itm)=>JSON.stringify(itm?.courseId)==JSON.stringify(x?.courseId))
                  origin[indx]={courseId:item?.courseId,count:item?.count+x?.count}
                }else{
                    origin?.push({courseId:item?.courseId,count:item?.count})
                    x={courseId:item?.courseId,count:item?.count}
                }
            }

            const tempResult = []

            for await (const item of result) {
                for await (const innerItem of origin) {
                    if (JSON.stringify(item?._id) === JSON.stringify(innerItem?.courseId)) {
                        tempResult.push({
                            _id:item?._id,
                            cuttOffScore: item?.cuttOffScore,
                            maxMark: item?.maxMark,
                            module: item?.module,
                            name: item?.name,
                            testTiming: item?.testTiming,
                            noOfQuestion: innerItem?.count,
                            duration: item?.duration,
                        })
                    }
                }
            }
            result = tempResult;
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