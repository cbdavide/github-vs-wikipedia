var GitHubApi = require('github');
var github = new GitHubApi({
  protocol: 'https',
  Promise: Promise,
  timeout: 5000
});

github.activity.getEvents({})
.then(data => {
  console.log(data);
})
.catch(err => {
  console.log(err);
})
