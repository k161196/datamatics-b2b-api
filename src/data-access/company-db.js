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
    async function filter({ country, jobTitle, IndustryType, EmployeeSizeFromValue, EmployeeSizeToValue }) {

        console.log("query db", country)



        const filterCompany = () => {
            let temp = []




            if (IndustryType) {
                console.log("no country")
                temp.push({ $eq: ["$IndustryType1", IndustryType] },)
            }
            if (EmployeeSizeFromValue) {
                console.log(jobTitle)
                temp.push({ $gte: ["$EmployeeSizeFromValue", parseInt(EmployeeSizeFromValue)] },)
            }
            if (EmployeeSizeToValue) {
                console.log(jobTitle)
                temp.push({ $lte: ["$EmployeeSizeToValue", parseInt(EmployeeSizeToValue)] },)
            }
            return temp


        }
        const filterContact = () => {
            let temp = []
            if (country) {
                console.log("no country")
                temp.push({ $eq: ["$Contact Country", country] },)
            }
            if (jobTitle) {
                console.log(jobTitle)
                temp.push({ $eq: ["$JobTitle1", "Marketing"] },)
            }
            return temp


        }

        console.log("filter temp ", filterCompany())



        const db = await makeDb()

        const pipelineContact = [
            {
                $match: {
                    $expr:

                    {
                        $and: filterContact()
                        // [

                        //     { $eq: ["$Contact Country", "United States"] },
                        //     { $eq: ["$JobTitle1", "Marketing"] },
                        //     { $eq: ["$IndustryType1", "Medical"] },
                        //     { $gte: ["$EmployeeSizeFromValue", 1000] },
                        //     { $lte: ["$EmployeeSizeToValue", 5000] },

                        // ]
                    }
                }
            },

            {
                $lookup: {
                    from: "company",
                    let: { companyId_comp: "$CompanyId" },
                    pipeline: [
                        // {
                        //     $group: {
                        //         _id: "$CompanyId",
                        //         CompanyId: { $first: "$CompanyId" }
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
                                        // { $eq: ["$IndustryType1", "Medical"] },
                                        // { $gte: ["$EmployeeSizeFromValue", 1000] },
                                        // { $lte: ["$EmployeeSizeToValue", 5000] },

                                    ]
                                }
                            }
                        },

                        // {
                        //     $project: { CompanyId: 0 }
                        // }
                    ],
                    as: "company"
                }
            },
            {
                $match: {
                    "company": { $ne: [] }
                }
            }
            // {
            //     $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromItems", 0] }, "$$ROOT"] } }
            // },
            // { $project: { fromItems: 0 } }

        ]

        const result = await db.collection('contact').aggregate(pipelineContact).limit(10)
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }))



        const pipelineCompany = [
            {
                '$match': {
                    'CompanyId': 146796
                }
            },
            {
                '$limit': 5
            },
            {
                '$lookup': {
                    'from': 'contact',
                    'localField': 'CompanyId',
                    'foreignField': 'CompanyId',
                    'as': 'string'
                }
            }



        ]
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