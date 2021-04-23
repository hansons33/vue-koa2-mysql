

module.exports = {
    up: (queryInterface,Sequelize)=>{
        return queryInterface.createTable('userarticles', {
            id:{
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            articles: {
                type: Sequelize.TEXT
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        }, {
            charset: 'utf8mb4'
        })
    },
    down: async (queryInterface, Sequelize)=>{
        return queryInterface.dropTable('userarticles')
    }
}