'use strict';

function DB(sequelize, models){
    this.sequelize=sequelize;
    this.models = models;
}

DB. prototype.getModel = function getModel(name){
    return this.models.hasOnwProperty(name) ? this.models[name]:null;
};

DB.prototype.getModels = function getModels(){
    return this.models;
};

module.exports=DB;