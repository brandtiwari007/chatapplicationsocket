let signuprouter = require('express').Router();
let apiuser = require('./api');

let signupschema = require('../schema/signupschema');
let chatSchema = require('../schema/chatSchema');

signuprouter.post('/signup', async (req, res) => {
  console.log(req.body);

  let result = await apiuser.userFind(req.body);
  if (result.length === 0) {
    let createUser = await apiuser.createUser(req.body);
    if (createUser) {
      res.send('user created');
    }
  } else {
    res.send('user exists');
  }
});
signuprouter.post('/getUsers', async (req, res) => {
  console.log('get data');
  try {
    let data = await apiuser.getData();
    console.log(data);
    if (data) {
      res.send(data);
    } else {
      res.send('not data');
    }
  } catch (err) {
    console.log(err);
    res.end();
  }
});
signuprouter.post('/login', async (req, res) => {
  try {
    let result = await apiuser.checkLogin(req.body);
    if (result) {
      console.log(result);
      res.send(result);
    }
  } catch (err) {
    res.send(err);
  }
});
signuprouter.post('/chat', async (req, res) => {
  try {
    console.log(req.body, 'request bory');
    let chat_data = await apiuser.chatData(req.body);
    if (chat_data) {
      res.send('data inserted');
    }
  } catch (err) {
    console.log(err);
    res.end(err);
  }
});

module.exports = signuprouter;
