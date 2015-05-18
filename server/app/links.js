
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
    },
    businessbank: {
        name: "Business Bank",
        description: "Мобильное приложение предназначено для руководителей и собственников малого и среднего бизнеса.",
        links: {
            ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffffb83c10ffffffd9ffffff9bfffffffaffffff95ffffffae4cffffffb7ffffffca5b75055442"
        }
    },
    personalbank: {
        name: "Personal Bank",
        description: "Наше мобильное приложение позволит Вашему клиенту выполнять банковские операции без необходимости посещать отделение банка.",
        links: {
            ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/1affffffae66ffffff91fffffff5ffffffb90278ffffffa3ffffffd0ffffff8affffff8bffffff844f19ffffffa4"
        }
    },
    foodretail: {
        name: "Food Retail",
        description: "Наше приложение реализует личный кабинет покупателя-клиента торговой сети. Благодаря нашему приложению, бонусная карточка всегда находится с покупателем – в его смартфоне.",
        links: {
            ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/34ffffffdc48fffffff014ffffffda2effffffccffffffb51d4a1fffffffddffffffd8ffffffd7ffffffa2"
        }
    },
    gazstations: {
        name: "Gaz stations",
        description: "Наше приложение реализует личный кабинет участника Вашей бонусной программы. Благодаря нашему приложению, бонусная карточка Вашей сети всегда находится с Вашим клиентом – в его смартфоне.",
        links: {
            ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffffd40bffffff941cffffffe319ffffffc9fffffff2521dffffff8d13ffffff9fffffffa54353"
        }
    }
};

function send (appName, email, name, cb) {
    console.log('send', appName, email, name);
    var app = apps[appName];
    if (!app) {
        return cb (new Error("Invalid application name " + appName));
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