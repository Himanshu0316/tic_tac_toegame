const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const http = require("http");
const Room = require('./Model/Room.model');
const UserRouter = require("./Router/User.router");
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const app = express();
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

var jsonParser = bodyParser.json()


require("dotenv").config;
const PORT = process.env.PORT || 5000;
const mongodb_url =
  process.env.MONGODB_URL || "mongodb://localhost:27017/";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});
app.use(express.static(path.resolve("")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", UserRouter);
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//   next();
// })
app.get("/", (req, res) => {
  res.send("Homepage");
});




//post request to join room
app.post('/join_room', jsonParser, async (req, res) => {
  // console.log('req reciveed', req.body);

  //check if the room which this exist or not
  const room_id = req.body.room_id;
  console.log('room_id', room_id);
  const my_room = await Room.findOne({ uID: room_id })
    .catch((err) => {
      console.log('error occured while checking room', err)
    });

  // console.log('room' ,my_room);
  flag = false;
  if (my_room) {
    // check if room has less than 2 user
    if (my_room.noOfUser < 2) {

      // increase no of user
      my_room.noOfUser++;
      const doc = await my_room.save();

      res.status(200).json({ doc });
    } else {
      //Room is full
      res.status(200).json({ err: "Room is Full can't join " })
    }
  } else {
    res.status(200).json({ err: "Enter Valid Room ID" })
  }

})

app.get('/create_room', (req, res) => {

  //Generating unique id for each room
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z'];

  let result = "";
  for (let index = 0; index < 5; index++) {
    result += alphabet[Math.floor(Math.random() * 10000) % 25];
  }

  //Saving newly creted roomt to database
  const room = new Room({ uID: result, noOfUser: 1 });
  room.save().then(() => {
    console.log('room created', result);
  }).catch((err) => {
    console.log('err creating room', err);
  })

  res.json(result);
})
io.on('connection', (socket) => {

  // user join register room_id 
  socket.on('join', async room_id => {
    console.log('user joined', room_id);
    socket.join(room_id);

    const my_room = await Room.findOne({ uID: room_id })
      .catch((err) => {
        console.log('error occured while checking room', err)
      });

    if (my_room && my_room.noOfUser === 2) {
      io.to(room_id).emit('youCanPLayNow');
      console.log("hhhhhhhh")
    }
  })

  //incoming message from chat.js
  socket.on('sendMessage', async ({ message, name, user_id, room_id }) => {
    const msgToStore = {
      name,
      user_id,
      room_id,
      text: message
    }

    io.to(room_id).emit('messageReceived', msgToStore);
  })

  socket.on('squareClicked', ({ i, name, user_id, room_id }) => {
    const click = {
      i,
      name,
      user_id,
      room_id,
    };
    console.log(`${name} clicked ${i} square in room ${room_id}`);
    io.to(room_id).emit('squareClickedReceived', click);
  })

  socket.on('playAgain', room_id => {
    io.to(room_id).emit('playAgainReceived');
  })
})

// database name needs to change
mongoose.connect(mongodb_url).then(() => {
  server.listen(PORT, () => {
    console.log("server is started on port " + PORT);
  });
});
