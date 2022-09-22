import { ApolloServer } from "apollo-server-micro";
import { send } from "micro";
import Cors from "micro-cors";
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const {bookdata} = require('./database');

const cors = Cors();

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        bookdata
    }
  });
  export default apolloServer.start().then(() => {
    const handler = apolloServer.createHandler({ path: "/api/graphql" });
  
    return cors((req, res) => {
      return req.method === "OPTIONS" ? send(res, 200, "ok") : handler(req, res);
    });
  });