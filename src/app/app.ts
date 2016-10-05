import * as express from 'express';
import * as body_parser from 'body-parser';
import {router as bookRouter} from './routes/book.router';



let app = express();
let port = 8080;
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.use((req,res,next) =>{
    console.log('happen 1');
    next();
})

app.use('/api',(req,res,next) => {
    bookRouter(req,res,next);
    next();
});

app.use((req,res,next) =>{
    console.log('happen 2');
    next();
})

app.listen(port);
console.log('server run on port: ' + port);