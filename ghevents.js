'use strict';

const GitHubApi = require('github')
const through2 = require('through2')

//GitHubApi Config
const github = new GitHubApi({
  protocol: 'https',
  Promise: Promise,
  timeout: 5000,
})

github.authenticate({
    type: "oauth",
    token: process.env.GH_TOKEN || ''
})

let ghEventStream = through2.obj({objectMode:true}, function(chunk, encoding, cb){
  this.push(chunk)
  cb()
})

let transformStream = through2.obj({objectMode:true}, function(chunk, enc, cb){
  for(let entry of chunk) {
    this.push({
      type: entry.type,
      payload: entry.payload
    })
  }
  cb()
})

let delayStream = through2.obj({ objectMode: true }, function(ch, enc, cb){
  setTimeout(() => {
    this.push(ch)
    cb()
  }, 1000)
})

github.activity.getEvents({})
  .then(data => {
    ghEventStream.write(data)
  })
  .catch(err => {
    console.log(err)
  });

ghEventStream.pipe(transformStream).pipe(delayStream)

module.exports = delayStream
