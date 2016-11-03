'use strict'

const express = require('express')
const sock = require('sockjs')
const ghStream = require('./ghevents')

const echo = sock.createServer({
  sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
})

echo.on('connection', (con) => {
  ghStream.on('data', (data) => {
    con.write(data);
  })
})

const app = express()

//Binds the sockjs server to the express server
echo.installHandlers(app, { prefix: '/echo' })

app.listen(3000, () => {
  console.log('Running on http://localhost:3000')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
