'use strict'

const socket = io()
const container = document.getElementById('container')

socket.on('gh', (data) => {
  let element = document.createElement('div')
  element.textContent = JSON.stringify(data)

  container.appendChild(element)
})
