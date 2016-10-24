import { RepoBase } from './repositories.base';
import { Book } from '../models/book.model'
import { Pool, QueryResult } from 'pg';

export class BookRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<Book[]> {
        let queryText = 'select * from test.books';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.name])
        } else {
            pResult = this._pgPool.query(queryText)
        }


        return pResult.then(result => {
            let books: Book[] = result.rows.map(r => {
                let book = new Book();
                book.id = r.id;
                book.name = r.name;
                return book;
            });
            return books;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }

    public getOne(option): Promise<Book> {
        let queryText = 'select * from test.books where id=$1 and name=$2';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText, [option.id, option.name])
            .then(result => {
                let book = new Book();
                book.id = result.rows[0].id;
                book.name = result.rows[0].name;
                return book;
            });
    }

    public count(option): Promise<number> {
        let queryText = 'select count(*) as abc from test.books';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText)
            .then(result => {
                return result.rows[0].abc
            })
    }
}