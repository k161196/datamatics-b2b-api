export default function makeListContacts({ contactsDb }) {
    return async function listContacts({ httpRequest }) {

        // return [{
        //     name: "kiran"
        // }, {
        //     name: "yadav"
        // }]
        // console.log("http", httpRequest)
        // console.log("params", params.page)
        // // const contacts = await contactsDb.findAll()
        // // return contacts

        if (!httpRequest.params.page) {
            throw new Error('You must supply a page id.')
        }
        const contacts = await contactsDb.findByPage(httpRequest)
        return contacts
        // const comments = await commentsDb.findByPostId({
        //     postId,
        //     omitReplies: false
        // })
        // const nestedComments = nest(comments)
        // return nestedComments

        // If this gets slow introduce caching.
        // function nest(comments) {
        //     if (comments.length === 0) {
        //         return comments
        //     }
        //     return comments.reduce((nested, comment) => {
        //         comment.replies = comments.filter(
        //             reply => reply.replyToId === comment.id
        //         )
        //         nest(comment.replies)
        //         if (comment.replyToId == null) {
        //             nested.push(comment)
        //         }
        //         return nested
        //     }, [])
        // }
    }
}