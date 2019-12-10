# Back-End NodeJS
To use ES6 Syntax, babel is being used. .babelrc defines its version.

First run `npm install` to install all dependencies.

If you want to have some test data, execute `npm run db_init`.

`npm start` will start the server with the correct configuration.

## The Server
The server is an express Server, defined in src/index.js

### REST-API
The Server's replies are always of the format JSON as specified in the index file with `app.use(express.json());`

### Endpoints
The following endpoints are available:

| Controller | Endpoint | Method | Info | Requires Token |
| ---------- | -------- | ------ | ---- | -------------- |
| `/session` | `/login` | POST   | Send login (username or email address) and receive token and user. | No |
| `/users` | `/` | GET | Load all users | Yes|
||`/:id`|GET|Load specific user|Yes|
||`/`|POST|Create new user|No|
||`/:id`|PUT|Update user|Yes|
||`/:id`|DELETE|Remove user|Yes|
||`/search`|GET|Search users. Accepts queries of the form `{"username": "xyz"}` or `{"email": "xyz"}`|No|
|`/services`|`/`|GET|Load all services|No|
||`/:id`|GET|Load specific service|No|
||`/user/:id`|GET|Load all services by a specific user|No|
||`/:id`|PUT|Update a service|Yes|
||`/:id`|DELETE| Remove a service|Yes|
|`/events`|`/`|GET|Load all events|Yes|
||`/:id`|GET|Load specific event|Yes|
||`/user/:id`|GET|Load all events by a specific user|Yes|
||`/`|POST|Create an event|Yes|
||`/:id`|PUT|Update an event|Yes|
||`/:id`|DELETE|Remove an event|Yes|


## The Database
This server uses an sqlite3 database. It is stored in the file `db.sqlite`

### ORM: Sequelize
Sequelize is being used as the object-relation-model. It is defined in src/models/index.js
All models are defined in src/models.

Creating a new database:

`npm run db_init`

## Testing
Execute `npm test` to run all tests.

### Jasmine
Jasmine is used to run specs. All specs are defined in the spec directory. Helpers are defined in spec/helpers. Jasmine's run file is spec/support/run.js

The tests use a test database for integration tests. This should be sufficient testing for the api endpoints.
