import { Router, Response } from 'express';
import { Pool, Client, QueryResult } from 'pg';
import { Promise } from 'es6-promise';


export = function (pool: Pool) {
    let router = Router();

    let checkEmpty = function (result: QueryResult, response: Response, message: string): QueryResult {
        if (result.rowCount === 0) {
            response.status(404).send(message);
            return null;
        }
        return result;
    }

    let handleError = function (error: Error, response: Response): Promise<Error> {
        response.status(500).send(error.message);
        return Promise.reject(error);
    }

    let beginTransactions = function (client: Client): Client {
        client.query('begin');
        return client;
    }

    let rollBack = function (client: Client, done: Function) {
        client.query('rollback', (error) => {
            done(error);
        });
    }

    router.route('/human/:id?')


        .get((req, res) => {
            let id = req.params.id;
            if (!id) {
                pool.query('select * from human')
                    .then((result: QueryResult) => {
                        res.json(result.rows);
                    })
                    .catch(error => handleError(error, res));
            } else {
                pool.query('select * from human where id = $1', [id])
                    .then(result => checkEmpty(result, res, 'khong tim thay'))
                    .then(result => {
                        if (result) {
                            res.json(result.rows);
                        }
                    })
                    .catch(error => handleError(error, res));
            }
        })


        // .post((req, res) => {
        //     pool.connect()
        //         .then((client: Client) => {
        //             //đầu tiên bắt đầu transaction
        //             client.query('begin', (error) => {
        //                 if (error) {
        //                     console.error(error.message);
        //                 }
        //             });
        //             return client;
        //         })
        //         .then((client: Client) => {
        //             client.query('insert into human values ($1,$2,$3)',[4,'rollback man',100])
        //                 .then((client: Client) => {

        //                 })
        //                 .catch(error => {
        //                     throw error;
        //                 });
        //             return client;
        //         })
        //         .then((client: Client) => {
        //             client.query('rollback');
        //             client.release();
        //             // client.end();
        //             res.send('da roll back');
        //             return client;
        //         })
        //         .catch(error => {
        //             console.error(error.message);
        //             res.status(500).send(error.message);
        //         });
        // })

        .put((req, res) => {

        })

        .delete((req, res) => {

        })


    return router;
}