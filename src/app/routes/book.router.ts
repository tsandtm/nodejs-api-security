import { Router } from 'express';
import { Book } from '../models/book';
import { books } from '../models/mock-data';

export const router = Router();

router.get('/book', (req, res) => {
    res.json(books);
});

router.post('/book', (req, res) => {
    let book = new Book(req.body.name, req.body.author);
    books.push(book);
    res.json({ message: 'book created', book: book });
});


router.route('/book/:bookName')

.get((req,res) => {
    books.forEach(b => {
        if(b.name === req.params.bookName){
            res.json(b);
            return;
        }
    })
    res.send(404,'not found book with name: ' + req.params.bookName);
})

.put((req, res) => {
    books.forEach(b => {
        if (b.name === req.params.bookName) {
            b.author = req.body.author;
            res.send('update success');
            return;
        }
    });
    res.send(404, 'sorry cannot find book with name : ' + req.params.bookName);
})

.delete((req, res) => {
    for (let i = 0; i < books.length; i++) {
        if(books[i].name === req.params.bookName){
            books.splice(i,1);
            res.send('delete success');
            return;
        }
    }
    res.send(404,'sorry cannot find book with name: ' + req.params.bookName);
});

