/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';

chai.use(chaiHttp);
const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiMDk2M2RmOTMtZmI4Ny00ZDc5LWI0YzctY2QwY2U0ZGQ3MzQ4IiwiaWF0IjoxNTYxNTY3NDMzfQ.U-jbZoPtBeAcNFNUqR_C93xnjjH9xr3Yc_T67UK5nPs';

describe('properties', function () {
  this.timeout(10000);

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
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body.data).to.have.key('imageUrl', 'address', 'location', 'city', 'title', 'description', 'price', 'type', 'id', 'agentId', 'status');
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
        .set('x-auth-token', '')
        .type('form')
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
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
        // .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
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
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
        // .field('address', '')
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
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', '')
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
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', '')
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
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', '')
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
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', '')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('Please fill in all fields, to continue...');
          done(err);
        });
    });

    it('should not post / if description exceeds 150 characters', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. ')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('The description is too long, make sure its no more than 150 charactes long!');
          done(err);
        });
    });

    it('should not post / if title provided by user exceeds', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus.')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '$120')
        .field('type', '1 bedroom')
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body.msg).to.equal('The title is too long,  make sure its no more than 45 characters long!');
          done(err);
        });
    });


    it('should not post / if user does not fill in price field', function (done) {
      chai
        .request(app)
        .post('/api/v1/properties')
        .set('x-auth-token', token)
        .type('form')
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
        .field('address', '4 De Waat Terraces, Goodwood')
        .field('location', 'Goodwood')
        .field('city', 'Bulawayo')
        .field('title', 'One bedroom  in a quiet surburb')
        .field('description', 'Cosy bedsitter, suitable for singles')
        .field('price', '')
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
        .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
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
        imageUrl: 'server/src/v1/test-assets/GuitarStudioBanner.jpg',
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
        .attach('image', 'server/src/v1/test-assets/GuitarStudioBanner.jpg')
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
          expect(res.body.data).to.have.key('imageUrl', 'address', 'location', 'city', 'title', 'description', 'price', 'type', 'id', 'status');
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

  context('GET /prop', function () {
    beforeEach(function (done) {
      models.Property.remove();
      done();
    });
    it('should get a specific property ad', function (done) {
      const property = models.Property.create({
        imageUrl: 'server/src/v1/test-assets/GuitarStudioBanner.jpg',
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
        .get(`/api/v1/properties/prop?id=${property.id}`)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.a('object');
          done(err);
        });
    });

    it('should not get an advert if provide a non existant id', function (done) {
      const id = 'abcdef';

      chai
        .request(app)
        .get(`/api/v1/properties/prop?id=${id}`)
        .end(function (err, res) {
          expect(res).to.have.status(404);
          expect(res.body.msg).to.be.equal('Property ad is not found!');
          done(err);
        });
    });
  });

  context('DELETE /id', function () {
    beforeEach(function (done) {
      models.Property.remove();
      done();
    });
    it('should delete a property ad given its id', function (done) {
      const property = models.Property.create({
        imageUrl: 'server/src/v1/test-assets/GuitarStudioBanner.jpg',
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
        .delete(`/api/v1/properties/${property.id}`)
        .set('x-auth-token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body.msg).to.be.equal('Property ad is sucessfully deleted');
          done(err);
        });
    });
  });
});
