module.exports = (sequelize, Sequelize) => {
    var Employee = sequelize.define(
        'employee',
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            position: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            rating: {
                type: Sequelize.DOUBLE(),
                allowNull: false
            }
        });

    Employee.associate = (models) => {
        Employee.hasMany(models.case, {
            foreignKey: 'employee_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Employee;
};