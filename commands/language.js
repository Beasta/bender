var request = require('request'),
	util 	= require('../util');

module.exports = function (param) {
	var	channel		= param.channel,
		endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]),
		info 		= [],
		data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));
	var validUser = util.isValidUser(param.user, data.users);
	if (validUser) {
    if (!data.directory){
      info.push("Error: directory not defined. Define the data directory before continuing. \n ie - 'directory /Users/username/Fullstack-Lesson-Plans' \n tip: get the directory by finding the folder in terminal and typing 'pwd'")
    } else {

      if (param.args[0]) {
        data.language = param.args[0];
        fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
        info.push('set language to: ', param.args[0]);
      } else {
        if (!data.language) {
          data.language= 1;
          fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
        }
        info.push(data.language);
      }
    }
  } else {
	  info.push('You are not a valid user');
  }
	util.postMessage(channel, info.join(''));
};