/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../app';
import models from '../models';

chai.use(chaiHttp);
const { expect } = chai;

describe('users', function () {
  it('should test that set up OK', function (done) {
    chai
      .request(app)
      .post('/api/v1/users')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.equal('Hello World');
        done(err);
      });
  });

  context('POST /sign-up', function () {
    beforeEach(function (done) {
      models.User.remove();
      done();
    });
    it('should register & authenticate a user if provided sufficient details', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/sign-up')
        .send({
          username: 'foo',
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data.user.username).to.be.equal('foo');
          expect(res.body.data.user.email).to.be.equal('foo@bar.com');
          done(err);
        });
    });

    it('should not sign up a user if username field is not filled', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/sign-up')
        .send({
          // username: 'foo',
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields.');
          done(err);
        });
    });

    it('should not sign up a user if email field is not filled', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/sign-up')
        .send({
          username: 'foo',
          // email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields.');
          done(err);
        });
    });

    it('should not sign up a user if password field is not filled', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/sign-up')
        .send({
          username: 'foo',
          email: 'foo@bar.com',
          // password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields.');
          done(err);
        });
    });


    it('should not sign up a user if password is less than 6 characters long', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/sign-up')
        .send({
          username: 'foo',
          email: 'foo@bar.com',
          password: '12345',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Password should be no less than 6 characters long.');
          done(err);
        });
    });

    it('should not register a user with an account already', function (done) {
      const user = models.User.create({
        username: 'foo',
        email: 'foo@bar.com',
        password: '123456',
      });
      chai
        .request(app)
        .post('/api/v1/users/sign-up')
        .send({
          username: 'foo',
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Your email is already registered in the app, you are only allowed to have one account.');
          done(err);
        });
    });

    it('should not register a user who provides an invalid email', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/sign-up')
        .send({
          username: 'foo',
          email: 'foobar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Enter a valid email.');
          done(err);
        });
    });
  });

  context('POST /login', function () {
    beforeEach(function (done) {
      models.User.remove();
      done();
    });

    it('should authenticate user if provided the required details', function (done) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('123456', salt);
      const agent = models.User.create({
        username: 'foo',
        email: 'foo@bar.com',
        password: hash,
      });
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data).to.have.property('user');
          expect(res.body.data.user).to.be.a('object');
          expect(res.body.data.user.username).to.be.equal('foo');
          expect(res.body.data.user.email).to.be.equal('foo@bar.com');

          done(err);
        });
    });

    it('should not authenticate if user provides an invalid email', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'foobar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.has.status(400);
          expect(res.body.msg).to.be.equal('Enter a valid email.');
          done(err);
        });
    });

    it('should not authenticate if user does not provide email', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: '',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.has.status(400);
          expect(res.body.msg).to.be.equal('Please fill in all fields.');
          done(err);
        });
    });

    it('should not authenticate if user does not provide password', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'foo@bar.com',
          password: '',
        })
        .end(function (err, res) {
          expect(res).to.has.status(400);
          expect(res.body.msg).to.be.equal('Please fill in all fields.');
          done(err);
        });
    });

    it('should not authenticate if user provides a password less than 6 charecters long', function (done) {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'foo@bar.com',
          password: '23456',
        })
        .end(function (err, res) {
          expect(res).to.has.status(400);
          expect(res.body.msg).to.be.equal('Password should be no less than 6 characters long.');
          done(err);
        });
    });

    it('should not authenticate user if passwords do not match', function (done) {
      const agent = models.User.create({
        username: 'foo',
        email: 'foo@bar.com',
        password: 'abcdef',
      });
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('msg');
          expect(res.body.msg).to.be.a('string');
          expect(res.body.msg).to.be.equal('Authentification failed incorrect password!');
          done(err);
        });
    });
  });
});
