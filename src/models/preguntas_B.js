"use strict";
module.exports = (sequelize, DataTypes) => {
    var Pregunta_B = sequelize.define("pregunta_B", {
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
        Pregunta_B.hasOne(models.respuestas_B, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: 'idEnunciado'
            
          });
        }
      }
      }, {
    freezeTableName: true // Model tableName will be the same as the model name
});
    return Pregunta_B;
};
