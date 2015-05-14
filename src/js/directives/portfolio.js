'use strict';

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