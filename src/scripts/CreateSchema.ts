import * as Sequelize from 'sequelize';
import { Promise } from 'es6-promise'
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname,'..','config','config.json'))[env];

export var connect = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.config.dialect,
    pool: config.pool
});

export let CreateSchema = () => {
    return new Promise((resolve, reject) => {
        connect.createSchema(config.schema, {
            logging: console.log
        }).then((result) => {
            console.log(result);
            resolve(result);
        });
    })

}

CreateSchema()
    .catch(err => {
        console.error(err.message)
    });