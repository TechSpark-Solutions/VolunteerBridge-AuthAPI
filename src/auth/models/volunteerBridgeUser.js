'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const volunteerBridgeUserModel = (sequelize, DataTypes) => {
  const model = sequelize.define('VolunteerBridgeUsers', {
    userID : { type: DataTypes.STRING, required: true, primaryKey: true, },
    email: { type: DataTypes.STRING, required: true, unique: false },
    fullName: { type: DataTypes.JSONB, required: true },
    role: { type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'), required: true, defaultValue: 'user'},
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
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete']
        };
        return acl[this.role];
      }
    },
  });

  model.beforeCreate(async (volunteerBridgeUser) => {
    console.log('volunteerBridgeUser', volunteerBridgeUser);
    let hashedPass = await bcrypt.hash(volunteerBridgeUser.userID, 10);
    volunteerBridgeUser.password = hashedPass;
  });

  model.authenticateBasic = async function (username, password) {
    try {
      const volunteerBridgeUser = await this.findOne({ where: { username } });
      const valid = await bcrypt.compare(password, volunteerBridgeUser.password);
      if (valid) { return volunteerBridgeUser; }
    } catch(e) {
      console.error(e);
    }

  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const volunteerBridgeUser = this.findOne({where: { username: parsedToken.username } });
      if (volunteerBridgeUser) { return volunteerBridgeUser; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  };

  return model;
}

module.exports = volunteerBridgeUserModel;
