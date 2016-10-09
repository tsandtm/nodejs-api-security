import { Router } from 'express';
import { Book } from '../models/book';
// import { books } from '../models/mock-data';
import { Pool, Client, QueryResult } from 'pg';

// export const router = Router();

export = function (query: Pool): Router {
    let pool: Pool = query;
    let router: Router = Router();

    // router.get('/book', (req, res) => {
    //     pool.query('select * from book')
    //     res.json(books);
    // });

    // router.post('/book', (req, res) => {
    //     let book = new Book(req.body.name, req.body.author);
    //     books.push(book);
    //     res.json({ message: 'book created', book: book });
    // });


    router.route('/book/:bookName?')

        .get((req, res) => {
            if (!req.params.bookName) {
                pool.query('select * from book', (err, result) => {
                    if (err) {
                        return res.send(500, 'lỗi kỹ thuật');
                    }
                    res.json(result.rows);
                    console.log(result.rows);
                });
            } else {
                pool.query('select * from book where book.name = $1', [req.params.bookName], (error, result) => {
                    if (error) {
                        return res.json(500, 'lỗi kỹ thuật');
                    }
                    if (result.rowCount === 0) {
                        res.status(404).send('tìm không thấy');
                    } else {
                        res.json(result.rows);
                    }
                })
            }
        })

        .post((req,res) => {
            let id = req.body.id;
            let name = req.body.name;
            let author = req.body.author;
            //sử dụng pg với promise
            pool.connect().then((client: Client) => {
                client.query('Insert into book values ($1,$2,$3)',[id,name,author])
                    .then((result: QueryResult) => {
                        client.release();
                        console.log(result.rows);
                        res.send('Đã thêm book thành công');
                    })
                    .catch((error: Error) => {
                        client.release();
                        console.error(error.message);
                        res.status(500).send(error.message);
                    });
            });
        })

        .put((req, res) => {
            pool.query('update book set author = $1 where name = $2',[req.body.author,req.params.bookName],(error,result) => {
                if(error){
                    res.status(500).send(error.message);
                }else{
                    if(result.rowCount === 0){
                        res.status(404).send('không tìm thấy sách với tên: ' + req.params.bookName);
                    }else{
                        res.send('đã update book: ' + req.params.bookName);
                    }
                }
            });
        })

        .delete((req, res) => {
            pool.query('Delete from book where name = $1',[req.params.bookName],(error,result) => {
                if(error){
                    res.status(500).send(error.message);
                }else{
                    if(result.rowCount === 0){
                        res.status(404).send('Khong tim thay sach');
                    }else{
                        res.send('xoa sach thanh cong');
                    }
                }
            });
        });

    return router;
}


