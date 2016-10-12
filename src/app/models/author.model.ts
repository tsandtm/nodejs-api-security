import * as Sequelize from 'sequelize';
import * as Book from './book.model';
import * as Wrtier from './writer.model';


export interface AuthorAttribute{
    bookId?: number;
    authorId?: number;
}