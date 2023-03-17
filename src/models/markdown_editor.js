'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown_Editor extends Model {
        static associate({ User }) {
            Markdown_Editor.belongsTo(User, { foreignKey: 'doctorId' })
        }
    }
    Markdown_Editor.init({
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT,
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Markdown_Editor',
    });
    return Markdown_Editor;
};