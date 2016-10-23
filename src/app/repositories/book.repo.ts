import {RepoBase} from './repositories.base';
import {BookModel,BookInstance,BookAttribute} from './book.model';
import * as Bluebird from 'bluebird';
import * as Sequelize from 'sequelize';

export class BookRepo {

    private sequelize: Sequelize.Sequelize = RepoBase.getSequelize();

    constructor(){
        
    }

    public getAllBook(): Bluebird<BookInstance> {
        return this.sequelize.query('select * from books')
    }
}