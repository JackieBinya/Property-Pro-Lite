/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('users', () => {


  it('POST /auth/signup, should not sign up a user if firstname field is not filled', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Please enter your first name.');
        done(err);
      });
  });

  it('POST /auth/signup, should not sign up a user if lastname field is not filled', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: '',
        email: 'foo@bar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Please enter your last name.');
        done(err);
      });
  });

  it('POST /auth/signup, should not sign up a user if email field is not filled', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: '',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Please enter your email.');
        done(err);
      });
  });

  it('POST /auth/signup, should not sign up a user if password field is not filled', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Please enter your password.');
        done(err);
      });
  });

  it('POST /auth/signup, should not sign up a user if password is less than 6 characters long', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '12345',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Password should be no less than 6 characters long.');
        done(err);
      });
  });

  it('POST /auth/signup, should not register a user with an account already', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Your email is already registered in the app, you are only allowed to have one account.');
        done(err);
      });
  });

  it('POST /auth/signup, should not register a user who provides an invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'foo',
        lastName: 'bar',
        email: 'foobar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.equal('Email invalid!');
        done(err);
      });
  });

  it('POST /auth/signin, should not authenticate if user provides an invalid email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'foobar.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.has.status(400);
        expect(res.body.status).to.be.equal(400);
        done(err);
      });
  });

  it('POST /auth/signin, should not authenticate if user does not provide email', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: '123456',
      })
      .end((err, res)  => {
        expect(res).to.has.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Please enter your email.');
        done(err);
      });
  });

  it('POST /auth/signin, should not authenticate if user does not provide password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'foo@bar.com',
        password: '',
      })
      .end((err, res) => {
        expect(res).to.has.status(400);
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal('Please enter your password.');
        done(err);
      });
  });

  it('POST /auth/signin, should not authenticate if user provides a password less than 6 characters long', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'foo@bar.com',
        password: '23456',
      })
      .end((err, res) => {
        expect(res).to.has.status(400);
        expect(res.body.status).to.be.equal(400);
        done(err);
      });
  });

  it('POST /auth/signin, should not authenticate user if passwords do not match', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'foo@bar.com',
        password: 'abcdeq',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done(err);
      });
  });
});
