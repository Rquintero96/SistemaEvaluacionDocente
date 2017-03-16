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
        Profesor.hasMany(models.EstudianteSeccion, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
        });
          
        }
          },
      }, {
  freezeTableName: true // Model tableName will be the same as the model name
});
return Profesor;
};