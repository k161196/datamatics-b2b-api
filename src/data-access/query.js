const { Db } = require("mongodb");

db.contact.aggregate([{
    $lookup: {
        from: "company",
        let: { companyId_comp: "$CompanyId" },
        pipeline: [
            {
                $limit: 10
            },

            {
                $match: {


                    $expr:

                    {
                        $and: [

                            { $eq: ["$CompanyId", "$$companyId_comp"] },


                        ]
                    }
                }
            },
        ],
        as: "company"
    }
},]).limit(10).explain()