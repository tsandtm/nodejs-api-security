import app from './app/app';
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname,'config','server.config.json'))[env];

app.listen(config.port);
console.log('server start on port ' + config.port)