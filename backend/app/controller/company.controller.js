var db = require('../config/db.config.js');
var Company = db.company;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Company.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.update = (req, res) => {
    Company.update({
        employees_quant: req.body.employees_quant
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findUserCompany = (req, res) => {    
    Company.findAll({
        attributes: ['id','name', 'employees_quant'],
        where: {
            user_id: req.params.id
        }
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.getCompanyQuant = (req, res) => {
    Company.count({
        where: {
            user_id: req.params.id
        }
        })
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findAllIds = (req, res) => {
    Company.findAll({
        attributes: ["id","name"],
        where: {
            user_id: req.params.id
        }
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findAllByName = (req, res) => {
    Company.findAll({
        attributes: ["id"],
        where: {
            name: req.params.name
        }
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};