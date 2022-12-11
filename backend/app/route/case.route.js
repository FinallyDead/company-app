var { authJwt } = require("../middleware");
module.exports = (app) => {

    const case_ = require('../controller/case.controller');

    app.get('/api/cases', [authJwt.verifyToken], case_.findAll);
    
    app.get('/api/cases/userId=:user_id', [authJwt.verifyToken], case_.findAllCasesForCompany);

    app.post('/api/addCase', [authJwt.verifyToken], case_.create);

    app.post('/api/updateCase/:id', [authJwt.verifyToken], case_.update);

    app.post('/api/deleteCase/:id', [authJwt.verifyToken], case_.delete);
};