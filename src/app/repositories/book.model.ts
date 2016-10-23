import * as Sequelize from 'sequelize';
import * as Writer from './writer.model';

/**
 * tượng trưng cho cột của table
 */
export interface BookAttribute {
    id?: number;
    name?: string;
}

/**
 * tượng trưng cho id
 */
export interface BookId { BookId: number }


/**
 * tượng trưng cho 1 row trong table
 */
export interface BookInstance extends Sequelize.Instance<BookAttribute>, BookAttribute {
    getAuthors: Sequelize.HasManyGetAssociationsMixin<Writer.WriterInstance>;
    setAuthors: Sequelize.HasManySetAssociationsMixin<Writer.WriterInstance,Writer.WriterId>;
    addAuthor: Sequelize.HasManyAddAssociationMixin<Writer.WriterInstance,Writer.WriterId>;
    createAuthor: Sequelize.HasManyCreateAssociationMixin<Writer.WriterAttribute>;
}


/**
 * tượng trưng 1 cái table
 */
export interface BookModel extends Sequelize.Model<BookInstance, BookAttribute> {}