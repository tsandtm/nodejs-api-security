import * as Sequelize from 'sequelize';
import { BookModel, BookInstance } from './book.model';
import { WriterModel, WriterInstance, WriterId } from './writer.model';
import {CatModel} from './cat.model';

// tạo các dữ liệu sẵn
export = function (bookModel: BookModel, writerModel: WriterModel,catModel: CatModel) {

    // tao moi table book va them 3 du lieu
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

    // tao moi table writer va them 3 du lieu
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

    // table nay se dong bo voi table co san trong postgresql
    // catModel.sync().then(() => {
    //     catModel.bulkCreate([
    //         {
    //             name: 'cat orm',
    //             color: 'blue'
    //         },
    //         {
    //             name: 'cat orm 2',
    //             color: 'red'
    //         }
    //     ])
    // })    





}