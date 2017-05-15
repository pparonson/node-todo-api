const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// const todos = [
//   {text: 'First test todo'},
//   {text: 'Second test todo'}
// ];
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
      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find()
            .then((result) => {
              expect(result.length).toBe(1);
              expect(result[0].text).toBe(text);
              done();
            })
            // get errors that may occur inside of callback
            .catch((err) => {
              done(err);
            })
        });
    });

    it('should NOT be created with invalid body data', (done) => {
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find()
            .then((result) => {
              expect(result.length).toBe(0);
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
    });
  });
});
