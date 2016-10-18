import * as express from 'express';
import * as body_parser from 'body-parser';
// import { router as bookRouter } from './routes/book.router';
import bookRouter = require('./routes/book.router');
import humanRouter = require('./routes/writer.router');
import { Pool, PoolConfig, QueryResult } from 'pg';
import * as Book from './models/book';
import * as Sequelize from './models/sequelize.model';
import * as supertest from 'supertest';


//tạo dữ liệu mẫu comment để bỏ


// let config: PoolConfig = {
//     user: 'duc', //env var: PGUSER
//     database: 'TestDB', //evn var: PGDATABASE
//     password: '', // evn var: PGPASSWORD
//     host: 'localhost', // server hosting postgres database
//     port: 5432, //evn var: PGPORT
//     max: 10, // max number of client pool
//     idleTimeoutMillis: 30000 // how long a client remain idle before close
// };
// let pool = new Pool(config);
let app = express();
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());



app.use('/api', [bookRouter.router, humanRouter()]);


// app.use((req, res, next) => {
//     console.log('happen 2');
//     next();
// });

/**
 * hàm này dùng để thử cách sử dụng Promise
 */
// function getAllBokk(): Promise<any[]> {
//     return new Promise<any[]>((resolve, reject) => {

//         pool.connect((err, client, done) => {
//             if (err) {
//                 // console.error('error fetching client from pool', err);
//                 return reject(err);
//             }
//             client.query('select * from book', (err, result) => {
//                 //call done() to release the client back to the pool
//                 done();

//                 if (err) {
//                     // console.error('error running query', err);
//                     return reject(err);
//                 }
//                 // console.log(result.rows);
//                 resolve(result.rows);
//             });
//         });
//     });
// }

// app.use('/test', (req, res) => {
//     getAllBokk().then((value) => {
//         res.json(value);
//     })
//         .catch(err => {
//             console.error('Failed', err);
//             res.send(err.message);
//         });
// });

// app.use('/test2/:name?', (req, res) => {
//     pool.query('select * from book', (err, result) => {
//         res.json(result.rows);
//     })
// });


export default app;
// let request: supertest.SuperTest<supertest.Test> = supertest('http://localhost:8080/api');
// request.get('/book')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end((err, res) => {
//         if (err) throw err;
//     })