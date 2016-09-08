'use strict';

const BearyBot = require('./BearyBot');
const fs = require('fs');
const url = fs.readFileSync('./WebHookUrl').toString();

var bot = new BearyBot.Bot(url);
var msg1Content = {
    text: `I'm running on Node.js ${process.version}.`
}
var msg1 = new BearyBot.Msg(msg1Content);
bot.Send(msg1);