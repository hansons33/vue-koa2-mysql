module.exports = {
    up: (queryInterface, Sequelize)=>{
        return queryInterface.createTable('personal',{
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                unique:true,
                type: Sequelize.STRING(20),
                allowNull: false
            },
            petName: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            introduction: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            imgUrl: {
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable('personal')
    }
}