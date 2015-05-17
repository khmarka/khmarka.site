
var express = require('express');
var app = express ();
var bodyParser = require ('body-parser');
var validator = require('validator');

var ApiError = require('./app/apiError');
var feedback = require ('./app/feedback');
var links = require ('./app/links');
var async = require ('async');

// post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
// routes
var router = express.Router();

// website static files. SPA
app.use(express.static(__dirname + '/../www'));

// Если произошла ошибка валидации, то отдаем 400 Bad Request
app.use(function (err, req, res, next) {
    if (err.name == "ValidationError") res.status(400).send(err);
    else next(err);
});

// Если же произошла иная ошибка то отдаем 500 Internal Server Error
app.use(function (err, req, res, next) {
    res.status(500).send(err);
});

// CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.post('/links', function (req, res) {
    var email = req.body.email,
        name = req.body.name;

    console.log('links for', email, name);
    if (!validator.isEmail(email) || !name) return res.status(422).json((new ApiError("Invalid email or name")).toJson());

    links.sendAll(email, name, function (err, results) {
        if (err) return res.status(500).send(results);
        return res.json({ text: "Links was sent successfully" });
    });
});
router.post('/links/:appName', function (req, res) {
    console.log('send link for app (', req.params.appName, ') to', req.body.email, req.body.name);
    links.send(req.params.appName, req.body.email, req.body.name, function (err, results) {
        if (err) return res.status(400).json({
            error: err.message
        });
        return res.json({ text: "Links was sent successfully" });
    });
});

router.post('/feedback', function (req, res) {
    return feedback.create({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        companyName: req.body.companyName
    }, function (err,request, result) {
        if (err) return res.status(422).send(err);
        res.status(200).json(result);
    })
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);