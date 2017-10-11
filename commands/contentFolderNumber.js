var request = require('request'),
	util = require('../util'),
	fs = require('fs'),
  trim = require('trim'),
	path = require('path');

var lstatSync = fs.lstatSync;
var readdirSync = fs.readdirSync;
var join = path.join;
var isDirectory = function (source) {
	return lstatSync(source).isDirectory();
};
var checkProperDirectoryNumber = function (str) {
	return !isNaN(Number.parseInt(str[0])) && !isNaN(Number.parseInt(str[1]))
};

module.exports = function (param) {
	// var channel = param.channel,
	// 	// endpoint = param.commandConfig.endpoint.replace('{gem}', param.args[0]),
	// 	info = [],
	// 	data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));
	// if (!data.directory) {
	// 	// info.push('please define the data directory before continuing. \n ie - "directory /Users/username/Fullstack-Lesson-Plans"')
	// 	info.push("Error: directory not defined. Define the data directory before continuing. \n ie - 'directory /Users/username/Fullstack-Lesson-Plans' \n tip: get the directory by finding the folder in terminal and typing 'pwd'")
	// } else { // data.directory is defined
	// 	if (param.args[0]) { // parameters defined, do a set
	// 		console.log('checknubmer:', checkProperDirectoryNumber(param.args[0]));
	// 		if (checkProperDirectoryNumber(param.args[0])) {
	// 			data.contentFolderNumber= param.args[0];
	// 			data.datePath = `${data.directory}/${data.week}-week/${data.day}-day/`
   //      console.log('data.dataPath', data.dataPath);
	// 			info.push('set the exercise (aka content) folder number to: ', param.args[0]);
	// 			data.contentFolderName = util.findDirectoryName(data.directory, param.args[0]);
   //      fs.writeFileSync(__dirname + '/../data.json', JSON.stringify(data), 'utf8');
	// 			info.push('\n');
	// 			info.push('the name of the folder is: ', data.contentFolderName);
	// 		} else { // parameter is not a proper number
	// 			info.push('Must use proper number format ... ie - 01, 02, 10, etc')
	// 		}
	// 	} else { // no parameters given, do a get
   //    info.push('the name of the folder is: ', data.contentFolderName);
	// 	}
	// }
	// util.postMessage(channel, info.join(''));
};

// const { lstatSync, readdirSync } = require('fs')
// const { join } = require('path')

// const isDirectory = source => lstatSync(source).isDirectory()
// const getDirectories = source =>
//   readdirSync(source).map(name => join(source, name)).filter(isDirectory)