'use strict';

const BearyBot = require('./BearyBot');
const fs = require('fs');
const url = fs.readFileSync('./WebHookUrl').toString();

var bot = new BearyBot.Bot(url);
var msg1Content = {
    text: `I'm running on Node.js ${process.version}.`,
    attachments: [{
        title: 'Test Pic',
        text: 'Do you see it?',
        color: '#009688'
    }]
}
var msg1 = new BearyBot.Msg(msg1Content)
msg1.Img('http://img7.doubanio.com/icon/ul15067564-30.jpg');
msg1.User('Rocket1184');
msg1.Markdown(true);
bot.Send(msg1, r => {process.exit(0)});