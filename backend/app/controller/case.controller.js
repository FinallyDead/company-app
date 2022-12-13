var db = require('../config/db.config.js');
var Case = db.case;
var globalFunctions = require('../config/global.functions.js');

exports.findAllCasesForCompany = (req, res) => {
    db.sequelize.query(
        `SELECT case_.id, case_.description, case_.income, case_.begin_date, case_.end_date, case_.real_end_date, case_.employee_id FROM company
            INNER JOIN employee ON company.id=employee.company_id
            INNER JOIN case_ ON employee.id=case_.employee_id
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

exports.findById = (req, res) => {
    Case.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findAll = (req, res) => {
    Case.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


exports.create = (req, res) => {
    Case.create({
        description: req.body.description,
        income: req.body.income,
        begin_date: req.body.begin_date,
        end_date: req.body.end_date,
        real_end_date: req.body.real_end_date,
        employee_id: req.body.employee_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    Case.update({
        description: req.body.description,
        income: req.body.income,
        begin_date: req.body.begin_date,
        end_date: req.body.end_date,
        real_end_date: req.body.real_end_date,
        employee_id: req.body.employee_id
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
    Case.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Работник уволен');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};