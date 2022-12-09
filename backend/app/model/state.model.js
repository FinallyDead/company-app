module.exports = (sequelize, Sequelize) => {
    var State = sequelize.define(
        'state',
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING(50),
                allowNull: false
            }
        });

    return State;
};