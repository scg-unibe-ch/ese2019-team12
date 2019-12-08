import Jasmine from 'jasmine';
import 'dotenv/config';

process.env.DB_STORAGE='test.sqlite'; // Use the test db
process.env.DB_LOG='None'; // Disable logging

var jasmine = new Jasmine();
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();
