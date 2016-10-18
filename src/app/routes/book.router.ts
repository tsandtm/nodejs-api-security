import { Router } from 'express';
// import { Book } from '../models/book';
// import { books } from '../models/mock-data';
// import {BookModel} from '../models/book.model';
import { Pool, Client, QueryResult } from 'pg';
import * as Model from '../models/sequelize.model';

// export const router = Router();


export let router: Router = Router();
let bookModel = Model.book;



router.route('/book')

    //lay het sach, hoac lay sach theo id
    .get((req, res) => {
        if (!req.query.id) {
            bookModel.findAll().then(books => {
                res.json(books);
            });
        } else {
            bookModel.findById(req.query.id).then(book => {
                res.json(book);
            })
        }
    })

    //tao 1 book
    .post((req, res) => {
        bookModel.create(req.body).then(b => {
            res.json(b);
        })
            .catch(error => {
                res.status(500).send(error.message);
            })
    })

    //sua 1 sach theo id
    .put((req, res) => {
        let id = req.query.id;
        bookModel.findById(id).then(b => {
            if (b) {
                return b.update(req.body);
            } else {
                return null;
            }

        })
            .then(b => {
                if (b) {
                    res.json(b);
                } else {
                    res.status(404).send('khong tim thay sach voi id =' + id);
                }
            })
            .catch(error => {
                res.status(500).send(error.message);
            })
    })

    //delete a book by id
    .delete((req, res) => {
        bookModel.findById(req.query.id).then(b => {
            if (b) {
                b.destroy();
                return b.name;
            } else {
                return null;
            }

        })
            .then((v) => {
                if (v) {
                    res.status(200).send('sach ' + v + ' da duoc huy');
                } else {
                    res.status(404).send('khong tim thay sach');
                }

            })
            .catch(error => {
                res.status(500).send(error.message);
            })
    });

// route test quan he        
router.route('/bookAuthor')

    // lay tat ca author cua sach
    .get((req, res) => {
        let id = req.query.id;
        bookModel.findById(id).then(book => {
            if (book) {
                book.getAuthors().then(authors => {
                    res.json(authors);
                })
            }
            else {
                res.status(404).send('khong tim thay book voi id=' + id);
            }
        })
            .catch(error => {
                res.status(500).send(error.message);
            })
    })


    // tao them author cho sach
    .put((req, res) => {
        let id = req.query.id;
        bookModel.findById(id).then(book => {
            if (book) {
                let authorName = req.body.name;
                book.createAuthor({ name: authorName })
                res.status(200).send('da tao them author vao book');
            } else {
                res.status(404).send('khong tim thay book voi id=' + id);
            }
        })
            .catch(error => {
                res.status(500).send(error.message);
            })
    })



