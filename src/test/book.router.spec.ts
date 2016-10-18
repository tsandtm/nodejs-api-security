import { Expect, Test, TestCase, AsyncTest } from 'alsatian';
import * as supertest from 'supertest';
import * as bluebird from 'bluebird';
import {bookData} from './test.data';

export class BookRouterTest {
    request: supertest.SuperTest<supertest.Test> = supertest('http://localhost:8080/api');

    @AsyncTest('should return json array')
    public getAllBook() {
        return new bluebird((resolve, reject) => {
            Expect(() => {
                this.request.get('/book')
                    .expect('Content-Type',/json/)
                    .expect(200)
                    .expect((res: supertest.Response) => {
                        Expect(res.body).toEqual(bookData)
                    })
                    .end((err, res) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve();
                        }
                    })
            }).not.toThrow();
        })
    }

    @AsyncTest('should return book with name book1')
    public getABook(){
        return new bluebird((resolve, reject) => {
            Expect(() => {
                this.request.get('/book')
                    .query({id:1})
                    .expect('Content-Type',/json/)
                    .expect((res: supertest.Response) => {
                        Expect(res.body).toEqual(bookData[0]);
                    })
                    .end(err => {
                        if(err){
                            reject(err);
                        }else{
                            resolve();
                        }
                    })
            }).not.toThrow();
        })
    }
}