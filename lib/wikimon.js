'use strict'

const WebSocketClient = require('websocket').client
const client = new WebSocketClient()

client.on('connectFailed', function (err) {
  console.log('Failed' + err)
})

client.on('connect', function (connection) {
  console.log('Connected socio.')

  connection.on('error', function (err) {
    console.error('Connection error.')
    throw err
  })

  connection.on('message', function (message) {
    console.dir(message)
  })
})

client.connect('ws://wikimon.hatnote.com:9000')
