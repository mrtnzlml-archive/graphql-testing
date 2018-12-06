// @flow

const { ApolloServer } = require('apollo-server');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const Logger = require('@kiwicom/graphql-logz').default;
const { wrapResolvers } = require('@kiwicom/graphql-resolve-wrapper');

const startAt = process.hrtime.bigint();

const logger = new Logger({
  origin: 'graphql-testing.mrtnzlml',
  logzioToken: 'mocked',
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      test: {
        type: GraphQLString,
        resolve: () => 'this response is very OK',
      },
    },
  }),
});

wrapResolvers(schema, resolveFn => async (...args) => {
  const value = await resolveFn(...args);
  return typeof value === 'string' ? value.toUpperCase() : value;
});

const server = new ApolloServer({
  schema, formatResponse: responseJSON => {
    logger.recordRequest({
      query: '{ __typename }',
      variables: {},
      operationName: undefined,
      result: {
        data: {
          __typename: 'RootQuery',
        },
      },
      startAt,
    });

    return responseJSON;
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
});
