const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// seed db for GET tests
const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo'
  }
];

// fn delete everything from db to prepare for proper tests
// beforeEach((done) => {
//   Todo
//     .remove({})
//     .then(() => done());
// });

beforeEach((done) => {
  Todo
    .remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
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

          Todo.find({text})
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
              expect(result.length).toBe(2);
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
    });
  });

  describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          // const {todos} = res.body;
          expect(res.body.result.length).toBe(2);
        })
        .end(done);
    });
  });

  describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
      const [{_id}] = todos;
      const [{text}] = todos;

      request(app)
        .get(`/todos/${_id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          const {result} = res.body;
          expect(result.text).toBe(text);
        })
        .end(done);
    });

    it('should return a 404 error if todo not found', (done) => {
      // make a request with a new ObjectID, this id should not be found in collection
      const _id = new ObjectID().toHexString();

      // res should send 404 error
      request(app)
        .get(`/todos/${_id}`)
        .expect(404) // doc not found error
        .end(done);
    });

    it('should return a 404 for invalid / non-object id', (done) => {
      // invalid request should trigger ObjectID.isValid() fn in server.js
      request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    });
  });
});
