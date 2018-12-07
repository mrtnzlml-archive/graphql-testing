// @flow

const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLSchema({
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
