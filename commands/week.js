var request = require('request'),
	util 	= require('../util');

module.exports = function (param) {
	var	channel		= param.channel,
		endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]),
		info 		= [],
		data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));
	if (!data.week) {
		data.week= 1;
		fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
	}
	if (param.args[0]) {
		data.week = param.args[0];
		fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
		info.push('set week to: ', param.args[0]);
		console.log('data.week',data.week);
	} else {
		info.push(data.week)
	}
	util.postMessage(channel, info.join(''));
};