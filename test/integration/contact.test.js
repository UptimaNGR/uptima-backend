import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { data, wrongData } from '../fixtures/contact.us';

const { expect } = chai;
chai.use(chaiHttp);

describe('Contact us Routes', () => {
  it('creating a contact us message should respond with status 200', (done) => {
    chai
      .request(app)
      .post('/api/v1/contact-us')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done(err);
      });
  });
  it('creating a contact us message should respond with status 400', (done) => {
    chai
      .request(app)
      .post('/api/v1/contact-us')
      .send(wrongData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done(err);
      });
  });
});
