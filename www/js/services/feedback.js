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
    this.links = function (name, email) {
        email = email || '';

        var newTicket = {
            ticket: {
                subject: 'Ссылки на скачивания отправлены на ' + email,
                comment: {
                    value: 'Запрос ссылки на скачивание'
                },
                requester: {
                    email: email,
                    name: name
                },
                tags: ['install_app']
            }
        };
        $log.debug('get links', newTicket);
        return Support.$$request('tickets', 'post', newTicket);
    };
});