'use strict';

var app = angular.module('app', [
    // routing
    'ui.router',
    // multilanguage
    'pascalprecht.translate',
    // storage
    'ngCookies',
    // modal
    'ngDialog',
    // env config
    'config'
]);


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
