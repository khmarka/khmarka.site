'use strict';

app.service('Feedback', function ($http, $log, ENV) {

    var baseUrl = ENV.api;
    function request (url, method, data) {
        return $http({
            method: method,
            url: baseUrl + url,
            data: angular.toJson(data || {})
        });
    }

    this.create = function (name, email, companyName, message) {

        name = name || '';
        email = email || '';
        companyName = companyName || '';
        message = message || '';

        return request ('feedback', 'post', {
            name: name,
            email: email,
            companyName: companyName,
            message: message
        });
    };

    this.link = function (appName, name, email) {
        $log.debug('get link for download', appName, name, email);

        if (!appName) return $log.error("Undefined appname");
        email = email || '';
        name = name || '';

        return request ('links/'+appName, 'post', {
            name: name,
            email: email
        })
    };

    this.links = function (name, email) {
        $log.debug('get links for download', name, email);

        email = email || '';
        name = name || '';

        return request ('links', 'post', {
            name: name,
            email: email
        })
    };
});