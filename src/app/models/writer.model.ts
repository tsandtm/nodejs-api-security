import * as Sequelize from 'sequelize';
import * as Book from './book.model';
import * as Author from './author.model';

export interface WriterAttribute{
    id?: number;
    name?: string;
    books?: Book.BookModel[];
}

export interface WriterId { WriterId: number}

export interface WriterInstance extends Sequelize.Instance<WriterAttribute>,WriterAttribute{
    getBooks: Sequelize.BelongsToManyGetAssociationsMixin<Book.BookInstance>;
    addBook: Sequelize.BelongsToManyAddAssociationMixin<Book.BookInstance,Book.BookId,Author.AuthorAttribute>;
    addBooks: Sequelize.BelongsToManyAddAssociationsMixin<Book.BookInstance,Book.BookId,Author.AuthorAttribute>;
}

export interface WriterModel extends Sequelize.Model<WriterInstance,WriterAttribute>{
}