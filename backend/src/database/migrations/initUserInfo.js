


module.exports = {
    up: (queryInterface, Sequelize)=>{
        return queryInterface.createTable('userinfo', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING(20),
                // 值唯一
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(32),
                unique:false,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        },{
            charset: 'utf8mb4'
        })
    },
    down: async (queryInterface, Sequelize)=>{
        return queryInterface.dropTable('userinfo')
    }
}