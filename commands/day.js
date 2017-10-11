var request = require('request'),
	util 	= require('../util');

module.exports = function (param) {
	var	channel		= param.channel,
		endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]),
		info 		= [],
		data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));

	if (param.args[0]) {
		data.day = param.args[0];
		fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
		info.push('set day to: ', param.args[0]);
		info.push(`
		the folder for this day is: `)
	} else {
	  if (!data.day) {
      data.day = 1;
      fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
    }
		info.push(data.day);
	}
	util.postMessage(channel, info.join(''));
};