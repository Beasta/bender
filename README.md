# Bender

An app to simplify the process of uploading files to slack for the Trilogy full stack course

# Setup

- Install nodemon globally with `npm i -g nodemon`
- Run `npm install` to install the dependencies
- Copy and paste `data.json.example` and rename to `data.json`
- Open the data.json file and insert your userID into the `users` array. If you don't know your user ID you can run the bot and type the `addUser` command.
- Copy and paste `keys.json.example` and rename to `keys.json`
- Insert `xoxb` token as `"apiToken"` in `keys.json`
- Run `nodemon` to start the app. Now the bot should be listening to the slack team you integrated it with
- Invite the bot to desired channels with `/invite @<your-bot-name>` and try the sample commands
- Open a private chat with your bot and set the data directory for your class repo by using the `dir` command
- Start with `help` in the channel the bot is listening to
