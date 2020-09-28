export default function companiesDb({ makeDb }) {
    return Object.freeze({
        findAll,
        filter
    })


    async function findAll() {
        const db = await makeDb()
        const query = {}
        const result = await db.collection('company').find(query).limit(10)
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }))

    }
    async function filter({ JobTitle, Country, IndustryType, EmployeeSizeFromValue, EmployeeSizeToValue }) {

        // console.log("query db", Country)



        // let temp2 = []

        // if (JobTitle) {
        //     console.log("jobTitle", JobTitle)
        //     temp2.push({ $eq: ["$JobTitle1", JobTitle] },)
        // }



        const filterCompany = () => {
            let temp = []




            if (IndustryType) {
                // console.log("no country")
                temp.push({ $eq: ["$IndustryType1", IndustryType] },)
            }
            if (EmployeeSizeFromValue) {
                // console.log(jobTitle)
                temp.push({ $gte: ["$EmployeeSizeFromValue", parseInt(EmployeeSizeFromValue)] },)
            }
            if (EmployeeSizeToValue) {
                // console.log(jobTitle)
                temp.push({ $lte: ["$EmployeeSizeToValue", parseInt(EmployeeSizeToValue)] },)
            }
            return temp


        }
        const filterContact = () => {
            let temp2 = []
            if (Country) {
                // console.log("country", Country)
                temp2.push({ $eq: ["$Contact Country", Country] },)
                // temp2.push("hah")
            }

            if (JobTitle) {
                // console.log("jobTitle", JobTitle)
                temp2.push({ $eq: ["$JobTitle1", JobTitle] },)
            }
            return temp2


        }

        console.log("filterContact ", filterContact())
        console.log("filterCompany ", filterCompany())



        const db = await makeDb()

        const pipelineContact = [


            // {
            //     $match: {
            //         $expr:

            //         {
            //             $and:
            //                 filterContact()
            //             // [

            //             //     { $eq: ["$Contact Country", "Canada"] },
            //             //     // { $eq: ["$Contact Country", "United+States"] },
            //             //     { $eq: ["$JobTitle1", "Manager"] },
            //             //     // { $eq: ["$IndustryType1", "Medical"] },
            //             //     // { $gte: ["$EmployeeSizeFromValue", 1000] },
            //             //     // { $lte: ["$EmployeeSizeToValue", 5000] },

            //             // ]
            //         }
            //     }
            // },



            {
                $project: { JobFunction1: 0, JobLevel1: 0 }
            },
            {
                $lookup: {
                    from: "company",
                    let: { companyId_comp: "$CompanyId" },
                    pipeline: [
                        // {
                        //     $group: {
                        //         _id: "$CompanyId",
                        //         Company: { $first: "$Company" },
                        //         IndustryType1: { $first: "$IndustryType1" },
                        //         IndustryType1: { $first: "$IndustryType1" },
                        //         EmployeeSizeFromValue: { $first: "$EmployeeSizeFromValue" },
                        //         EmployeeSizeToValue: { $first: "$EmployeeSizeToValue" },

                        //     }
                        // },
                        {
                            $limit: 10
                        },

                        {
                            $match: {


                                $expr:

                                {
                                    $and: [

                                        { $eq: ["$CompanyId", "$$companyId_comp"] },
                                        ...filterCompany()
                                        // ...filterContact()
                                        // { $eq: ["$IndustryType1", "Medical"] },
                                        // { $gte: ["$EmployeeSizeFromValue", 2000] },
                                        // { $lte: ["$EmployeeSizeToValue", 5000] },

                                    ]
                                }
                            }
                        },


                        {
                            $project: { _id: 0, Speciality: 0, SubIndustryType1: 0, }
                        }
                    ],
                    as: "company"
                }
            },
            {
                $match: {
                    "company": { $ne: [] }
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$company", 0] }, "$$ROOT"] } }
            },
            { $project: { company: 0 } }

        ]
        // console.log("count", await db.collection('contact').aggregate(pipelineContact).limit(10).explain("executionStats"))
        // conat countData = await db.collection('contact').aggregate(pipelineContact).limit(10);



        // const data = await db.collection('contact').aggregate([...pipelineContact, {
        //     $count: "passing_scores"
        // },], { allowDiskUse: true }).limit(10)

        // console.log("count", await data.toArray())
        const result = await db.collection('contact').aggregate(pipelineContact, { allowDiskUse: true }).limit(10)

        // console.log("result", result)
        // return {
        //     count: await data.toArray(),
        //     data: (await result.toArray()).map(({ _id: id, ...found }) => ({
        //         id,
        //         ...found
        //     }))
        // }
        return {
            status: "pass",
            data: (await result.toArray()).map(({ _id: id, ...found }) => ({
                id,
                ...found
            }))
        }



        // const pipelineCompany = [
        //     {
        //         '$match': {
        //             'CompanyId': 146796
        //         }
        //     },
        //     {
        //         '$limit': 5
        //     },
        //     {
        //         '$lookup': {
        //             'from': 'contact',
        //             'localField': 'CompanyId',
        //             'foreignField': 'CompanyId',
        //             'as': 'string'
        //         }
        //     }



        // ]
        // const pipelineContact = [
        //     {
        //         '$match': {
        //             'CompanyId': 146796
        //         }
        //     },

        // ]
        const query = { IndustryType1: "IT Services" }
        // console.log("stats", await db.collection('company').stats())
        // const result = await db.collection('company').find(query).limit(10)
        // const result = await db.collection('company').aggregate(pipelineCompany)
        // return (await result.toArray()).map(({ _id: id, ...found }) => ({
        //     id,
        //     ...found
        // }))


    }
}