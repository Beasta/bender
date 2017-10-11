var slackTerminal 	= require('slack-terminalize'),
	commands 		= slackTerminal.getCommands(),
	util			= require('../util');

var _helpAll = function (param) {
	var name,
		index,
    response = [],
		command;
  var data = JSON.parse(fs.readFileSync(__dirname + '/../data.json', 'utf8'));
  var validUser = util.isValidUser(param.user, data.users);
  if (validUser) {
    index = 1;
    for (name in commands) {
      command = commands[name];

      if (!command.exclude) {
        response.push(index++  + '. ' + _helpCommand(name));
      }
    }

    return response.join('\n\n');
  } else {
    util.postMessage(param.channel, 'you are not a valid user');
  }
};

var _helpCommand = function (name) {
	var response = [ commands[name].help, 'Alias: ' + commands[name].alias.join(', '), commands[name].description ];

	return response.join('\n\n');
};

module.exports = function (param) {
	var	channel		= param.channel,
		response;

	if (!param.args.length) {
		response = _helpAll();
	}
	else {
		response = _helpCommand(param.args[0]);
	}

	util.postMessage(channel, response);
};
