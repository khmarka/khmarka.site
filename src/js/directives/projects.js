'use strict';

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