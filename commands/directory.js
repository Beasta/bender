var request = require('request'),
util 	= require('../util');

module.exports = function (param) {
	var	channel		= param.channel,
		endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]),
		info 		= [],
		data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));
	if (!data.directory) {
		data.directory = "";
		fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
	}
	if (param.args[0]) {
		data.directory = param.args[0];
		fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
		info.push('set directory to: ', param.args[0]);
	} else {
		info.push(data.directory);
	}
	util.postMessage(channel, info.join(''));
};