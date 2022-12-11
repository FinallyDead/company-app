var { authJwt } = require("../middleware");
module.exports = (app) => {

    const company = require('../controller/company.controller');
    
    app.get('/api/companies/:id', [authJwt.verifyToken], company.findUserCompany);
    
    app.get('/api/getCount/:id', [authJwt.verifyToken], company.getCompanyQuant);

    app.get('/api/getComIds/:id', [authJwt.verifyToken], company.findAllIds);

    app.get('/api/getComByName/:name', [authJwt.verifyToken], company.findAllByName);

    app.post('/api/updateQuant/:id', [authJwt.verifyToken], company.update);
};