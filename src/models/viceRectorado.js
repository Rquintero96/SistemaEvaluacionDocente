"use strict";
module.exports = (sequelize, DataTypes) => {
    var Vicerrectorado = sequelize.define("viceRectorado", {
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        CI: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        correo: {
          type: DataTypes.STRING,
          allowNull: false,
          validate:{
            isEmail: true,
          }
        },
          tipo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate:{
            isEmail: true,
          }
        },
        contrasena: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      }, {
      classMethods: {
        associate: (models) => {
        
        
        
          
        }
      }
    });
    return Vicerrectorado;
};
