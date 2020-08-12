'use strict';

const _ = require('lodash');

const ID_ATTRIBUTE = 'id';
const PUBLISHED_AT_ATTRIBUTE = 'published_at';
const CREATED_BY_ATTRIBUTE = 'created_by';
const UPDATED_BY_ATTRIBUTE = 'updated_by';

const HIDDEN_ATTRIBUTES = [
  ID_ATTRIBUTE,
  PUBLISHED_AT_ATTRIBUTE,
  CREATED_BY_ATTRIBUTE,
  UPDATED_BY_ATTRIBUTE,
];

// making it clear hidden attributes could still be writable
const NON_WRITABLE_ATTRIBUTES = [...HIDDEN_ATTRIBUTES];

const constants = {
  PUBLISHED_AT_ATTRIBUTE,
  CREATED_BY_ATTRIBUTE,
  UPDATED_BY_ATTRIBUTE,
};

const getTimestamps = model => {
  const timestamps = _.get(model, 'options.timestamps', []);

  if (!_.isArray(timestamps)) {
    return [];
  }

  return timestamps;
};

const getNonWritableAttributes = model => {
  return _.uniq([model.primaryKey, ...getTimestamps(model), ...NON_WRITABLE_ATTRIBUTES]);
};

const getNonVisibleAttributes = model => {
  return _.uniq([model.primaryKey, ...getTimestamps(model), ...HIDDEN_ATTRIBUTES]);
};

const getVisibleAttributes = model => {
  return _.difference(_.keys(model.attributes), getNonVisibleAttributes(model));
};

module.exports = {
  constants,
  getNonWritableAttributes,
  getVisibleAttributes,
};
