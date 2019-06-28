/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import models from '../models';

chai.use(chaiHttp);
const { expect } = chai;

describe('users', () => {
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
          expect(res.body.msg).to.equal('Please fill in all fields');
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
          expect(res.body.msg).to.equal('Please fill in all fields');
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
          expect(res.body.msg).to.equal('Please fill in all fields');
          done(err);
        });
    });



  });
});
