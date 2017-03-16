"use strict";
module.exports = (sequelize, DataTypes) => {
var Profesor = sequelize.define('profesor', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
          tipo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate:{
            isEmail: true,
          }
        },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
          tipo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate:{
            isEmail: true,
          }
        },
  cargo: {
      type: DataTypes.STRING,
      allowNull: false
  }
    
  }, { 
    classMethods: {
        associate: (models) => {
          //verificado
          Profesor.hasMany(models.evaluacion_A, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          });
          //verificado
          Profesor.hasMany(models.evaluacion_B, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          });
          //verificado
          Profesor.hasMany(models.seccion, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE", 
          });
        }
          },
      }, {
  freezeTableName: true // Model tableName will be the same as the model name
});
return Profesor;
};