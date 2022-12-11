var { authJwt } = require("../middleware");
module.exports = (app) => {

    const user = require('../controller/user.controller');
    
    app.get('/api/users', [authJwt.verifyToken], user.findAll);
};