const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDb = require('./database')
const router = require('./routes')
const { getUrl } = require('./services/urlService')
const errorHandler = require('./validator/errorHandler')
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
app.get('/:url', getUrl)
app.use('/api', require('./routes'))
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`server started on ${process.env.APP_URL}:${process.env.PORT}`)
})
