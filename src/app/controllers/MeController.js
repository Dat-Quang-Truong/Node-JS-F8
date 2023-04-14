const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const CourseController = require('./CourseController');
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        
        //Promise??
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted()]
        )
            .then(([courses, deletedCount]) => 
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                })
            )
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});

        // //SOFT DELETED
        // Course.find({})
        //     .then(courses =>  res.render('me/stored-courses', {
        //         courses: mutipleMongooseToObject(courses),
        //     }))
        //     .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses =>  res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    }
    
}

module.exports = new MeController();

