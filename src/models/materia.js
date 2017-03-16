"use strict";
module.exports = (sequelize, DataTypes) => {
    var Materia = sequelize.define("materia", {
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        codigo: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      }, {
      classMethods: {
        associate: (models) => {
          Materia.hasMany(models.seccion, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          });
        }
      }
      }, {
    freezeTableName: true // Model tableName will be the same as the model name
});
    return Materia;
};