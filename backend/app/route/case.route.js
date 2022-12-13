var { authJwt } = require("../middleware");
module.exports = (app) => {

    const case_ = require('../controller/case.controller');

    app.get('/api/cases', [authJwt.verifyToken], case_.findAll);
    
    app.get('/api/cases/:id', [authJwt.verifyToken], case_.findAllCasesForCompany);

    app.get('/api/case/:id', [authJwt.verifyToken], case_.findById);

    app.post('/api/addCase', [authJwt.verifyToken], case_.create);

    app.post('/api/updateCase/:id', [authJwt.verifyToken], case_.update);

    app.post('/api/deleteCase/:id', [authJwt.verifyToken], case_.delete);
};