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
  this.timeout(100000);
  context('POST /auth/signup', function () {
    beforeEach(function (done) {
      models.User.remove();
      done();
    });
    it('should register & authenticate a user if provided sufficient details', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          firstName: 'foo',
          lastName: 'bar',
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data.user.firstName).to.be.equal('foo');
          expect(res.body.data.user.lastName).to.be.equal('bar');
          expect(res.body.data.user.email).to.be.equal('foo@bar.com');
          expect(res.body.data.user.id).to.be.a('string');
          done(err);
        });
    });

    it('should not sign up a user if firstname field is not filled', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          firstname: '',
          lastName: 'bar',
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.equal('Please enter your first name.');
          done(err);
        });
    });

    it('should not sign up a user if lastname field is not filled', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          firstName: 'foo',
          lastName: '',
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.equal('Please enter your last name.');
          done(err);
        });
    });

    it('should not sign up a user if email field is not filled', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          firstName: 'foo',
          lastName: 'bar',
          email: '',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.equal('Please enter your email.');
          done(err);
        });
    });

    it('should not sign up a user if password field is not filled', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          firstName: 'foo',
          lastName: 'bar',
          email: 'foo@bar.com',
          password: '',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.equal('Please enter your password.');
          done(err);
        });
    });


    it('should not sign up a user if password is less than 6 characters long', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          firstName: 'foo',
          lastName: 'bar',
          email: 'foo@bar.com',
          password: '12345',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.equal('Password should be no less than 6 characters long.');
          done(err);
        });
    });

    it('should not register a user with an account already', function (done) {
      const user = models.User.create({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '123456',
      });
      chai
        .request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          firstName: 'foo',
          lastName: 'bar',
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.equal('Your email is already registered in the app, you are only allowed to have one account.');
          done(err);
        });
    });

    it('should not register a user who provides an invalid email', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signup')
        .send({
          firstName: 'foo',
          lastName: 'bar',
          email: 'foobar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.equal('Email invalid!');
          done(err);
        });
    });
  });

  context('POST /auth/signin', function () {
    beforeEach(function (done) {
      models.User.remove();
      done();
    });

    it('should authenticate user if provided the required details', function (done) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync('123456', salt);
      const agent = models.User.create({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: hash,
      });
      chai
        .request(app)
        .post('/api/v1/user/auth/signin')
        .send({
          email: 'foo@bar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data.token).to.be.a('string');
          expect(res.body.data).to.have.property('user');
          expect(res.body.data.user).to.be.a('object');
          expect(res.body.data.user.firstName).to.be.equal('foo');
          expect(res.body.data.user.lastName).to.be.equal('bar');
          expect(res.body.data.user.email).to.be.equal('foo@bar.com');

          done(err);
        });
    });

    it('should not authenticate if user provides an invalid email', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signin')
        .send({
          email: 'foobar.com',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.has.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.be.equal('Email invalid!');
          done(err);
        });
    });

    it('should not authenticate if user does not provide email', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signin')
        .send({
          email: '',
          password: '123456',
        })
        .end(function (err, res) {
          expect(res).to.has.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.be.equal('Please enter your email.');
          done(err);
        });
    });

    it('should not authenticate if user does not provide password', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signin')
        .send({
          email: 'foo@bar.com',
          password: '',
        })
        .end(function (err, res) {
          expect(res).to.has.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.be.equal('Please enter your password.');
          done(err);
        });
    });

    it('should not authenticate if user provides a password less than 6 characters long', function (done) {
      chai
        .request(app)
        .post('/api/v1/user/auth/signin')
        .send({
          email: 'foo@bar.com',
          password: '23456',
        })
        .end(function (err, res) {
          expect(res).to.has.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.be.equal('Password should be no less than 6 characters long.');
          done(err);
        });
    });

    it('should not authenticate user if passwords do not match', function (done) {
      const agent = models.User.create({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: 'abcdef',
      });
      chai
        .request(app)
        .post('/api/v1/user/auth/signin')
        .send({
          email: 'foo@bar.com',
          password: 'abcdeq',
        })
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.status).to.be.equal('error');
          expect(res.body.msg).to.be.a('string');
          expect(res.body.msg).to.be.equal('Authentification failed incorrect password!');
          done(err);
        });
    });
  });
});
