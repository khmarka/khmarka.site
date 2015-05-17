'use strict';

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
