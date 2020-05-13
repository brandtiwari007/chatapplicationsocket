let mongoose = require('mongoose');
let schema = mongoose.Schema({
  to: 'String',
  from: 'String',
  message: 'String',
});
module.exports = mongoose.model('chat', schema);
