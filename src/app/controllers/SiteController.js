const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    // [GET] /news
    async index(req, res, next) {

        // try {
        //     const courses = await Course.find({});
        //     //console.log(courses);
        //     res.json(courses);
        // } catch (err) {
        //     next(err);
        // }

        //Promise
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses) 
                });
            })
            .catch(next);

        

    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

//const newsController = require('./NewsController');

// Course.find({})
//             .then(courses => res.json(courses))
//             .catch(next);


// Làm sao format database show lên localhost như trên f8
// ERROR: Course.find({}, function (err, courses) {
        //     if (!err) res.json(courses);
        //     res.status(400).json({ error: 'ERORR!!!'});
        // });
        // res.render('home');