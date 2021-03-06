"use strict";
module.exports = (sequelize, DataTypes) => {
    var Seccion = sequelize.define("seccion", {
        Numero: {
          type: DataTypes.INTEGER(),
          allowNull: false,
        },
        modalidad: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
      }, {
      classMethods: {
        associate: (models) => {
          
        }
      }
      }, {
    freezeTableName: true // Model tableName will be the same as the model name
});
    return Seccion;
};
