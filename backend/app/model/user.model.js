module.exports = (sequelize, Sequelize) => {
    var User = sequelize.define(
        'user', 
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
            username: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(150),
                allowNull: false
            }
        });

    User.associate = (models) => {
        User.hasMany(models.company, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return User;
};