let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let socket = require('socket.io');
let cors = require('cors');
let mongoose = require('mongoose');
let signuprouter = require('./router/signuprouter');
// let loginrouter = require("./router/loginrouter");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/reactChat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/user', signuprouter);

var server = app.listen(8968, () => {
  console.log('server started');
});

var io = socket(server);
var users = [];

io.sockets.on('connection', (socket) => {
  handleConnection(socket);
});

const handleConnection = (socket) => {
  socket.on('newUserRegister', (user) => {
    users[user.email] = socket.id;
    console.log('for now we have user available are : ', users);
  });

  socket.on('privateMessage', (data) => {
    console.log('+++', data);
    console.log('newMessage', {
      data: data.message,
      // data_from: data.from,
      // data_to: data.to,
    });

    io.to(users[data.to]).emit('newMessage', data);
    io.to(users[data.from]).emit('newMessage', data);
  });
};
