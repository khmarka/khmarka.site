'use strict';

app.controller('IndexController', function ($scope, $rootScope, $log, $translate, LANGUAGES) {
    $log.debug('Index page controller');


    function getLang (code) {
        return (LANGUAGES || []).filter(function (item) {
            return item.code == code;
        })[0];
    }
    $rootScope.selectedLanguage = getLang($translate.use());
    $scope.languages = LANGUAGES;
    $rootScope.$on('$translateChangeSuccess', function (e, val) {

        if (val.language === $rootScope.selectedLanguage.code) return;
        $rootScope.selectedLanguage = getLang(val.language);
        // TODO: save to storage choise

    });
    $scope.$watch('selectedLanguage.code', function (val) {
        $log.debug('selected language change', val);
        if (val) $translate.use(val);
    }, true);

    $scope.projects = [
        {
            name: 'business-bank',
            iconUrl: './img/apps/business-bank.png',
            screenUrl: './img/apps/screens/business-bank.png',
            title: 'Мобильное приложение для Юридических лиц, клиентов СМБ',
            description: '<p>Наше приложение реализует личный кабинет покупателя-клиента торговой сети. Благодаря нашему приложению, бонусная карточка всегда находится с покупателем – в его смартфоне. <p>С помощью нашего приложения, покупатель сможет:</p><ul> <li>При покупке начислять баллы без помощи скидочной карты;</li><li>Контролировать баланс бонусного счета и просматривать историю покупок;</li><li>Формировать список покупок и обмениваться им между членами своей семьи;</li><li>Найти ближайший магазин и проложить к нему маршрут.</li></ul> <p>А с помощью бесплатных PUSH-уведомлений Ваш клиент всегда будет в курсе Ваших последних акций и предложений!</p></p>',
            links: {
                ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffffb83c10ffffffd9ffffff9bfffffffaffffff95ffffffae4cffffffb7ffffffca5b75055442",
                android: "https://s1.khmarka.com.ua:9443/applicationcenter/service/apk/application/storage/69"
            },
            isActive: true
        },
        {
            name: 'personal-bank',
            iconUrl: './img/apps/personal-bank.png',
            screenUrl: './img/apps/screens/personal-bank.png',
            title: 'Мобильное приложение для Физических лиц',
            description: '<p>Наше мобильное приложение позволяет выполнять весь спектр банковских операций без необходимости посещать отделение банка. <p>Наше приложение умеет:</p><ul> <li>Работать с текущими счетами и банковскими картами;</li><li>Оплачивать коммунальные платежи и пополнять счета на мобильные телефоны</li><li>Погашать кредиты;</li><li>Размещать депозиты;</li><li>Определять свое местоположение, искать отделения и банкоматы на карте и прокладывать к ним маршруты.</li></ul> <p>Благодаря бесплатным PUSH-уведомлениям Ваш клиент всегда в курсе последних предложений Банка!</p><p>Наше приложение работает на всех типах смартфонов и планшетах.</p></p>',
            links: {
                ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/1affffffae66ffffff91fffffff5ffffffb90278ffffffa3ffffffd0ffffff8affffff8bffffff844f19ffffffa4",
                android: "https://s1.khmarka.com.ua:9443/applicationcenter/service/apk/application/storage/28"
            }
        },
        {
            name: 'food-retail',
            iconUrl: './img/apps/food-retail.png',
            screenUrl: "./img/apps/screens/food-retail.png",
            title: "Мобильное приложение для торговых сетей",
            description: "<p>Наше приложение реализует личный кабинет покупателя-клиента торговой сети. Благодаря нашему приложению, бонусная карточка всегда находится с покупателем – в его смартфоне. <p>С помощью нашего приложения, покупатель сможет:</p><ul> <li>При покупке начислять баллы без помощи скидочной карты;</li><li>Контролировать баланс бонусного счета и просматривать историю покупок;</li><li>Формировать список покупок и обмениваться им между членами своей семьи;</li><li>Найти ближайший магазин и проложить к нему маршрут.</li></ul> <p>А с помощью бесплатных PUSH-уведомлений Ваш клиент всегда будет в курсе Ваших последних акций и предложений!</p><p>Наше приложение работает на всех типах смартфонов и планшетах.</p></p>",
            links: {
                "ios": "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/34ffffffdc48fffffff014ffffffda2effffffccffffffb51d4a1fffffffddffffffd8ffffffd7ffffffa2"
            }
        },
        {
            name: 'gaz-stations',
            iconUrl: 'http://placehold.it/100x100',
            title: "Мобильное приложение для сетей АЗС",
            description: "<p>Наше приложение реализует личный кабинет участника Вашей бонусной программы. Благодаря нашему приложению, бонусная карточка Вашей сети всегда находится с водителем – в его смартфоне. <p>Наше приложение позволит Вашим клиентам:</p><ul> <li>При расчете за заправку начислять баллы без помощи скидочной карты;</li><li>Контролировать баланс бонусного счета и просматривать историю заправок и покупок;</li><li>Быть всегда в курсе стоимости бензин и дизильного топлива</li><li>Найти ближайшую АЗС и проложить к ней маршрут.</li></ul> <p>А с помощью бесплатных PUSH-уведомлений Ваш клиент всегда будет в курсе Ваших последних акций и предложений!</p><p>Наше приложение работает на всех типах смартфонов и планшетах.</p></p>",
            links: {
                "ios": "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffffd40bffffff941cffffffe319ffffffc9fffffff2521dffffff8d13ffffff9fffffffa54353"
            }
        }
    ];


});