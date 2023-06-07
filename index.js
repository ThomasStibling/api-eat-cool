require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const hostname = '127.0.0.1'
const port = process.env.PORT

mongoose.connect('mongodb+srv://thomasstibling:root@api.z6z9txp.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// import des routes depuis ./routes/
const billsRoutes = require('./routes/bills')

const app = express()

// permet de transformer le body de la requête en json automatiquement
app.use(express.json())

// attention, l'ordre est important
// d'abord on vérifie la sécurité avec cors
app.use(cors({
  origin: 'http://localhost:5173'
}))

// configure les routes
app.use('/bills', billsRoutes)
app.use('/customers', customersRoutes)

// route principale
app.get('/', (req, res) => {
  res.json({
    api: 'bills app api',
    version: process.env.VERSION
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})