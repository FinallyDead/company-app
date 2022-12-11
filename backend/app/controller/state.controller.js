var db = require('../config/db.config.js');
var State = db.state;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    State.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    State.create({
        status: req.body.status,
        case_id: req.body.case_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    State.update({
        status: req.body.status,
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

exports.delete = (req, res) => {
    State.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Работник уволен');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};