'use strict';

const express = require('express');
const dataModules = require('../models');

const router = express.Router();

const users = dataModules.volunteerBridgeUser;
const basicAuth = require('../auth/middleware/basic.js')
const bearerAuth = require('../auth/middleware/bearer.js')
const permissions = require('../auth/middleware/acl.js')

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});


router.post('/signup', signup);
router.post('/signin', basicAuth, signin);
router.get('/users', bearerAuth, permissions('delete'), findUsers);
router.get('/secret', bearerAuth, permissions('create'), secret);


router.get('/:model', bearerAuth, handleGetAll);
router.get('/:model/:id', bearerAuth, handleGetOne);
router.post('/:model', bearerAuth, permissions('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);

async function signup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
}

async function signin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    next(e.message)
  }
}

async function findUsers(req, res, next) {
  const userRecords = await users.findAll({});
  const list = userRecords.map(user => user.username);
  res.status(200).json(list);
}

async function secret(req, res, next) {
  res.status(200).send('Welcome to the secret area')
}

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;
