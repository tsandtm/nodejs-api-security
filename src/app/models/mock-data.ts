import * as Sequelize from 'sequelize';
import { BookModel, BookInstance } from './book.model';
import { WriterModel, WriterInstance, WriterId } from './writer.model';


// tạo các dữ liệu sẵn
export = function (bookModel: BookModel, writerModel: WriterModel) {

    bookModel.sync({force:true}).then(()=>{
        bookModel.bulkCreate([
            {
                name: 'book1'
            },
            {
                name: 'book2'
            },
            {
                name: 'book3'
            }
        ])
    });

    writerModel.sync({force:true}).then(()=>{
        writerModel.bulkCreate([
            {
                name: 'hong duc'
            },
            {
                name: 'Jimmy'
            },
            {
                name: 'Jane the savior'
            }
        ])
    })







}