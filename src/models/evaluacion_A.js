"use strict";
module.exports = (sequelize, DataTypes) => {
    var Evaluacion_A = sequelize.define("evaluacion_A", {
        auto: {
          type: DataTypes.BOOLEAN(),
          allowNull: false,
        },
        nombre_del_evaluado : {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        nombre_del_evaluador : {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        periodo : {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        departamento : {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        cargo_profesor : {
          type: DataTypes.STRING(),
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
          type: DataTypes.STRING(),
          allowNull: false,
        }
      }, {
      classMethods: {
        associate: (models) => {
        //verificado
        Evaluacion_A.hasMany(models.respuestas_A, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          });
        }
      }
      }, {
    freezeTableName: true // Model tableName will be the same as the model name
});
    return Evaluacion_A;
};
