var request = require('request');
var webClient = require('slack-terminalize').getWebClient(),
    util 	= require('../util');

module.exports = function (param) {
  var	channel		= param.channel,
      data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));
  webClient.users.list().then(function (userList) {
    var user = userList.members.find(user => user.id === param.user)
    var name = user.real_name ? user.real_name : user.name;
    if (util.isValidUser(param.user, data.users)) {
      util.postMessage(channel, `awwww thanks ${name}. you are awesome!`);
    } else { // must be a student
      util.postMessage(channel, `bleepity bloop blop blop ${name}! brop brop?`);
    }
  });
};