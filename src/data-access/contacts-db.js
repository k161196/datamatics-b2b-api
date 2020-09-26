export default function makeContactsDb({ makeDb }) {
    return Object.freeze({
        findAll
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
}