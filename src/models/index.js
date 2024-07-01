'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const volunteerBridgeUserModel = require('../auth/models/volunteerBridgeUser.js');
const eventModel = require('./Events/model.js')
const Collection = require('./data-collection.js');

const environment = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const testOrProduction = (environment === 'test' || environment === 'production');

const sequelize = new Sequelize(DATABASE_URL, testOrProduction ? {logging: false} : {});

const volunteerBridgeUser = volunteerBridgeUserModel(sequelize, DataTypes);

const events = eventModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  volunteerBridgeUser: new Collection(volunteerBridgeUser),
  events: new Collection(events)
};
