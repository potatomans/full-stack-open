const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class List extends Model {}

List.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key:'id' }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    underscored: true, // this is crucial to convert blogId in the model to blog_id in the table
    timestamps: false,
    modelName: 'list'
})

module.exports = List