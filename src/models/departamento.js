"use strict";
module.exports = (sequelize, DataTypes) => {
    var Departamento = sequelize.define("departamento", {
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      }, {
      classMethods: {
        associate: (models) => {
        //verificado
        Departamento.hasMany(models.materia, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          });
        
          
        }
      }
      }, {
    freezeTableName: true // Model tableName will be the same as the model name
});
    return Departamento;
};
