const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose')

class CourseController {

    // [GET] /courses/:slug
    show(req, res, next) {

        Course.findOne({ slug: req.params.slug})
            .then(course => 
                res.render('courses/show', { course: mongooseToObject(course) })
            )
            .catch(next);

        // res.send('COURSE DETAIL - ' + req.params.slug);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        // res.json(req.body);
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`;
        
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
        // Course.findOne({})
        //     .sort({ _id: 'desc' })
        //     .then(latestCourse => {

                
        //     });
        
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
        
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        // res.json(req.body);
        // LỖI ????????????
        // Sửa đc r lỗi ở action="/courses/{{course.name -> _id}} bên edit.hbs
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /course/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid!'});
        }
    }
}

// GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD

module.exports = new CourseController();