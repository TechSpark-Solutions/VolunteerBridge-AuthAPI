'use strict';

const eventModel = (sequelize, DataTypes) => sequelize.define('Event', {
  name: { type: DataTypes.STRING, required: true },
  date: { type: DataTypes.STRING, required: true },
  location: { type: DataTypes.STRING, required: true },
  skills: { type: DataTypes.ARRAY(DataTypes.TEXT), required: true },
  details: { type: DataTypes.STRING, required: true },
  contact: { type: DataTypes.STRING, required: true },
  locationLatitude: { type: DataTypes.FLOAT, required: false },
  locationLongitude: { type: DataTypes.FLOAT, required: false }
});

module.exports = eventModel;