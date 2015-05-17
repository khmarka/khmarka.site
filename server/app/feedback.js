
var zendeskClient = require ('./zendesk');

function createTicket (ticket, cb) {

    var subject = 'Заявка от компании '+ticket.companyName,
        tags = ['website', 'feedback'];
    return zendeskClient.createTicket(
        subject,
        ticket.message,
        ticket.name,
        ticket.email,
        tags,
        cb
    );
}
module.exports.create = createTicket;