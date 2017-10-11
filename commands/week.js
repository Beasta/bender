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
        data.week = param.args[0];
        fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
        info.push('set week to: ', param.args[0]);
        console.log('data.directory', data.directory);
        // util.findDirectoryName(join())
        // info.push(`the folder for this week is: ${util.findDirectoryName(data.directory, )}`)
        console.log('data.week',data.week);
      } else {
        if (!data.week) {
          data.week= 1;
          fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
        }
        info.push(data.week);
      }
    }
  } else {
	  info.push('You are not a valid user');
  }
	util.postMessage(channel, info.join(''));
};