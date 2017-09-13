var request = require('request'),
	path 	= require('path'),
	util 	= require('../util'),
	Upload 	= require('node-slack-upload'),
    keys	= JSON.parse(fs.readFileSync(__dirname + '/../keys.json', 'utf8')),
	apiToken = keys.apiToken,
	upload = new Upload(apiToken);
module.exports = function (param) {
	var	channel		= param.channel,
	endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]);
	upload.uploadFile({
		file: fs.createReadStream(path.join(__dirname, '/../util.js')),
		filetype: 'post',
		title: 'util.js',
		initialComment: '',
		channels: 'bot-test'
	}, function(err, data) {
		if (err) {
			console.error('error', err);
		}
		else {
			// console.log('Uploaded file details: ', data);
			console.log('file uploaded');
		}
	});
};