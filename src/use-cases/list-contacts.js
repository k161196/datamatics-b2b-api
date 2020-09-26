export default function makeListContacts({ contactsDb }) {
    return async function listContacts() {

        // return [{
        //     name: "kiran"
        // }, {
        //     name: "yadav"
        // }]
        const contacts = await contactsDb.findAll()
        return contacts

        //   if (!postId) {
        //     throw new Error('You must supply a post id.')
        //   }
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