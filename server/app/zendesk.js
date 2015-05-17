
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
    username:  'mobile@khmarka.com.ua',
    token:     'qsNbqurOrukui1BlFmwnaUB4HRaLyUAtb1Ckagqt',
    remoteUri: 'https://khmarkasupport.zendesk.com/api/v2/'
});

function createTicket (subject, value, name, email, tags, cb) {
    tags = tags || [];
    client.tickets.create({
        ticket: {
            subject: subject,
            comment: {
                value: value
            },
            requester: {
                name: name,
                email: email
            },
            tags: tags
        }
    }, function (err, request, result) {
        cb (null, result);
    });
}

module.exports.client = client;
module.exports.createTicket = createTicket;