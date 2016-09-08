'use strict';

const http = require('https');
const url = require('url');

class Msg {
    constructor(msgObj) {
        this.text = msgObj.text || '';
        this.markdown = msgObj.markdown || '';
        this.channel = msgObj.channel || '';
        this.user = msgObj.user || '';
        if (msgObj.attachments) {
            this.attachments = msgObj.attachments || '';
        }
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
        if (this.attachments.images) {
            this.attachments.images.push(imgUrl);
        } else if (this.attachments) {
            this.attachments.images = new Array();
            this.attachments.images.push(imgUrl);
        } else {
            this.attachments = new Array();
            this.attachments.images = new Array();
            this.attachments.images.push(imgUrl);
        }
    }
}

class Bot {
    constructor(WebHookUrl) {
        let hookPath = url.parse(WebHookUrl);
        this.reqOpt = {
            protocol: hookPath.protocol,
            method: 'POST',
            hostname: hookPath.hostname,
            path:hookPath.path,
            headers: {
                'content-type': 'application/json'
            }
        }
    }

    Send(someMsg) {
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