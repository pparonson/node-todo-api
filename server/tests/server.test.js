const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// fn delete everything from db to prepare for proper tests
beforeEach((done) => {
  Todo
    .remove({})
    .then(() => done());
});

console.log('Database cleaned and ready..');

describe('server', () => {
  describe('POST /todos', () => {
    it('should create a new todo', (done) => {
      const text = 'Test todo text';

      // mock post request
      request(app)
        .post('/todos')
        .send({text}) // this obj is conv to json by supertest
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        // callback fn for error handling
        .end((err, res) => {
          if (err) {
            // return fn to exit cond execution
            return done(err);
          }

          Todo.find().then((result) => {
            expect(result.length).toBe(1);
            expect(result[0].text).toBe(text);
            done();
          })
          .catch((err) => done(err));
        });
    });


    it('should NOT create a new todo with invalid body data', (done) => {
      // make a post request
      request(app)
        .post('/todos')
        .send({}) // and send as empty obj
        .expect(400) // expect 400 "bad request" error
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find().then((result) => {
            expect(result.length).toBe(0);
            done();
          })
          .catch((err) => done(err));
        });
    });
  });
});
