
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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Khmarka! Welcome to our api!' });
});

// Если произошла ошибка валидации, то отдаем 400 Bad Request
app.use(function (err, req, res, next) {
    if (err.name == "ValidationError") res.status(400).send(err);
    else next(err);
});

// Если же произошла иная ошибка то отдаем 500 Internal Server Error
app.use(function (err, req, res, next) {
    res.status(500).send(err);
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

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);