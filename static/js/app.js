'use strict'

const socket = io()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const githubColors = {
  'PushEvent':          '#4caf50',
  'CreateEvent':        '#0091ea',
  'IssuesEvent':        '#f44336',
  'WatchEvent':         '#ffca28',
  'DeleteEvent':        '#ff1744',
  'PullRequestEvent':   '#c6ff00',
  'IssueCommentEvent':  '#ef5350',
  'PublicEvent':        '#00e676',
  'GollumEvent':        '#263238',
  'ForkEvent':          '#536dfe',
  'ReleaseEvent':       '#b0bec5',
  'MemberEvent':        '#4db6ac'
}

const WIDTH = 500
const HEIGHT = 300

let ratio = 15

let pos_x = ratio
let pos_y = ratio

socket.on('gh', (data) => {
  console.log(data)

  if(pos_x > (WIDTH - ratio)) {
    pos_x = ratio
    pos_y += (2 * ratio) + 5
  }

  if(pos_y > (HEIGHT - ratio)) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    pos_y = ratio
  }

  ctx.beginPath()
  ctx.arc(pos_x, pos_y, ratio, 0, 2 * Math.PI, true)

  pos_x += (2 * ratio) + 5

  ctx.fillStyle = githubColors[data.type]
  ctx.fill()
})
