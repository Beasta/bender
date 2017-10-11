var request = require('request'),
	path 	= require('path'),
	trim 	= require('trim');
	fs		= require('fs');
	util 	= require('../util'),
	Upload 	= require('node-slack-upload'),
    keys	= JSON.parse(fs.readFileSync(__dirname + '/../keys.json', 'utf8')),
	apiToken = keys.apiToken,
	upload = new Upload(apiToken);
module.exports = function (param) {
	var	channel		= param.channel,
	endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]),
	info = [];
	data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));
	if (!data.directory) {
		data.directory = "";
	};
	// console.log('trim: ', trim('        trim     '))
	// console.log(data.directory + '/yarn.lock');
	// console.log('data.directory', data.directory);
	// console.log('path', path.join(__dirname, '/../util.js'))
	// console.log('joined dir: ', path.join(trim(data.directory), '/curriculum-resources.md'));
	// console.log('dirname', __dirname);
	// /Users/barryblaha/Code/coding-boot-camp/FullStack-Lesson-Plans
	var files = [];
  fs.readdirSync(trim(data.directory)).forEach(file => {
    files.push(file);
  })
  console.log(files);
  // var filePath = arr.find(file => {return file.search(str)!==-1})
	upload.uploadFile({
		// file: fs.createReadStream(path.join(__dirname, '/../util.js')),
		file: fs.createReadStream(path.join(trim(data.directory), '/curriculum-resources.md')),
		// file: fs.createReadStream(path.join(trim(data.directory), '/gulpfile.js')),
		// content: fs.createReadStream(path.join(trim(data.directory), '/gulpfile.js')),
		filetype: 'markdown',
		title: '',
		initialComment: '',
		channels: 'bot-test'
	}, function(err, data) {
		if (err) {
			console.error('error', err);
			info.push('error: ' + err);
			util.postMessage(channel, info.join(''));
		}
		else {
			// console.log('Uploaded file details: ', data);
			console.log('file uploaded');
		}
	});
};