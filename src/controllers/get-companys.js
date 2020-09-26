export default function makeGetCompanies({ listCompanies }) {
    return async function getCompanies(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            // const postComments = await listComments({
            //     postId: httpRequest.query.postId
            // })
            const postContacts = await listCompanies()
            return {
                headers,
                statusCode: 200,
                body: postContacts
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