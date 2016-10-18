import * as Sequelize from 'sequelize';
import * as Book from './book.model';
import * as Writer from './writer.model';
import * as Cat from './cat.model';
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname,'..','..','config','config.json'))[env];
// tạo kết nối với csdl từ sequelize
export let sequelize = new Sequelize(config.database, config.username, config.password,config.config);

// tạo và định nghĩa table book
export let book = sequelize.define<Book.BookInstance, Book.BookAttribute>('book', {
    'id': {
        'type': Sequelize.INTEGER,
        'primaryKey': true,
        'autoIncrement': true
    },
    'name': {
        'type': Sequelize.STRING
    }
});

// tạo và định nghĩa table writer
export let writer: Writer.WriterModel = sequelize.define<Writer.WriterInstance, Writer.WriterAttribute>('writer', {
    'id': {
        'type': Sequelize.INTEGER,
        'primaryKey': true,
        'autoIncrement': true
    },
    'name': {
        'type': Sequelize.STRING
    }
});

// tao va dinh nghia table cat
export let cat: Cat.CatModel = sequelize.define<Cat.CatInstance,Cat.CatAttribute>('cat',{
    'id':{
        'type': Sequelize.INTEGER,
        'primaryKey': true,
        'autoIncrement': true
    },
    'name':{
        'type': Sequelize.STRING
    }
}); 

// quan hệ 1:n giữa book và writer
// cái này sẽ tạo attribute bookId trong  writer
book.hasMany(writer,{as: 'Authors'});