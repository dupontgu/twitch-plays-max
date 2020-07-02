# Twitch Plays Max/MSP

![Twitch Plays Max GIF](/.docs/max_twitch.gif)


I will eventually eventually bundle this up and distribute it as a proper M4L device.
This will get you started in the meantime, if you're feeling up to doing things manually.
(It's not too bad, I promise)

Note - this Max system uses [`tmi.js`](https://github.com/tmijs) under the hood. Almost all credit goes to them!

## Max For Live (M4L) Instructions

1. Download this repository. There should be a green button towards the top-right of this page that will provide you a "Download ZIP" option.

2. Use the [`Twitch Chat OAuth Password Generator`](https://twitchapps.com/tmi) app to generate an OAuth token for your account.  If you're successful, it should present you with a token that looks something like "oauth:abcd123...".  Copy that text and store it somewhere secure. If someone else gets it, they will be able to use parts of your Twitch account.

3. In the folder that you've downloaded via this repository, find the files `/m4l/TwitchPlays.amxd` and `/TwitchPlaysMax/code/twitch.js`, and copy both of them into Ableton's `Max Midi Effect` folder. On a Mac, the default location for this is `/{username}/Music/Ableton/User Library/Presets/MIDI Effects/Max MIDI Effect`. 

4. In Ableton, create a new MIDI track.  Add the `TwitchPlays` M4L device to your track. Under Collections -> Max For Live -> Max MIDI Effect, you should see `TwitchPlays.amxd` as an option now (You may have to restart Live).

5. When the M4L device loads, double-click on the `node-script twitch.js` object to open the JavaScript editor.

6. Replace the credentials at the top with your own.  There are three lines you'll need to edit:
```
const botUsername = "YOUR_USERNAME"
const channelToJoin = "CHANNEL_NAME"
const oauthToken = "YOUR_TOKEN_HERE"
```
Replace `YOUR_USERNAME` with your Twitch username.
Replace `CHANNEL_NAME` with the id of the Twitch channel you'd like to monitor.
Replace `YOUR_TOKEN_HERE` with the token you copied in step 2.

_Make sure you don't accidentally remove the quotes around the text, they are necessary._

7. Save the file and close the JavaScript editor.

8. Click the message that says `script npm install tmi.js`.  Give the script a few seconds to run.

9. Click the button labeled `List all devices...`

10. Using the drop-down menus, choose the device and parameter you wish to control via Twitch.

11. Click the message that says `script start`. You'll need to do this every time you re-open your project.

12. You should now be receiving messages from Twitch. By default this device is listening for messages that read "parameter 0.5" or "parameter 1".  The value from these messages (the numbers) will control whatever device parameter you selected in step 10. If you edit the M4L device, you can change the `route parameter` object to look for messages that start with any arbitrary key. `route filter` or `route gain` for example.  Furthermore, you can add additional `route` objects to monitor multipler parameters at once. Simply copy everything down-and-to-the-right of the original `route` object, and connect the input of your new `route` copy to the output of the `node.script` object. Here's what it might look like:

![Twitch Plays Max For Live](/.docs/max_twitch_filter.png)

---

## Standalone Max Patch Instructions

1. Download this repository. There should be a green button towards the top-right of this page that will provide you a "Download ZIP" option.

2. Use the [`Twitch Chat OAuth Password Generator`](https://twitchapps.com/tmi) app to generate an OAuth token for your account.  If you're successful, it should present you with a token that looks something like "oauth:abcd123...".  Copy that text and store it somewhere secure. If someone else gets it, they will be able to use parts of your Twitch account.

3. In the folder that you've downloaded via this repository, find the `TwitchPlaysMax.maxproj` file and open it in Max. Open the `TwitchPlaysMax` patcher.

4. With the patcher locked, double-click on the `node-script twitch.js` object to open the JavaScript editor.

5. Replace the credentials at the top with your own.  There are three lines you'll need to edit:
```
const botUsername = "YOUR_USERNAME"
const channelToJoin = "CHANNEL_NAME"
const oauthToken = "YOUR_TOKEN_HERE"
```
Replace `YOUR_USERNAME` with your Twitch username.
Replace `CHANNEL_NAME` with the id of the Twitch channel you'd like to monitor.
Replace `YOUR_TOKEN_HERE` with the token you copied in step 2.

_Make sure you don't accidentally remove the quotes around the text, they are necessary._

6. Save the file and close the JavaScript editor.

7. When you're ready to run, click the message that says `script npm install tmi.js`.  Give the script a few seconds to run. You should see output on the Max console.

8. To start the script, click the message that says `script start`. Again, you'll see output on the Max console. If you're successful, you should see a final message that says something like: `info: joined #channelName`.

## Parsing Message Data

This script is currently set up to receive twitch messages in a specific format. The first word in a message is treated as a parameter name.  The second word (or number) is treated as the parameter value. Any messages with less than two words, as well as any words after the second, are ignored. 

Examples of valid messages:
`filter 127`
`gain 0 this is ignored`
`flanger on`

Examples of invalid messages:
`filter`
`gain 50number with no space after`

If you've followed the steps above and gotten the example patcher running, you are ready to receive these messages from Twitch. To monitor a given parameter, create a `route` Max object, and connect its input to the output of the `node.script` object.  Add the name of the parameter key you'd like to monitor to the `route` object (You'll notice that I have set up the example patcher to monitor the parameter named `parameter` already.  Feel free to copy/modify/delete it to suit your needs).  When a matching message is sent to the Twitch chat - `parameter 127`, for example - the value (`127`) will be emitted from the output of the `route parameter` object. If you are expecting a number, you will have to pipe it through a `fromsymbol` object before using it directly.

## Moving Into Your Own Project

You should be able to simply copy the contents of the example patcher into any other patcher. **However, you must also copy the `twitch.js` file from this repository into your Max project's folder (or at least anywhere on your project's search path).** After you do this, you will also have to run the `script npm install tmi.js` command from the new patcher.




