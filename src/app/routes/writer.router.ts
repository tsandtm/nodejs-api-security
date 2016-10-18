import { Router, Response } from 'express';
import { Pool, Client, QueryResult } from 'pg';
import { WriterModel } from '../models/writer.model';
import { BookModel } from '../models/book.model';
import * as Model from '../models/sequelize.model';


export = () => {
    let router = Router();
    let writerModel = Model.writer;
    let bookModel = Model.book;


    
    return router;
}