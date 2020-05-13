let express = require("express");
let loginrouter = express.Router();
let apiuser = require("./api");

let signupschema = require("../schema/signupschema");
loginrouter.post("/", async (req, res) => {
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
module.exports = loginrouter;
