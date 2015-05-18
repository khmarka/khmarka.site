'use strict';

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