const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: { type: Number, },
    name: { type: String, required: true, },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true, },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true},
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }, 
  }, {
    _id: false,
    timestamps: true,
  });

  // Custom query helpers
  CourseSchema.query.sortable = function(req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort ({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
  }

  // Add plugins
  mongoose.plugin(slug);  

  CourseSchema.plugin(AutoIncrement);
  CourseSchema.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all'
  });


  module.exports = mongoose.model('Course', CourseSchema);
  // slug unique = true ???
  