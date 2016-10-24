// đây là vùng import tất cả các modules bên ngoài
import { Router, Response, Request } from 'express';


// import các module tạo table
import { BookRepo } from '../repositories/book.repo';

// khai báo router và export nó ra cho bên ngoài import vào


// lấy table cần thiết




export class BookRouter {

    private router: Router;
    private bookRepo: BookRepo;

    constructor() {
        this.router = Router();
        this.bookRepo = new BookRepo();

        //this.model = model;
    }


    public getRouter(): Router {

        this.router.route('/book').get(this.getAllBook)
            .post(this.createABook)
            .delete(this.deleteABook);
        
        this.router.get('/countBook',this.countBook)


        return this.router;
    }

    private getAllBook = (req: Request, res: Response) => {
        let object={ id: 1, name: 'book1' };

        this.bookRepo.getList(null)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message)
            })
    }

    private countBook = (req: Request,res: Response) => {
        this.bookRepo.count(null)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                console.error(error.message);
                res.status(500).send(error.message);
            })
    }

    private createABook = (req, res) => {
        res.send('created')
    }

    private deleteABook = (req, res) => {
        res.send('deleted')
    }

}



// cấu hình router với url mình muốn (ở đây là /book => localhost:port/api/book)
// router.route('/book')
//     //lay het sach, hoac lay sach theo id
//     .get(getAllBook)

//     //tao 1 book
//     .post((req, res) => {
//         bookModel.create(req.body).then(b => {
//             res.json(b);
//         })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     })

//     //sua 1 sach theo id
//     .put((req, res) => {
//         let id = req.query.id;
//         bookModel.findById(id).then(b => {
//             if (b) {
//                 return b.update(req.body);
//             } else {
//                 return null;
//             }

//         })
//             .then(b => {
//                 if (b) {
//                     res.json(b);
//                 } else {
//                     res.status(404).send('khong tim thay sach voi id =' + id);
//                 }
//             })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     })

//     //delete a book by id
//     .delete((req, res) => {
//         bookModel.findById(req.query.id).then(b => {
//             if (b) {
//                 b.destroy();
//                 return b.name;
//             } else {
//                 return null;
//             }

//         })
//             .then((v) => {
//                 if (v) {
//                     res.status(200).send('sach ' + v + ' da duoc huy');
//                 } else {
//                     res.status(404).send('khong tim thay sach');
//                 }

//             })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     });

// // route test quan he        
// router.route('/bookAuthor')

//     // lay tat ca author cua sach
//     .get((req, res) => {
//         let id = req.query.id;
//         bookModel.findById(id).then(book => {
//             if (book) {
//                 book.getAuthors().then(authors => {
//                     res.json(authors);
//                 })
//             }
//             else {
//                 res.status(404).send('khong tim thay book voi id=' + id);
//             }
//         })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     })


//     // tao them author cho sach
//     .put((req, res) => {
//         let id = req.query.id;
//         bookModel.findById(id).then(book => {
//             if (book) {
//                 let authorName = req.body.name;
//                 book.createAuthor({ name: authorName })
//                 res.status(200).send('da tao them author vao book');
//             } else {
//                 res.status(404).send('khong tim thay book voi id=' + id);
//             }
//         })
//             .catch(error => {
//                 res.status(500).send(error.message);
//             })
//     })




