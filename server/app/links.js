
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
        name: "Мобильное приложение для Банков. Юридические лица. Демонстрационная версия.",
        description: "Мобильное приложение предназначено для руководителей и собственников малого и среднего бизнеса.",
        links: {
            ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/63fffffff3ffffff92ffffffc52a3769ffffffe27e03ffffffaa5c5130ffffffc5ffffffc9",
            android: "https://s1.khmarka.com.ua:9443/applicationcenter/service/apk/application/storage/69"
        }
    },
    personalbank: {
        name: "Мобильное приложение для Банков. Физические лица. Демонстрационная версия.",
        description: "Наше мобильное приложение позволит Вашему клиенту выполнять банковские операции без необходимости посещать отделение банка.",
        links: {
            ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffff8f7b6d0e47ffffffcdfffffff565ffffff8f217c4469ffffffb2ffffffa0ffffffb9",
            android: "https://s1.khmarka.com.ua:9443/applicationcenter/service/apk/application/storage/28"
        }
    },
    foodretail: {
        name: "Мобильное приложение для торговых сетей. Демонстрационная версия.",
        description: "Наше приложение реализует личный кабинет покупателя-клиента торговой сети. Благодаря нашему приложению, бонусная карточка всегда находится с покупателем – в его смартфоне.",
        links: {
            ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffff86ffffffbaffffff9637fffffff5ffffffa6ffffffd1ffffffe97565ffffff88050a7effffffd37a"
        }
    },
    gazstations: {
        name: "Мобильное приложение для АЗС. Демонстрационная версия.",
        description: "Наше приложение реализует личный кабинет участника Вашей бонусной программы. Благодаря нашему приложению, бонусная карточка Вашей сети всегда находится с Вашим клиентом – в его смартфоне.",
        links: {
            //ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffffd40bffffff941cffffffe319ffffffc9fffffff2521dffffff8d13ffffff9fffffffa54353"
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