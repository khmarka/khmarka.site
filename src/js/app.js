'use strict';

var app = angular.module('app', [
    // routing
    'ui.router',
    // multilanguage
    'pascalprecht.translate']);
app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('index', {
        url: '/',
        controller: 'IndexController',
        templateUrl: 'views/index.html'
    });
});
app.config(function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: 'lang/',
        suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.preferredLanguage('ua');
    //$translateProvider.determinePreferredLanguage();
});
app.constant('LANGUAGES', [
    {
        code: 'ru',
        name: 'Русский'
    },
    {
        code: 'ua',
        name: 'Українська'
    }
]);

app.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

app.run(function ($log) {
    if (typeof FastClick !== 'undefined') {
        FastClick.attach(document.body);
        $log.debug('FastClick attachment to BODY');
    }
});

app.directive('navToggle', function ($log) {
    return {
        restrict: 'C',
        link: function (scope, el, attrs) {
            $log.debug('navToggle directive link');
            var $menu = el.parent()[0].querySelector('.nav__menu');
            $menu = angular.element($menu);
            el.bind('click', function () {
                $menu.toggleClass('is-active');
            })
        }
    }
});

app.directive('projects', function () {
    return {
        restrict: 'E',
        scope: {
            projects: '=projectsSrc'
        },
        replace: true,
        templateUrl: 'views/templates/projects.html'
    }
});
app.directive('portfolio', function () {
    return {
        restrict: 'E',
        scope: {
            projects: '=portfolioSrc'
        },
        replace: true,
        templateUrl: 'views/templates/portfolio.html'
    }
});
app.directive('projectsItem', function ($scroll) {
    var ACTIVE_CLASS = 'is-active';
    return {
        restrict: 'C',
        link: function (scope, el, attrs) {

            var $cur_project;
            el.bind('click', function () {
                var projects = angular.element(el.parent()[0].querySelectorAll('.projects__item')),
                    portfolios = angular.element(document.querySelectorAll('.portfolio__item'));

                projects.removeClass(ACTIVE_CLASS);
                angular.element(this).addClass(ACTIVE_CLASS);

                portfolios.removeClass(ACTIVE_CLASS);
                $cur_project = portfolios.eq(angular.element(this).index());
                $cur_project.addClass(ACTIVE_CLASS);
                $scroll.toEl($cur_project);
            })
        }
    }
});

app.service('$platform', function () {
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ))
            return 'ios';
        else if( userAgent.match( /Android/i ))
            return 'android';
        else
            return null;
    }

    this.os = getMobileOperatingSystem();
});

//app.directive('href', function () {
//    // adding platform description for install links
//    (function () {
//        var $hrefs = $('[href-android],[href-ios]');
//
//        var platform = getMobileOperatingSystem();
//        $hrefs.each(function (item) {
//            var platform = [];
//            item = $(this);
//            if (item.attr('href-ios')) platform.push('iOS');
//            if (item.attr('href-android')) platform.push('Android');
//
//            $(this).html($(this).html() + ' ('+platform.join(', ')+')')
//        });
//        $hrefs.click(function () {
//            var item = $(this);
//            if (platform && !item.attr('href-'+platform)) {
//                //alert('Установка на данной платформе недоступна. Мы вас уведомим о выходе версии под данную платформу.');
//                // TODO: add subscribe for launch new version
//            }
//        });
//    })();
//    // platform hrefs
//    var platformHrefs = (function () {
//        var platform = getMobileOperatingSystem();
//        if (!platform) {
//            $('[href-android],[href-ios]').click(function () {
//                //alert('Для установки приложения, перейдите на сайт с мобильного устройства');
//            });
//            return;
//        }
//        var hrefAttr = 'href-'+platform;
//        var $hrefs = $('['+hrefAttr+']');
//        $hrefs.each(function () {
//            var href = $(this).attr(hrefAttr);
//            if (href) $(this).attr('href', href);
//        })
//    });
//})

app.service('$scroll', function () {
    var $scrollEl = angular.element(document.body),
        SCROLL_TIME = 600;
    function scrollToEl (el, offset) {
        if (offset == undefined) offset = 0;
        if (el) scrollTo (el.offset().top + offset);
    }
    function scrollTo (pos) {
        $scrollEl.animate({
            scrollTop: pos
        }, SCROLL_TIME);
    }
    function scrollToSel (sel, offset) {
        var el = angular.element(document.querySelector(sel));
        return scrollToEl(el, offset);
    }
    return {
        toEl: scrollToEl,
        toPos: scrollTo,
        toSel: scrollToSel
    };
});

app.directive('scrollTo', function ($log, $scroll) {

    return {
        restrict: 'A',
        link: function (scope, el) {
            el.bind('click', function () {
                var sel = angular.element(this).attr('scroll-to');
                $log.debug('scroll to ', sel);
                $scroll.toSel (sel);
            })
        }
    }
});

app.controller('IndexController', function ($scope, $rootScope, $log, $translate, LANGUAGES) {
    $log.debug('Index page controller');


    function getLang (code) {
        return (LANGUAGES || []).filter(function (item) {
            return item.code == code;
        })[0];
    }
    $rootScope.selectedLanguage = getLang($translate.use())
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
            }
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


app.controller('AppController', function ($scope, $rootScope, $log, $translate, LANGUAGES) {
    $log.debug('AppController:: init');
});

