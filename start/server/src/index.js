require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({ 
    // schema
    typeDefs,
    resolvers,
    // Apollo Server accepts a dataSources function that expects your data sources.
    // These data sources are then accessible inside your GraphQL resolver context
    // @see https://dev.to/graphcms/create-your-own-apollo-data-source-package-1o4m
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    })
});

server.listen().then(() => {
    console.log(`
        Server is running!
        Listening on port 4000
        Explore at https://studio.apollographql.com/dev
    `);
});
  