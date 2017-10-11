var webClient = require('slack-terminalize').getWebClient();
var trim = require('trim');
var fs = require('fs');
var keys	= JSON.parse(fs.readFileSync(__dirname + '/keys.json', 'utf8'));
var apiToken = keys.apiToken;
var Upload 	= require('node-slack-upload');
var upload = new Upload(apiToken);
var archiver = require('archiver');
/**
 * Wrapper function for postMessage from slack-client to handle formatting.
 * 
 * @param  { object } slack-client Channel boject
 * @param  { string } message to send to Slack channel
 * @param  { boolean } flag to indicate block formatting
 * @return { none }
 * 
 */
var postMessage = function (channel, response, format) {
  console.log("posting message");
	format = format || true;
	response = (format && '```' + response + '```') || response;

    // more on this API here: https://api.slack.com/methods/chat.postMessage
	webClient.chat.postMessage(channel, response, {
		as_user: true
	});

};

var findDirectoryName = function (dataDirectory, partialFolderName) {
  var files;
  var filePath;
  partialFolderName = partialFolderName || "";
  partialFolderName = partialFolderName.toUpperCase();
  files = listFiles(dataDirectory);
  filePath = files.find(file => file.toUpperCase().search(partialFolderName) !== -1)
  return filePath;
}
var listFiles = function (path) {
  var files = [];
  fs.readdirSync(trim(path)).forEach(file => {
    files.push(file);
  })
  return files;
}
var zipper = function (path, folder, channel, title, upload,  remove) {
  output = fs.createWriteStream(`${path}/${title}.zip`);
  archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    util.uploader(`${path}/${title}.zip`, channel, title, remove);
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      console.log('warning:', err)
    } else {
      // throw error
      console.log('another err:', err)
      throw err;
    }
  });

  archive.pipe(output);
  archive.directory(path, false);
  archive.finalize();
}
// uploads a file to specific channel
var uploader = function (zipFilePath, channel, title, remove) {
  var info = [];
  upload.uploadFile({
    file: fs.createReadStream(zipFilePath),
    filetype: 'zip',
    title: title,
    initialComment: '',
    channels: channel,
  }, function (err, data) {
    if (err) {
      console.error('error', err);
      info.push('error: ' + err);
      postMessage(channel, info.join(''));
    }
    else {
      console.log('Uploaded file details: ', data);
      console.log('file uploaded');
      if (remove) {
        fs.unlinkSync(zipFilePath);
        console.log ('zip deleted');
      }
    }
  });
}
var isValidUser = function (user, verfiedUsers) {
  var validUser;
  if (verfiedUsers) {
    validUser = !!verfiedUsers.find(thisUser => user === thisUser);
  } else {
    util.postMessage(param.channel, 'Please add a verified user')
  }
  return validUser;
}

exports.postMessage = postMessage;
exports.findDirectoryName = findDirectoryName;
exports.uploader = uploader;
exports.zipper = zipper;
exports.listFiles = listFiles;
exports.isValidUser = isValidUser;