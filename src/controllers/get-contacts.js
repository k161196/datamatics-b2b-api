export default function makeGetContacts({ listContacts }) {
    return async function getContacts(httpRequest) {

        console.log("get contacts")
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            // const postComments = await listComments({
            //     postId: httpRequest.query.postId
            // })
            const postContacts = await listContacts()
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
        // return {
        //     headers,
        //     statusCode: 200,
        //     body: {
        //         data: "kiran"
        //     }
        // }


    }
}