
var zendeskClient = require ('./zendesk');
var mailClient = require ('./mail');
var async = require ('async');

function sendAllLinks (email, name, cb) {

    function sendMail (cb) {

        var template_name = "download-links";
        var template_content = [];
        var message = {
            "to": [{
                "email": email,
                "name": name,
                "type": "to"
            }],
            "headers": {
                "Reply-To": "support@khmarka.com.ua"
            },
            "important": false,
            "track_opens": null,
            "track_clicks": null,
            "auto_text": null,
            "auto_html": null,
            "inline_css": null,
            "url_strip_qs": null,
            "preserve_recipients": null,
            "view_content_link": null,
            "tracking_domain": null,
            "signing_domain": null,
            "return_path_domain": null,
            "merge": true,
            "merge_language": "mailchimp",
            "global_merge_vars": [{}],
            "merge_vars": [],
            "tags": [
                "install-links"
            ],
            "metadata": {
                "website": "www.khmarka.com.ua"
            },
            "recipient_metadata": [{
                "rcpt": email
            }]
        };
        var async = false;
        var ip_pool = "Main Pool";
        var send_at = null;

        mailClient.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function (result) {
            cb(null, result);
        }, function (err) {
            cb(err);
        });
    }

    function createTicket (cb) {
        zendeskClient.tickets.create({
            ticket: {
                subject: "Все ссылки отправлены " + email,
                comment: {
                    value: "Ссылки отправлены"
                },
                requester: {
                    name: name,
                    email: email
                },
                tags: ['website', 'links']
            }
        }, function (err, request, result) {
            cb (null, result);
        });
    }

    async.series([
        sendMail,
        createTicket
    ], cb);
}

module.exports.sendAll = sendAllLinks;