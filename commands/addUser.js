var request = require('request'),
	util 	= require('../util');

module.exports = function (param) {
	var	channel		= param.channel,
			user = param.user,
		info 		= [],
      data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8')),
  validUser = util.isValidUser(user, data.users);

  if (validUser) {
    data.users.push(param.args[0]);
    fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
    info.push(`${param.args[0]} has been added`);
  } else {
    info.push('Must be a verified user to add a user. If you are the first user, add your ID to the data.json file manually\n')
    info.push(`Your user id is ${user}`);
  }


	util.postMessage(channel, info.join());
};