var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Database connection
mongoose.connect("mongodb://localhost/callsunderthesun");
var db = mongoose.connection;

// Access models
User = require("./models/user");


// DO NOT FORGET TO REMOVE COMMENTS BEFORE COMMITTING
//var enforce = require("express-sslify");

var app = express();

// DO NOT FORGET TO REMOVE COMMENTS BEFORE COMMITTING
// Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind 
// a load balancer (e.g. Heroku). See further comments below 

//app.use(enforce.HTTPS({ trustProtoHeader: true }));

// NOT THIS
//http.createServer(app).listen(app.get('port'), function() {
//    console.log('Express server listening on port ' + app.get('port'));
//});

app.locals.centerData = require("./assets/json/centers.json");

app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
app.use('/assets', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // Redirect Bootstrap JS
app.use('/assets', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/assets', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect Bootstrap CSS
app.use(bodyParser.json()); // BodyParse middleware

// routes
app.get('/', function (req, res) {
  res.render('index', {});
});

app.get('/welcome-guide', function (req, res) {
  res.render('welcomeGuide', {});
});

app.get('/area-guide', function (req, res) {
  res.render('areaGuide', {});
});

app.get('/required-papers', function (req, res) {
  res.render('requiredPapers', {});
});

app.get('/residence-and-housing', function (req, res) {
  res.render('housing', {});
});

app.get('/work-contracts', function (req, res) {
  res.render('workContracts', {});
});

app.get('/general-info', function (req, res) {
  res.render('genInfo', {});
});

app.get('/call-centers', function (req, res) {
  res.locals.query = req.query;
  res.render('callCenters', {});
  var response = {
    language: req.query.language,
    city: req.query.city
  };
  console.log(response);
});

app.get('/filter-results', function (req, res) {
  res.render('filterResult', {});
});

app.get('/registration', function (req, res) {
  res.render('registration', {});
});

app.get('/login', function (req, res) {
  res.render('login', {});
});

app.get('/account-management', function (req, res) {
  res.render('account', {});
});

app.get('/sitemap', function (req, res) {
  res.render('sitemap', {});
});

app.get('/robots', function (req, res) {
  res.render('robots', {});
});

// Database functions
app.get("/api/users", function(req, res) {
  User.getUsers(function(err, users) {
    if(err) {
      throw err;
    }
    res.json(users);
  });
});

app.post("/api/users", function(req, res) {
  var user = req.body;
  User.addUser(user, function(err, user) {
    if(err) {
      throw err;
    }
    res.json(user);
  });
});

app.put("/api/users/:_id", function(req, res) {
  var id = req.params._id;
  var user = req.body;
  User.updateUser(id, user, {}, function(err, user) {
    if(err) {
      throw err;
    }
    res.json(user);
  });
});

app.delete("/api/users/:_id", function(req, res) {
  var id = req.params._id;
  User.deleteUser(id, function(err, user) {
    if(err) {
      throw err;
    }
    res.json(user);
  });
});

// set port
var port = process.env.PORT || 8080;

// listen to port
app.listen(port, function() {
	console.log("Application is running on port " + port + "...");
});

