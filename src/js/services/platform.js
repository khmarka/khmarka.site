'use strict';

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