import * as Sequelize from 'sequelize';

export interface CatAttribute{
    id?: number;
    name?: string;
    color?: string;
}

export interface CatId {CatId: number}

export interface CatInstance extends Sequelize.Instance<CatAttribute>,CatAttribute{}

export interface CatModel extends Sequelize.Model<CatInstance,CatAttribute>{}