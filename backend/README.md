# Back-End NodeJS
To use ES6 Syntax, babel is being used. .babelrc defines its version.
`npm start` will start the server with the correct configuration.

## The Server
The server is an express Server, defined in src/index.js

### CORS
CORS are handled by the npm module cors.
The express app loads the module with `app.use(cors());`.

### REST-API
The Server's replies are always of the format JSON as specified in the index file with `app.use(express.json());`

### Endpoints
The following endpoints are available:
* `/session`
* `/users`
* `/services`

## The Database
This server uses an sqlite3 database. It is stored in the file `db.sqlite`

### ORM: Sequelize
Sequelize is being used as the object-relation-model. It is defined in src/models/index.js
All models are defined in src/models.

Creating a new database:

`npx sequelize-cli db:migrate`
`npx sequelize-cli db:seed`


## Testing
Execute `npm test` to run all tests.

### Jasmine
Jasmine is used to run specs. All specs are defined in the spec directory. Helpers are defined in spec/helpers. Jasmine's run file is spec/support/run.js

The tests use a test database for integration tests. This should be sufficient testing for the api endpoints.
