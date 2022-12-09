module.exports = (sequelize, Sequelize) => {
    var Company = sequelize.define(
        'company',
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
            employees_quant: {
                type: Sequelize.INTEGER(10),
                allowNull: false,
                autoIncrement: false
            }
        });

    Company.associate = (models) => {
        Company.hasMany(models.employee, {
            foreignKey: 'company_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Company;
};