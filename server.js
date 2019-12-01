const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
const mongoose = require('mongoose');
const db = "mongodb+srv://streakfull:7aramy%402013@overflow-i0iu7.mongodb.net/test?retryWrites=true";
const users = require('./user.model.js');

const dbConfig = { useNewUrlParser: true, useFindAndModify: false };
mongoose
  .connect(db, dbConfig)
  .then(() => {
    console.log('Connected to users Database');
  })

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:e9c1070a-2c59-44ea-bc16-68c1365db3e4',
  key: '206dd388-59e4-42ba-909f-655755a5b7ff:i4De+Camp+LETNaIrec6vAnrbShc5MDEtblqKxGE3qI=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})
