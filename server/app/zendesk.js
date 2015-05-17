
var zendesk = require('node-zendesk');

var client = zendesk.createClient({
    username:  'mobile@khmarka.com.ua',
    token:     'qsNbqurOrukui1BlFmwnaUB4HRaLyUAtb1Ckagqt',
    remoteUri: 'https://khmarkasupport.zendesk.com/api/v2/'
});

module.exports = client;