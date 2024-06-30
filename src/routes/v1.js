'use strict';

const express = require('express');
const dataModules = require('../models');

const users = dataModules.volunteerBridgeUser;


const router = express.Router();

// const users = require('../auth/models/users.js');
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
router.post('/signin', signin);
router.get('/users', findUsers);
router.get('/secret', secret);


router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function signup(req, res, next) {  
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.userId
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
}

async function signin(req, res, next) {

  const userID = req.body.userID;
  const user = await users.model.findOne({ where: { userID } });
  console.log(user);

  res.status(200).json(user);
}

async function findUsers(req, res, next) {
  const userRecords = await users.get();
  res.status(200).json(userRecords);
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
