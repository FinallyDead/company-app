var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



var db = require('./app/config/db.config.js'); 

db.sequelize.sync({force: true});

app.listen(3000);

var cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200', 
    credentials: true, 
    optionSuccessStatus: 200 
};
app.use(cors(corsOptions));

var auth = require('./app/route/auth.route.js');
auth(app);

var user = require('./app/route/user.route.js');
user(app);

var state = require('./app/route/state.route.js');
state(app);

var employee = require('./app/route/employee.route.js');
employee(app);

var company = require('./app/route/company.route.js');
company(app);

var case_ = require('./app/route/case.route.js');
case_(app);