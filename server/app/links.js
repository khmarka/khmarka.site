
var zendeskClient = require ('./zendesk');
var mailClient = require ('./mail');
var async = require ('async');

var apps = {
    test: {
        name: 'Test app',
        description: 'Description of the app',
        links: {
            ios: 'http://google.ru',
            android: 'http://maps.google.ru'
        },
        imageUrl: 'http://images.visitcanberra.com.au/images/canberra_hero_image.jpg'
    }
};
function send (appName, email, name, cb) {
    var app = apps[appName];
    if (!app) {
        return cb (new Error("Invalid application name"));
    }
    mailClient.sendTemplate('download-app', email, name, {
        appname: app.name,
        description: app.description,
        linkios: app.links.ios,
        linkandroid: app.links.android,
        imageUrl: app.imageUrl
    }, ['links'], function (result) {
        cb(null, result);
    });
}
function sendAllLinks (email, name, cb) {

    function sendMail (cb) {
        mailClient.sendTemplate('download-links', email, name, {}, ['links'], function (result) {
            cb(null, result);
        });
    }
    function createLinksTicket (cb) {
        zendeskClient.createTicket("Все ссылки отправлены "+email, "Ссылки отправлены", name, email, ['website', 'links'], cb);
    }
    async.series([
        sendMail,
        createLinksTicket
    ], cb);
}
module.exports.send = send;
module.exports.sendAll = sendAllLinks;