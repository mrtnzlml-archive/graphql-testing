// @flow

const testBC = require('@kiwicom/graphql-bc-checker').default;

const Schema = require('./Schema');

testBC({
  allowBreakingChanges: false,
  snapshotLocation: './schema-snapshot.graphql',
  schema: Schema,
});
