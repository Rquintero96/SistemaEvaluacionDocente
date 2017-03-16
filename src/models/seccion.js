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
        Seccion.belongsToMany(models.estudiante, {
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
          Seccion.hasMany(models.materia, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
          
        }
      }
      }, {
    freezeTableName: true // Model tableName will be the same as the model name
});
    return Seccion;
};
