'use strict';

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
