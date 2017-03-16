"use strict";
module.exports = (sequelize, DataTypes) => {
    var Respuestas_B = sequelize.define("respuestas_B", {
        idB: {
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
    return Respuestas_B;
};
