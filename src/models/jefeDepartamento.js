"use strict";
module.exports = (sequelize, DataTypes) => {
var Jefe = sequelize.define('jefeDepartamento', {
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
  }, { 
    classMethods: {
        associate: (models) => {
        Jefe.hasMany(models.departamento, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
        });
        }
          },
      },
       { 
    classMethods: {
        associate: (models) => {
        Jefe.hasMany(models.materia, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
              allowNull: false
            }
        });
        }
          },
      },{
  freezeTableName: true // Model tableName will be the same as the model name
});
return Jefe;
};