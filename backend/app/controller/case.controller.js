var db = require('../config/db.config.js');
var Case = db.case;
var globalFunctions = require('../config/global.functions.js');

exports.findAllCasesForCompany = (req, res) => {
    db.sequelize.query(
        `SELECT case.id, case.description, case.income, case.begin_date, case.end_date, case.real_end_date FROM case ON case.employee_id=employee.id, employee.id=company.id
        WHERE company.id=? GROUP BY case.id`, // нужно создать запрос для выбора всех кейсов для компании пользователя
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