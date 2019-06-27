/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import models from '../models';

chai.use(chaiHttp);
const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiMDk2M2RmOTMtZmI4Ny00ZDc5LWI0YzctY2QwY2U0ZGQ3MzQ4IiwiaWF0IjoxNTYxNTY3NDMzfQ.U-jbZoPtBeAcNFNUqR_C93xnjjH9xr3Yc_T67UK5nPs';
describe('properties', function () {
  this.timeout(5000);
  context('POST /', function () {
    beforeEach(function (done) {
      models.Property.remove();
      done();
    });
    it('should post /', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body.data).to.have.key('imageUrl', 'address', 'location', 'city', 'title', 'description', 'price', 'type', 'id', 'agentId', 'status', 'createdOn');
          expect(res.body.data.imageUrl).to.be.a('string');
          expect(res.body.data.address).to.equal('4 De Waat Terraces, Goodwood');
          expect(res.body.data.location).to.equal('Goodwood');
          expect(res.body.data.city).to.equal('Bulawayo');
          expect(res.body.data.title).to.equal('One bedroom  in a quiet surburb');
          expect(res.body.data.description).to.equal('Cosy bedsitter, suitable for singles');
          expect(res.body.data.price).to.equal('$120');
          expect(res.body.data.type).to.equal('1 bedroom');
          done(err);
        });
    });

    it('should not post / if user does not have token', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        // .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(401);
          expect(res.body.msg).to.equal('No token access denied');
          done(err);
        });
    });

    it('should not post / if user does not upload image', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        // .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please upload an image of your property to continue.');
          done(err);
        });
    });

    it('should not post / if user does not fill in address field', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        // .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields, to continue...');
          done(err);
        });
    });

    it('should not post / if user does not fill in location field', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        // .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields, to continue...');
          done(err);
        });
    });

    it('should not post / if user does not fill in  city field', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        // .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields, to continue...');
          done(err);
        });
    });

    it('should not post / if user does not fill in title field', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        // .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields, to continue...');
          done(err);
        });
    });

    it('should not post / if user does not fill in description field', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        // .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields, to continue...');
          done(err);
        });
    });

    it('should not post / if user does not fill in price field', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        // .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields, to continue...');
          done(err);
        });
    });

    it('should not post / if user does not fill in type field', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        // .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields, to continue...');
          done(err);
        });
    });
  });

  context('PUT /:id', function () {
    beforeEach(function (done) {
      models.Property.remove();
      done();
    });
    it('should update an existing ad given its id put/:id', function (done) {
      const property = models.Property.create({
        imageUrl: 'http://fake/url',
        address: '4 De Waat Terraces, Goodwood',
        location: 'Goodwood',
        city: 'Bulawayo',
        title: 'One bedroom  in a quiet surburb',
        description: 'Cosy bedsitter, suitable for singles',
        price: '$120',
        type: '1 bedroom',
      });

      chai
        .request(app)
        .put(`/api/v1/properties/${property.id}`)
        .set('x-auth-token', token)
        .type('form')
        .attach('image', './src/test-assets/testImg.jpg')
        .field('address', '43 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$220')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.key('imageUrl', 'address', 'location', 'city', 'title', 'description', 'price', 'type', 'id', 'status', 'createdOn');
          expect(res.body.data.id).to.be.equal(`${property.id}`);
          expect(res.body.data.price).to.equal('$220');
          expect(res.body.data.address).to.equal('43 De Waat Terraces, Goodwood');
          done(err);
        });
    });
  });

  context('GET /', function () {
    beforeEach(function (done) {
      models.Property.remove();
      done();
    });
    it('should get all property ads', function (done) {
      chai
        .request(app)
        .get('/api/v1/properties')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data.length).to.equal(0);
          done(err);
        });
    });
  });

  context('PUT /?id=3', function () {
    beforeEach(function (done) {
      models.Property.remove();
      done();
    });
    it('should mark an ad as sold given its id', function (done) {
      const property = models.Property.create({
        imageUrl: 'http://fake/url',
        address: '4 De Waat Terraces, Goodwood',
        location: 'Goodwood',
        city: 'Bulawayo',
        title: 'One bedroom  in a quiet surburb',
        description: 'Cosy bedsitter, suitable for singles',
        price: '$120',
        type: '1 bedroom',
      });

      chai
        .request(app)
        .put(`/api/v1/properties?id=${property.id}`)
        .set('x-auth-token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.status).to.equal('sold');
          done(err);
        });
    });
  });

  context('GET /type', function () {
    beforeEach(function (done) {
      models.Property.remove();
      done();
    });
    it('it should get property ads of a specific type', function (done) {
      chai
        .request(app)
        .get('/api/v1/properties/type')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.data.length).to.be.equal(0);
          done(err);
        });
    });
  });
});
