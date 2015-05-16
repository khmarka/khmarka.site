'use strict';

app.controller('IndexController', function ($scope, $rootScope, $log, $translate, $filter,LANGUAGES, Feedback, $timeout) {
    $log.debug('Index page controller');


    function getLang (code) {
        return (LANGUAGES || []).filter(function (item) {
            return item.code == code;
        })[0];
    }
    $rootScope.selectedLanguage = getLang($translate.use());
    $scope.languages = LANGUAGES;
    $rootScope.$on('$translateChangeSuccess', function (e, val) {

        updateTranslate();
        if (val.language === $rootScope.selectedLanguage.code) return;
        $rootScope.selectedLanguage = getLang(val.language);
        // TODO: save to storage choice
    });

    $scope.feedback = {
        name: '',
        email: '',
        companyName: '',
        message: ''
    };
    $scope.feedbackButton = 'send';
    $scope.submitFeedback = function (form) {
        if (form.$invalid) {
            $log.warn('invalid feedback form');
            return;
        }
        $scope.feedbackButton = 'send-process';
        return Feedback.create($scope.feedback.name, $scope.feedback.email, $scope.feedback.companyName, $scope.feedback.message).then(function () {
            $scope.feedbackButton = 'send-success';
        }, function () {
            $scope.feedbackButton = 'send-error';
        }).finally(function () {
            $timeout(function () {
                $scope.feedbackButton = 'send';
            }, 3000);
        });
    };
    $scope.$watch('selectedLanguage.code', function (val) {
        $log.debug('selected language change', val);
        if (val) $translate.use(val);
    }, true);

    function updateTranslate () {
        return $translate([
            'project-business-bank-title',
            'project-business-bank-description',
            'project-personal-bank-title',
            'project-personal-bank-description',
            'project-food-retail-title',
            'project-food-retail-description',
            'project-gaz-stations-title',
            'project-gaz-stations-description'
        ]).then(function (translations) {
            // business bank
            $scope.projects[0].title = translations['project-business-bank-title'];
            $scope.projects[0].description = translations['project-business-bank-description'];
            // personal bank
            $scope.projects[1].title = translations['project-personal-bank-title'];
            $scope.projects[1].description = translations['project-personal-bank-description'];
            // food retail
            $scope.projects[2].title = translations['project-food-retail-title'];
            $scope.projects[2].description = translations['project-food-retail-description'];
            // gaz-stations
            $scope.projects[3].title = translations['project-gaz-stations-title'];
            $scope.projects[3].description = translations['project-gaz-stations-description'];
            return translations;
        })
    }
    $scope.projects = [
        {
            name: 'business-bank',
            iconUrl: './img/apps/business-bank.png',
            screenUrl: './img/apps/screens/business-bank.png',
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
            links: {
                ios: "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/1affffffae66ffffff91fffffff5ffffffb90278ffffffa3ffffffd0ffffff8affffff8bffffff844f19ffffffa4",
                android: "https://s1.khmarka.com.ua:9443/applicationcenter/service/apk/application/storage/28"
            }
        },
        {
            name: 'food-retail',
            iconUrl: './img/apps/food-retail.png',
            screenUrl: "./img/apps/screens/food-retail.png",
            links: {
                "ios": "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/34ffffffdc48fffffff014ffffffda2effffffccffffffb51d4a1fffffffddffffffd8ffffffd7ffffffa2"
            }
        },
        {
            name: 'gaz-stations',
            iconUrl: 'http://placehold.it/100x100',
            links: {
                "ios": "itms-services://?action=download-manifest&url=https://s1.khmarka.com.ua:9443/applicationcenter/service/link/plist/ffffffd40bffffff941cffffffe319ffffffc9fffffff2521dffffff8d13ffffff9fffffffa54353"
            }
        }
    ];

    updateTranslate();

});