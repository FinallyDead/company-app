var db = require('../config/db.config.js');
var Employee = db.employee;
var globalFunctions = require('../config/global.functions.js');

exports.findAllForCompanyInRating = (req, res) => {
    Employee.findAll({
        where: {
            company_id: req.params.id
        },
        order: [
            ["rating", 'DESC']
        ],
        attributes: ['id','name', 'position','rating'],
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findAllForCompany = (req, res) => {
    Employee.findAll({
        where: {
            company_id: req.params.id
        },
        attributes: ['id','name', 'position','rating'],
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findAllEmpIds = (req, res) => {
    db.sequelize.query(
        `SELECT employee.id, employee.name FROM employee
            INNER JOIN company ON company.id=employee.company_id
            WHERE company.user_id=? GROUP BY employee.id`, 
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
    Employee.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.getEmployeeQuant = (req, res) => {
    db.sequelize.query(
        'SELECT count(*) AS count FROM company INNER JOIN employee ON company.id=employee.company_id WHERE company.user_id = ?', 
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.id] 
        })
        .then(object => {
            console.log("count " + object);
            var c = {"count": object}
            globalFunctions.sendResult(res, c);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    Employee.create({
        name: req.body.name,
        position: req.body.position,
        rating: req.body.rating,
        company_id: req.body.company_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    Employee.update({
        position: req.body.position,
        rating: req.body.rating,
        company_id: req.body.company_id
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
    Employee.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Работник уволен');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};