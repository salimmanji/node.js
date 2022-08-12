const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { parseConstValue } = require('graphql');

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
});

// const root = {
//     products: require('./products/products.model'),
//     orders: require('./orders/orders.model')
// };

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true,
}));

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Running GraphQL server... ')
});