/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
// import models from '../models';

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
});
