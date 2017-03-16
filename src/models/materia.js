"use strict";
module.exports = (sequelize, DataTypes) => {
    var materia = sequelize.define("materia", {
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
          materia.belongsTo(models.Departamento, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
          materia.hasMany(models.seccion, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        
          
        }
      }
    });
    return materia;
};