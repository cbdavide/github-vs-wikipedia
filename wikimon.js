var WebSocketClient = require('websocket').client
var client = new WebSocketClient()

client.on('connectFailed', function (err) {
  console.log('Failed' + err)
})

client.on('connect', function (connection) {
  console.log('Connected socio.')

  connection.on('error', function (err) {
    console.log('Connection error.')
  })

  connection.on('message', function (message) {
    console.dir(message)
  })
})

client.connect('ws://wikimon.hatnote.com:9000')
