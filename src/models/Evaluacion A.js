"use strict";
module.exports = (sequelize, DataTypes) => {
    var estudiante = sequelize.define("estudiante", {
        auto: {
          type: DataTypes.BOOLEAN(),
          allowNull: false,
        },
        cargo_profesor : {
          type: DataTypes.STRING,
          allowNull: false,
        },
        promedio: {
          type: DataTypes.FLOAT(),
          allowNull: false,
        },
        liberar: {
          type: DataTypes.BOOLEAN(),
          allowNull: false,
        },
          fecha: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate:{
            isEmail: true,
          }
        },
        contrasena: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      }, {
      classMethods: {
        associate: (models) => {
        estudiante.hasMany(models.seccion, {
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
    return estudiante;
};
