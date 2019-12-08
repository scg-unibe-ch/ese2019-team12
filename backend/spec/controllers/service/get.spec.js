import 'dotenv/config';
import request from 'request';

const endpoint = process.env.HOST + '/services';

describe('Service Controller: GET', () => {

  it('should return 200', async () => {
    await request.get(endpoint)
      .on('response', (response) => {
        expect(response.statusCode).toEqual(200);
      });
  });

  it('should return json', async () => {
    await request.get(endpoint)
      .on('response', (response) => {
        expect(response.headers['content-type']).toContain('application/json');
      });
  });

});
