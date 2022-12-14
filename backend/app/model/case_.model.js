module.exports = (sequelize, Sequelize) => {
    var Case = sequelize.define(
        'case_',
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            income: {
                type: Sequelize.DOUBLE(),
                allowNull: false
            },
            begin_date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            end_date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            real_end_date: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
        });

    Case.associate = (models) => {
        Case.hasOne(models.state, {
            foreignKey: 'case__id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Case;
};