// import { engine } from 'express-handlebars';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/sortMiddleware');

const route = require('./routes');
const db = require('./config/db');
const { request } = require('express');

// Connect to DB
db.connect();

app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(methodOverride('_method'));

//Custom middlewares
app.use(SortMiddleware);

// XMLHttpRequest, fetch, axios

app.use(morgan('combined'));

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    helpers: require('./helpers/handlebar'),
    
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Home, search, contact

// Routes init
route(app);

app.listen(port, () => {
console.log(`App listening on port ${port}`)
})

// lint-staged: format những file add vào git
// husky: tự động chạy khi commit