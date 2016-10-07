import * as express from 'express';
import * as body_parser from 'body-parser';
import { router as bookRouter } from './routes/book.router';
import { Promise } from 'es6-promise';
import { Pool, PoolConfig, QueryResult } from 'pg';


let config: PoolConfig = {
    user: 'duc', //env var: PGUSER
    database: 'TestDB', //evn var: PGDATABASE
    password: '', // evn var: PGPASSWORD
    host: 'localhost', // server hosting postgres database
    port: 5432, //evn var: PGPORT
    max: 10, // max number of client pool
    idleTimeoutMillis: 30000 // how long a client remain idle before close
};
let pool = new Pool(config);
let app = express();
let port = 8080;
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.use((req, res, next) => {
    console.log('happen 1');
    next();
});

app.use('/api', (req, res, next) => {
    bookRouter(req, res, next);
    next();
});

app.use((req, res, next) => {
    console.log('happen 2');
    next();
});

/**
 * hàm này dùng để thử cách sử dụng Promise
 */
function getAllBokk(): Promise<any[]>{
    return new Promise<any[]>((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) {
                // console.error('error fetching client from pool', err);
                return reject(err);
            }
            client.query('select * from book', (err, result) => {
                //call done() to release the client back to the pool
                done();

                if (err) {
                    // console.error('error running query', err);
                   return reject(err);
                }
                // console.log(result.rows);
                resolve(result.rows);
            });
        });
    });
}

app.use('/test', (req, res) => {
    getAllBokk().then((value) => {
        res.json(value);
    })
    .catch(err => {
        console.error('Failed', err);
        res.send(err);
    });
});

app.listen(port);
console.log('server run on port: ' + port);

let ap = Promise.resolve();