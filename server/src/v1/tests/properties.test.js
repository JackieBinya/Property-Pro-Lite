/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import generateToken from '../utils/authService';

import models from '../models';

const { User } = models;

chai.use(chaiHttp);
const { expect } = chai;

let token;
let newUser;
describe('properties', () => {
  before(async () => {
    newUser = await User.create({
      firstName: 'foo',
      lastName: 'bar',
      email: 'foo@bar.com',
      password: '123456',
    });
    token = generateToken(newUser[0].id);
  });


  it('POST /property, should post /', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.equal(201);
        done(err);
      });
  });

  it('POST /property, should not post / if user does not have token', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', '')
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.status).to.equal(401);
        done(err);
      });
  });

  
  it('POST /property, should not post / if user does not fill in address field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.equal(400);
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in state field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', '')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in  city field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', '')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in title field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', '')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal(400);
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in description field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', '')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done(err);
      });
  });

  it('POST /property, should not post / if description exceeds 150 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. ')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done(err);
      });
  });

  it('POST /property, should not post / if title provided by user exceeds', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus.')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done(err);
      });
  });

  it('POST /property, should not post / if user does not fill in price field', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '')
      .field('type', '1 bedroom')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done(err);
      });
  });

  it('POST /property, should not post / if user does not select a type', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('x-auth-token', token)
      .type('form')
      .attach('image', 'server/src/v1/test-assets/QuickFish.jpg')
      .field('address', '4 De Waat Terraces, Goodwood')
      .field('state', 'Goodwood')
      .field('city', 'Bulawayo')
      .field('title', 'One bedroom  in a quiet surburb')
      .field('description', 'Cosy bedsitter, suitable for singles')
      .field('price', '$120')
      .field('type', '')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Please select a type that matches your property.');
        done(err);
      });
  });

  it('PATCH /:propertyId, should update an existing ads title given id', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/property/${newUser[0].id}`)
      .set('x-auth-token', token)
      .send({
        price: 120,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });

  it('PATCH /:propertyId/sold, should mark a property as sold', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/property/${newUser[0].id}/sold`)
      .set('x-auth-token', token)
      .send({
        title: '1 bed in Goodwood, TO RENT!',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });

  it('GET /property, should get all property ads ', (done) => {
    chai
      .request(app)
      .get('/api/v1/property')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });

  it('GET /property, should get property ads of a specific type', (done) => {
    chai
      .request(app)
      .get('/api/v1/property/?type=1%20bedroom')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });

 

  it('DELETE /property/:propertyId, should enable a user to delete their own ad', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/property/${newUser[0].id}`)
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });
});
