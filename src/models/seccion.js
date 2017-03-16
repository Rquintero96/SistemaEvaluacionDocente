"use strict";
module.exports = (sequelize, DataTypes) => {
    var Seccion = sequelize.define("Seccion", {
        Numero: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        modalidad: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }, {
      classMethods: {
        associate: (models) => {
        Seccion.belongsTo(models.estudiante, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        Seccion.hasMany(models.profesor, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: true
            }
          });
          Seccion.belongsTo(models.materia, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        
          
        }
      }
    });
    return Seccion;
};
