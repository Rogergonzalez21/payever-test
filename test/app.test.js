process.env.NODE_ENV = 'test';

const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const app = require('../src/start');

chai.use(chaiHttp);

describe('The app:', () => {
  it('should get user 1 information', done => {
    chai
      .request(app)
      .get('/api/user/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('email').eql('george.bluth@reqres.in');
        done();
      });
  });

  it('should get user 1 avatar, save it and return it locally', done => {
    chai
      .request(app)
      .get('/api/user/1/avatar')
      .end((err, res) => {
        res.should.have.status(200);
        fs.existsSync(
          path.resolve(__dirname, '../src', 'images', 'calebogden.jpg')
        ).should.eql(true);
        chai
          .request(app)
          .get('/api/user/1/avatar')
          .end((err_, res_) => {
            res_.should.have.status(200);
            done();
          });
      });
  });

  it('should delete user 1 avatar', done => {
    chai
      .request(app)
      .delete('/api/user/1/avatar')
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it('should return error if user avatar is not saved locally', done => {
    chai
      .request(app)
      .delete('/api/user/2/avatar')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
