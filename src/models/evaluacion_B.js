"use strict";
module.exports = (sequelize, DataTypes) => {
    var Evaluacion_B = sequelize.define("evaluacion_B", {
        profesor: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        materia : {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        seccion : {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        promedio : {
          type: DataTypes.FLOAT(),
          allowNull: false,
        },
        liberar : {
          type: DataTypes.BOOLEAN(),
          allowNull: false,
        },
        fecha : {
          type: DataTypes.STRING(),
          allowNull: false,
        }
      }, {
      classMethods: {
        associate: (models) => {
        Evaluacion_B.hasOne(models.respuestas_B, {
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
    return Evaluacion_B;
};
