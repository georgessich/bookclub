const resolvers = {
    Query: {
        bookCards: (_, __, {bookdata}) => bookdata,
    },

}

module.exports = resolvers;