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

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})

app.get('/get_users',async (req,res) => {
  const userData = await users.find();
  return res.json({data:userData});
})

app.get('/add_user/:email/:password',async(req,res) => {
  const { email, password} = req.params;
  const newUser = await users.create({email,password});
  return res.json({data:newUser});
})

app.get('/login/:email/:password',async(req,res)=>{
  const {email,password} = req.params;
  const user = await users.findOne({email,password});
  if(user){
    return res.json({data:"Logged IN"});
  }
  return res.status(400).send({error:"Wrong email or password"});
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
