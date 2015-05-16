'use strict';

app.config(function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',

        showClose: true,
        closeByDocument: true,
        closeByEscape: true
    });
});