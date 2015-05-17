
var zendeskClient = require ('./zendesk');

function createTicket (ticket, cb) {
    var ticketTmpl = {
        ticket: {
            subject: 'Заявка от компании '+ticket.companyName,
            comment: {
                value: ticket.message
            },
            requester: {
                name: ticket.name,
                email: ticket.email
            },
            tags: ['website', 'feedback']
        }
    };

    return zendeskClient.tickets.create (ticketTmpl, cb);
}

module.exports.create = createTicket;