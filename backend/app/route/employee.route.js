var { authJwt } = require("../middleware");
module.exports = (app) => {

    const employee = require('../controller/employee.controller');
    
    app.get('/api/employeesRat/:id', [authJwt.verifyToken], employee.findAllForCompanyInRating);
    
    app.get('/api/employees/:id', [authJwt.verifyToken], employee.findAllForCompany);

    app.get('/api/employee/:id', [authJwt.verifyToken], employee.findById);

    app.post('/api/addEmployee', [authJwt.verifyToken], employee.create);

    app.post('/api/updateEmployee/:id', [authJwt.verifyToken], employee.update);

    app.post('/api/deleteEmployee/:id', [authJwt.verifyToken], employee.delete);
};