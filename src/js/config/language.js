'use strict';

app.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'lang/',
        suffix: '.json'
    });
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.useCookieStorage();
    $translateProvider.preferredLanguage('ua');
});
app.constant('LANGUAGES', [
    {
        code: 'ru',
        name: 'Русский'
    },
    {
        code: 'ua',
        name: 'Українська'
    }
]);

