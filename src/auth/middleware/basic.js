'use strict';

const base64 = require('base-64');
const { volunteerBridgeUser } = require('../../models/index.js');

module.exports = async (req, res, next) => {


  const volunteerBridgeUserModel = volunteerBridgeUser.model;


  try {
    req.user = await volunteerBridgeUserModel.authenticateBasic(req.body)

    next();
  } catch (e) {
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

}
