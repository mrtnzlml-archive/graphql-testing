// @flow

const { ApolloServer } = require('apollo-server');
const Logger = require('@kiwicom/graphql-logz').default;
const { wrapResolvers } = require('@kiwicom/graphql-resolve-wrapper');

const schema = require('./Schema');

const startAt = process.hrtime.bigint();

const logger = new Logger({
  origin: 'graphql-testing.mrtnzlml',
  logzioToken: 'mocked',
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
