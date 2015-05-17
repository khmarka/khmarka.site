'use strict';

app.run(function ($log) {
    if (typeof FastClick !== 'undefined') {
        FastClick.attach(document.body);
        $log.debug('FastClick attachment to BODY');
    }
});


