var db = require('../config/db.config.js');
var State = db.state;
var globalFunctions = require('../config/global.functions.js');

exports.findAllCasesStatesForCompany = (req, res) => {
    db.sequelize.query(
        `SELECT state.id, state.status, case_.description, state.case__id FROM company
            INNER JOIN employee ON company.id=employee.company_id
            INNER JOIN case_ ON employee.id=case_.employee_id
            INNER JOIN state ON state.case__id=case_.id
            WHERE company.user_id=? GROUP BY case_.id`, 
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.id] 
        })
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