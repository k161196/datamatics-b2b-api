export default function makeContactsDb({ makeDb, xlsxFile }) {
    return Object.freeze({
        findAll,
        findByPage
    })
    async function findAll({ publishedOnly = true } = {}) {
        const db = await makeDb()
        // const query = publishedOnly ? { published: true } : {}
        const query = {}
        const result = await db.collection('contact').find(query).limit(10)
        // console.log("result", result)
        // const result = await 
        // const data = await result.toArray()
        // data.map((data) => {
        //     console.log("data", data)
        // })

        // (await result.toArray()).map(({ _id: id, ...found }) => {
        //     console.log("id", id)
        // })
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }))
    }


    async function findByPage(httpRequest) {
        let excelData = []

        xlsxFile("./src/data/test.xlsx").then((row) => {
            console.log("row", row)
            row.forEach((col) => {
                col.forEach((data) => {
                    excelData.push(data)
                    console.log(data)
                    // return data
                })
            })
            console.log("excel data", excelData)
        })
        // const excelData = xlsxFile("./src/data/test.xlsx").then((row) => { return row })
        // excelData.forEach((col) => {

        // })

        console.log("excel data", await excelData)
        // console.log("ddb httpRequest", httpRequest)
        const page = httpRequest.params.page
        const httpQuery = httpRequest.query
        const nPerPage = 10
        const db = await makeDb()
        // console.log("db ", httpQuery)
        let obj = {}
        if (httpQuery.JobTitle && httpQuery.Country !== "") {
            obj["Contact Country"] = httpQuery.Country
        }
        if (httpQuery.JobTitle && httpQuery.JobTitle !== "") {
            obj["JobTitle1"] = httpQuery.JobTitle
        }
        if (excelData) {
            console.log("0", excelData[0])
            obj[`${excelData[0]}`] = { $nin: [excelData[1], excelData[2]] }
        }
        console.log("obj ", obj)
        // const query = publishedOnly ? { published: true } : {}
        const query = obj
        // db.students.find()
        //     .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        //     .limit(nPerPage)
        //     .forEach(student => {
        //         print(student.name);
        //     });
        const result = await db.collection('contact')
            .find(query)
            .skip(page > 0 ? ((page - 1) * nPerPage) : 0)
            .limit(nPerPage)
        // console.log("result", result)
        // const result = await 
        // const data = await result.toArray()
        // data.map((data) => {
        //     console.log("data", data)
        // })

        // (await result.toArray()).map(({ _id: id, ...found }) => {
        //     console.log("id", id)
        // })
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }))
    }
}