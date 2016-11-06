'use strict'

const http = require('http')
const express = require('express')
const ghStream = require('./ghevents')
const io = require('socket.io')

const app = express()

app.use(express.static('static'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html')
})

const server = http.createServer(app)
server.listen(3000, () => {
  console.log('Running on http://localhost:3000')
})

const ioServer = io(server)
ioServer.on('connection', (client) => {
  console.log(`${client.id} has connected`)

  ghStream.on('data', (data) => {
    client.emit('gh', data);
  })
})
