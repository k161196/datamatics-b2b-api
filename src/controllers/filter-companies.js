export default function makeFilterCompanies({ listFilterCompanies }) {
    return async function filterCompanies(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            // const postComments = await listComments({
            //     postId: httpRequest.query.postId
            // })
            const postFilterCompanies = await listFilterCompanies()
            return {
                headers,
                statusCode: 200,
                body: postFilterCompanies
                // body: {
                //     main: "kiran a"
                // }
            }
        } catch (e) {
            // TODO: Error logging
            console.log(e)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}