
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('FPsSJwpF5OF4Ns0CWkS5ng');

var mailConfig = {
    replyTo: "support@khmarka.com.ua",
    website: "www.khmarka.com.ua"
};

function sendWithTemplate (templateName, email, name, vars, tags, cb) {

    templateName = templateName || '';
    email = email || '';
    name = name || '';
    vars = vars || {};
    tags = tags || [];

    var varsArr = [];
    for (var prop in vars) {
        if (!vars.hasOwnProperty(prop)) continue;
        varsArr.push({
            name: prop,
            content: vars[prop]
        });
    }

    var template_content = [];
    var message = {
        "to": [{
            "email": email,
            "name": name,
            "type": "to"
        }],
        "headers": {
            "Reply-To": mailConfig.replyTo
        },
        "tags": tags,
        "metadata": {
            "website": mailConfig.website
        },
        "global_merge_vars": varsArr,
        "recipient_metadata": [{
            "rcpt": email
        }]
    };

    var async = false;
    var ip_pool = "Main Pool";
    var send_at = null;

    mandrill_client.messages.sendTemplate({
        "template_name": templateName,
        "template_content": template_content,
        "message": message,
        "async": async,
        "ip_pool": ip_pool,
        "send_at": send_at
    }, function (result) {
        cb(null, result);
    }, function (err) {
        cb(err);
    });
}

module.exports = {};
module.exports.sendTemplate = sendWithTemplate;
module.exports.client = mandrill_client;