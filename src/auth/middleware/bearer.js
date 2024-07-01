'use strict';

const { volunteerBridgeUser } = require('../../models/index.js');

module.exports = async (req, res, next) => {

  const volunteerBridgeUserModel = volunteerBridgeUser.model;

  try {

    if (!req.headers.authorization) { _authError() }

    

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await volunteerBridgeUserModel.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}
