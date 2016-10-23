import * as PG from 'pg';
import { Promise } from 'es6-promise';
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname,'..','config','config.json'))[env];

export let RemoveDatabase = () => {
    return new Promise((resolve, reject) => {
        var connectString = ('postgres://' + config.username + ':' + config.password + '@' + config.host + '/postgres');
        PG.connect(connectString, function (err, client, done) {
            if (err) {
                reject(err);
                return;
            }

            client.query("SELECT datname FROM pg_database where datname = " + "'" + config.database + "'", function (err1, result) {
                if (err1) {
                    reject(err1);
                    client.end();
                    return;
                }
                else {
                    if (result.rows.length != 0) {
                        client.query(' select pg_terminate_backend(pid) from pg_stat_activity where datname = ' + "'" + config.database + "'");
                        client.query('DROP DATABASE ' + config.database, function (err2, result) {
                            if (err2) {
                                reject(err2);
                                client.end();
                                return;
                            }
                            resolve('Success: Drop Database: ' + config.database);
                            client.end();
                        });
                    }
                    else {
                        resolve('Remove database: ' + config.database + ' not exist');
                        client.end();
                    }
                }
            });
            // client.release();
        });
    });
};

RemoveDatabase()
    .catch(err => {
        console.error(err.message)
    });

// RemoveDatabase((err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });