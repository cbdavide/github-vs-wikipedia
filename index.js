'use strict'

const express = require('express')
const ghStream = require('./ghevents')

const app = express()

app.listen(3000, () => {
  console.log('Running on http://localhost:3000')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
