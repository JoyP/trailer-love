/* global describe, before, beforeEach, it */

'use strict';

process.env.DB   = 'trailer-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    app     = require('../../app/index'),
    cookie  = null,
    request = require('supertest');

describe('gifts', function(){
  before(function(done){
    request(app).get('/').end(done);
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/login')
      .send('email=bubs@aol.com')
      .send('password=1234')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });

  describe('get /gifts', function(){
    it('should show all the gifts', function(done){
      request(app)
      .get('/gifts')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});

