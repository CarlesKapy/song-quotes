process.env.NODE_ENV = 'test';

import * as chai from 'chai'
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp);

const testServerApp = require('../src/app')


describe('Song quote', () => {

    /* * Test the /GET route */
    describe('/GET songquote without params', () => {
        it('it should throw a 400', (done) => {
            chai.request(testServerApp)
                .get('/api/v1/songquote')
                .end((err, res) => {
                    expect(err).to.not.be.null
                    expect(err).to.have.status(400)
                    done();
                });
        });

        it('it should return a 200 status', (done) => {
           chai.request(testServerApp)
               .get('/api/v1/songquote')
               .query({lang: 'es'})
               .end((err, res) => {
                   expect(err).to.be.null
                   expect(res).to.have.status(200)
                   done();
               })
        });

        it('it should return a json body', (done) => {
            chai.request(testServerApp)
                .get('/api/v1/songquote')
                .query({lang: 'es'})
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.be.json
                    done();
                })
        });

        it('it should return a json with lang', (done) => {
            chai.request(testServerApp)
                .get('/api/v1/songquote')
                .query({lang: 'es'})
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.body).to.include({lang: 'es'})
                    done();
                })
        });

    });
});
