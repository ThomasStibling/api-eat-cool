require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const port = 4000

mongoose.connect('your_connection_string_availible_on_mongo_atlas',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const alimentRoutes = require('./routes/aliments')
const userRoutes = require('./routes/users')
const planningRoutes = require('./routes/plannings')

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:4200'
}))

app.use('/aliments', alimentRoutes)
app.use('/users', userRoutes)
app.use('/plannings', planningRoutes)

app.get('/', (req, res) => {
  res.json({
    api: 'eat cool api',
    version: process.env.VERSION
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})