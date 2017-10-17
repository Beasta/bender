var trim 	= require('trim'),
    fs		= require('fs'),
    util 	= require('../util'),
    archiver = require('archiver'),
    errorMessage = `
      To upload a file, please pass two arguments:
      The first argument should be the activity number
      The second argument should be: 
        u for unsolved,
        s for solved,
        f for entire folder
        r for the readme
        ls to list the folder contents
      like this: "Activity 5 u"
      or "act 5 u"`;
module.exports = function (param) {
  var filePath,
      folderType,
      dayFolder,
      activityFolder,
      folder,
      validUser,
      data,
      parentFilePath;
  data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));
  if (!data.directory) {
    data.directory = "";
  }

  validUser = util.isValidUser(param.user, data.users);
  if (validUser) {
    folderType = util.findDirectoryName(data.directory, '01')
    filePath = `${data.directory}/${folderType}`;
    dayFolder = util.findDirectoryName(filePath, data.week);
    filePath += `/${dayFolder}/01-Activities`;
    activityFolder = util.findDirectoryName(filePath, param.args[0]);
    parentFilePath = filePath;
    filePath += `/${activityFolder}`

    if (param.args[1]) { // no arguments passed
      if(typeof param.args[1] === 'string') {
        param.args[1] = param.args[1].toLowerCase();
      }
      if (param.args[1] === 'f') { // upload entire folder
        util.zipper(filePath, activityFolder, param.channel, `${activityFolder}`, parentFilePath, true, true);

      } else if (param.args[1] === 'u') { // upload the unsolved folder
        folder = util.findDirectoryName(filePath, 'unsolved');
        if (folder) {
          filePath += `/${folder}`
          util.zipper(filePath, folder, param.channel, `${activityFolder}-${folder}`, parentFilePath, true, true);
        } else {
          util.postMessage(param.channel, 'There is no unsolved folder in this directory')
        }

      } else if (param.args[1] === 's') { // upload the solved folder
        folder = util.findDirectoryName(filePath, 'solved');
        if (folder) {
          filePath += `/${folder}`
          util.zipper(filePath, folder, param.channel, `${activityFolder}-${folder}`, parentFilePath, true, true);
        } else { // no solved folder available
          util.postMessage(param.channel, 'There is no solved folder in this directory')
        }

      } else if (param.args[1] === 'r') { // list all the files
        // util.postMessage(param.channel, util.listFiles(filePath));
        folder = util.findDirectoryName(filePath, 'readme');
        data = fs.readFileSync(`${filePath}/${folder}`, 'utf8');
        util.postMessage(param.channel, data, false);
      } else if (param.args[1] === 'ls') { // list all the files
        util.postMessage(param.channel, util.listFiles(filePath));
      }
    } else if (param.args[0]) { // 1 argument passed
      util.postMessage(param.channel, errorMessage + `\n\nfiles in ${activityFolder} folder are\n` + util.listFiles(filePath));
    } else if (!param.args[1]) { // no arguments passed
      util.postMessage(param.channel, errorMessage);
    }
  } else { // invalid user
    util.postMessage(param.channel, 'you are not a verified user :(')
    util.postMessage(param.channel, `Your user id is ${param.user}`);
  }
};
