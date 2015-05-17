'use strict';

app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('index', {
        url: '/',
        controller: 'IndexController',
        templateUrl: 'views/index.html'
    });
});