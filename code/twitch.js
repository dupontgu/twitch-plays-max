// EDIT THE TEXT IN QUOTES TO FIT YOUR NEEDS!!!
const botUsername = "YOUR_USERNAME"
const channelToJoin = "CHANNEL_NAME"
const oauthToken = "YOUR_TOKEN_HERE"

// START CODE
const maxAPI = require("max-api");
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: botUsername,
		password: oauthToken
	},
	channels: [ channelToJoin ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  // messages should take the form "[key] [value]"
  let splitString = message.split(/\s+/);
  if (splitString.length < 2) {
    return;
  }
  let key = splitString[0]
  let value = splitString[1]
  maxAPI.outlet(key, value)
});
