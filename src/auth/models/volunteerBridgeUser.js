'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const volunteerBridgeUserModel = (sequelize, DataTypes) => {
  const model = sequelize.define('VolunteerBridgeUsers', {
    userID : { type: DataTypes.STRING, required: true, primaryKey: true, },
    firstName: { type: DataTypes.STRING, required: true, unique: false },
    lastName: { type: DataTypes.STRING, required: true, unique: false },
    phone: { type: DataTypes.STRING, required: false, unique: false },
    email: { type: DataTypes.STRING, required: true, unique: false },
    age: { type: DataTypes.INTEGER, required: false, unique: false },
    location: { type: DataTypes.STRING, required: false, unique: false },
    bio: { type: DataTypes.TEXT, required: false, unique: false },
    role: { type: DataTypes.ENUM('user', 'admin'), required: true, defaultValue: 'user'},
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ userID: this.userID }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete']
        };
        return acl[this.role];
      }
    },
  });

  model.beforeCreate(async (volunteerBridgeUser) => {
    let hashedPass = await bcrypt.hash(volunteerBridgeUser.userID, 10);
    volunteerBridgeUser.password = hashedPass;
  });

  model.authenticateBasic = async function (userID) {
    try {
      const volunteerBridgeUser = await this.findOne({ where: { userID } });
      return volunteerBridgeUser;
    } catch(e) {
      console.error(e);
    }

  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      console.log('parsedToken', parsedToken);
      const volunteerBridgeUser = this.findOne({where: { userID: parsedToken.userID } });
      if (volunteerBridgeUser) { return volunteerBridgeUser; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  };

  return model;
}

module.exports = volunteerBridgeUserModel;
