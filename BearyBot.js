'use strict';

const http = require('https');
const url = require('url');

class Msg {
    constructor(msgObj) {
        if (!msgObj) return this;
        this.text = msgObj.text || '';
        this.markdown = msgObj.markdown || '';
        this.channel = msgObj.channel || '';
        this.user = msgObj.user || '';
        this.attachments = msgObj.attachments || new Array();
    }

    Text(arg) {
        if (arg) return this.text = arg;
        else return this.text;
    }

    Markdown(arg) {
        if (arg) return this.markdown = arg;
        else return this.markdown;
    }

    AddImg(imgUrl) {
        this.attachments[0].images = [{
            url: imgUrl
        }]
    }
}

class Bot {
    constructor(WebHookUrl) {
        let hookPath = url.parse(WebHookUrl);
        this.reqOpt = {
            protocol: hookPath.protocol,
            method: 'POST',
            hostname: hookPath.hostname,
            path: hookPath.path,
            headers: {
                'content-type': 'application/json'
            }
        }
    }

    Send(someMsg) {
        console.log(JSON.stringify(someMsg));
        var req = http.request(this.reqOpt);
        req.on('aborted', () => {
            console.log(`Message aborted by server :(`);
        });
        req.end(JSON.stringify(someMsg), 'utf8', () => {
            console.log(`Message Sent.`);
        });
    }
}

module.exports = {
    Bot: Bot,
    Msg: Msg
}