var { authJwt } = require("../middleware");
module.exports = (app) => {

    const state = require('../controller/state.controller');
    
    app.get('/api/states/:id', [authJwt.verifyToken], state.findAllCasesStatesForCompany);

    app.post('/api/addState', [authJwt.verifyToken], state.create);

    app.post('/api/updateState/:id', [authJwt.verifyToken], state.update);

    app.post('/api/deleteState/:id', [authJwt.verifyToken], state.delete);
};