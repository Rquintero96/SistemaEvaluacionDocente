"use strict";
module.exports = (sequelize, DataTypes) => {
    var departamento = sequelize.define("departamento", {
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      }, {
      classMethods: {
        associate: (models) => {
        departamento.belongsTo(models.jefeDepartamento, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            as: 'jefe',
            foreignKey: {
              allowNull: false
            }
          });
        departamento.hasMany(models.materia, {
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
    return departamento;
};
