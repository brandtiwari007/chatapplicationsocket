// import { resolvePreset } from "@babel/core";

let signuprouter = require('./signuprouter');
let signupschema = require('../schema/signupschema');
let chatSchema = require('../schema/chatSchema');

module.exports = {
  userFind: function (data) {
    console.log('userfind', data);
    return new Promise((resolve, reject) => {
      signupschema.find({ email: data.email }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  createUser: function (data) {
    return new Promise((resolve, reject) => {
      signupschema.create(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  checkLogin: function (data) {
    console.log('logged in', data);
    return new Promise((resolve, reject) => {
      signupschema.findOne({ email: data.email }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(result);
          if (result) {
            signupschema.findOne({ password: data.password }, (err, result) => {
              console.log('in password');
              if (err) {
                reject(err);
              } else {
                if (result) {
                  console.log('++pass');
                  resolve('user logged in');
                } else {
                  resolve('password not matched');
                }
              }
            });
          } else {
            reject('email not exist');
          }
        }
      });
    });
  },
  getData: () => {
    return new Promise((resolve, reject) => {
      signupschema.find({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  chatData: (data) => {
    return new Promise((resolve, reject) => {
      chatSchema.create(data, (err, result) => {
        if (err) {
          console.log('error in api', err);
          reject(err);
        } else {
          console.log(result);
          resolve('inside result', result);
        }
      });
    });
  },
};
