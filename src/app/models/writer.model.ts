import * as Sequelize from 'sequelize';
import * as Book from './book.model';

export interface WriterAttribute{
    id?: number;
    name?: string;
    bookId?: number;
}

export interface WriterId { WriterId: number}

export interface WriterInstance extends Sequelize.Instance<WriterAttribute>,WriterAttribute{
}

export interface WriterModel extends Sequelize.Model<WriterInstance,WriterAttribute>{
}