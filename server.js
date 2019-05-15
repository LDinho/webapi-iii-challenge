const express = require('express');

const server = express();


// import routers
const userRouter = require("./users/userRouter");

// built in middleware
server.use(express.json()); // parses body


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

// routers - users
server.use("/api/users", userRouter);

module.exports = server;
