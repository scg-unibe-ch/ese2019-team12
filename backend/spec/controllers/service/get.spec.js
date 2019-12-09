import 'dotenv/config';
import request from 'request';

const endpoint = process.env.HOST + '/services';

describe('Service Controller: GET', () => {

  it('should return 200', async (done) => {
    await request.get(endpoint)
      .on('response', (response) => {
        expect(response.statusCode).toEqual(200);
        done()
      });
  });

  it('should return json', async (done) => {
    await request.get(endpoint)
      .on('response', (response) => {
        expect(response.headers['content-type']).toContain('application/json');
        done()
      });
  });

  it('should return an array of services', async (done) => {
    await request(endpoint, { method: 'GET' }, function (error, response, body) {
      const json = JSON.parse(body);
      expect(json[0]['title']).toEqual('service to get');
      expect(json[1]['title']).toEqual('second service to get');
      expect(body).toContain('id');
      expect(body).toContain('userId');
      expect(body).toContain('title');
      expect(body).toContain('description');
      expect(body).toContain('price');
      done();
    });
  });

  it('should return a specific service', async (done) => {
    let service_endpoint = endpoint + '/1';
    await request(service_endpoint, { method: 'GET' }, function (error, response, body) {
      const json = JSON.parse(body);

      expect(json.title).toEqual('service to get');
      expect(json.userId).toEqual(1);
      expect(json.description).toEqual('got it');
      expect(json.price).toEqual(500);
      done();
    });
  });

  it('should return \'not found\' if invalid service id', async (done) => {
    let service_endpoint = endpoint + '/-1';
    await request(service_endpoint, { method: 'GET' }, function (error, response, body) {
      expect(body).toContain('not found');
      done()
    });
  });

});
