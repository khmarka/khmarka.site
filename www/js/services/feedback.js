'use strict';

app.service('Feedback', function (Support, $log) {
    this.create = function (name, email, companyName, message) {

        name = name || '';
        email = email || '';
        companyName = companyName || '';
        message = message || '';

        var newTicket = {
            ticket: {
                subject: 'Заявка от компании '+companyName,
                comment: {
                    value: message
                },
                requester: {
                    name: name,
                    email: email
                },
                tags: ['website', 'feedback']
            }
        };
        $log.debug('create feedback', newTicket);

        return Support.$$request('tickets', 'post', newTicket);
    };
});