var server;
beforeAll(async () => {
  server = require('../../src/index');
  await server.on('ready', () => {
    console.log("Server ready");
  });
});
afterAll(() => {
  server.close();
});
