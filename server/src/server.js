const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDb = require('./database')
const router = require('./routes')
require('dotenv').config()


const app = express()
connectDb(process.env.MONGO_URL)
const corsOptions = {
    origin: process.env.WEB_URL,
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use('/', require('./routes'))

app.listen(process.env.PORT, () => {
    console.log(`server started on ${process.env.APP_URL}:${process.env.PORT}`)
})
