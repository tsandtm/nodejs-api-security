import * as Sequelize from 'sequelize';
import * as Book from './book.model';
import * as Writer from './writer.model';


export let sequelize = new Sequelize('TestDB', 'duc', '123456', {
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

export let book: Book.BookModel = sequelize.define<Book.BookInstance, Book.BookAttribute>('book', {
    'id': {
        'type': Sequelize.INTEGER,
        'primaryKey': true,
        'autoIncrement': true
    },
    'name': {
        'type': Sequelize.STRING
    }
});


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


book.belongsToMany(writer, { through: 'author', foreignKey: 'writerId' });
writer.belongsToMany(book, { through: 'author', foreignKey: 'bookId' });