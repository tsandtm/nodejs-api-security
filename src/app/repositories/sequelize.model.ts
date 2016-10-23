// import * as Sequelize from 'sequelize';
// import * as Book from './book.model';
// import * as Writer from './writer.model';
// import * as Cat from './cat.model';
import {RepoBase} from './repositories.base'
import path = require('path');
let env = process.env.NODE_ENV || 'development';
let config = require(path.join(__dirname, '..', '..', 'config', 'config.json'))[env];




export class Repos extends RepoBase {
    // tạo kết nối với csdl từ sequelize
    
    private bookModel: Book.BookModel;

    constructor() {
        super();
    }


    // tạo và định nghĩa table book
    public getBookModel(): Book.BookModel {
        if (this.bookModel) {
            return this.bookModel;
        } else {
            this.bookModel = this.sequelize.define<Book.BookInstance, Book.BookAttribute>('book', {
                'id': {
                    'type': Sequelize.INTEGER,
                    'primaryKey': true,
                    'autoIncrement': true
                },
                'name': {
                    'type': Sequelize.STRING
                }
            });
            return this.bookModel;
        }

    }

    // tạo và định nghĩa table writer
    public getWriterModel(): Writer.WriterModel {
        let writer: Writer.WriterModel = this.sequelize.define<Writer.WriterInstance, Writer.WriterAttribute>('writer', {
            'id': {
                'type': Sequelize.INTEGER,
                'primaryKey': true,
                'autoIncrement': true
            },
            'name': {
                'type': Sequelize.STRING
            }
        });
        return writer;
    }

    public getCatModel(): Cat.CatModel {
        // tao va dinh nghia table cat
        let cat: Cat.CatModel = this.sequelize.define<Cat.CatInstance, Cat.CatAttribute>('cat', {
            'id': {
                'type': Sequelize.INTEGER,
                'primaryKey': true,
                'autoIncrement': true
            },
            'name': {
                'type': Sequelize.STRING
            }
        });
        return cat;
    }

}












// quan hệ 1:n giữa book và writer
// cái này sẽ tạo attribute bookId trong  writer
// book.hasMany(writer, { as: 'Authors' });