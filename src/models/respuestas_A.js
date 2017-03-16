"use strict";
module.exports = (sequelize, DataTypes) => {
    var Respuestas_A = sequelize.define("respuestas_A", {
        idA: {
          type: DataTypes.INTEGER(),
          allowNull: false,
        },
        idP: {
          type: DataTypes.INTEGER(),
          allowNull: false,
        },
        promedio: {
          type: DataTypes.DOUBLE(),
          allowNull: false,
        },
      }, {
    freezeTableName: true // Model tableName will be the same as the model name
});
    return Respuestas_A;
};
