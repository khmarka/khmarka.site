'use strict';

app.directive('portfolio', function () {
    return {
        restrict: 'E',
        scope: {
            projects: '=portfolioSrc',
            onInstallClick: '&'
        },
        replace: true,
        templateUrl: 'views/templates/portfolio.html',
        controller: function ($scope) {

            console.log($scope.onInstallClick());
            //$scope.installClick = function (project) {
            //}
        }
    }
});