require('dotenv').config();
const express = require('express');
const app = express();
const messagesRoute = require('./routes/messages-route')

app.use(express.json());
app.use('/messages', messagesRoute);

// const MessagesController = require("./controllers/messages-controller")

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});