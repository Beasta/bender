var request = require('request'),
	util 	= require('../util');

module.exports = function (param) {
	var	channel		= param.channel,
		endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]),
		info 		= [],
		data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));
	if (!data.fullOrPart) {
		data.fullOrPart = 'fullTime';
		fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
	}
	if (param.args[0]) {
		if (param.args[0] === 'fullTime' || param.args[0] === 'partTime') {
			data.fullOrPart = param.args[0];
			fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
			info.push('set schedule to: ', param.args[0]);
		} else {
			info.push('the only two options are "fullTime" or  "partTime"')
		}
	} else {
		info.push(data.fullOrPart);
	}
	util.postMessage(channel, info.join(''));
};