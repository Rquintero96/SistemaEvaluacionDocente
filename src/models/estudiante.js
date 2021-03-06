"use strict";
module.exports = (sequelize, DataTypes) => {
    var Estudiante = sequelize.define("estudiante", {
        nombre: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        CI: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        correo: {
          type: DataTypes.STRING(),
          allowNull: false,
          validate:{
            isEmail: true,
          }
        },
          tipo: {
          type: DataTypes.INTEGER(),
          allowNull: false,
          validate:{
            isEmail: true,
          }
        },
        contrasena: {
          type: DataTypes.STRING(),
          allowNull: false,
        }
      }, {
      classMethods: {
        associate: (models) => {
          //verificado
          Estudiante.hasMany(models.evaluacion_B, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        Estudiante.belongsToMany(models.seccion, { through: 'estudianteSeccion', foreignKey: 'idEstudiante', otherKey: 'idSeccion'
        });
        
        }
      }
      }, {
    freezeTableName: true // Model tableName will be the same as the model name
});
    return Estudiante;
};
