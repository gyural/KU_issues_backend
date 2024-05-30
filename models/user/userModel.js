const { DataTypes, Sequelize } = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            nickname:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            grade:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            jwt:{
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: ''
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })
    }
}

module.exports = User