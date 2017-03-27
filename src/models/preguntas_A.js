"use strict";
module.exports = (sequelize, DataTypes) => {
    var Pregunta_A = sequelize.define("pregunta_A", {
        profesor : {
          type: DataTypes.STRING,
          allowNull: false,
        },
        materia : {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        seccion : {
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
          type: DataTypes.STRING,
          allowNull: false,
        },
      }, {
      classMethods: {
        assocpregunta_Biate: (models) => {
        //verificado
        Pregunta_A.hasOne(models.respuestas_A, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            as: 'Enunciado'
          });
        }
      }
      }, {
    freezeTableName: true // Model tableName will be the same as the model name
});
    return Pregunta_A;
};
