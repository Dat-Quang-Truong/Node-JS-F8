//Phai dat cung ten thi moi chay duoc
const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');


function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/', siteRouter);
    

    // app.get('/', (req, res) => {
    //     res.render('home');
    // })

    // app.get('/news', (req, res) => {
    //   res.render('news');
    // })

    // Local host -- Hosting

    // Action ---> Dispatcher ---> Function handler

    // app.get('/search', (req, res) => {
    //   res.render('search');
    // })

    // gui di duoi dang query parameter
    // ko phai query parameter thif k dinh kem dc url
    // app.post('/search', (req, res) => {
    //   console.log(req.body);

    //   res.send('');
    // })
}

module.exports = route;
