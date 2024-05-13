const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const courseSchema = new Schema({
    c_name: {
        type: String,
        required: true
    },
    c_category: {
        type: String,
        required: true
    },
    c_description:{
        type: String,
        required: true
    },
    c_code:{
        type: String,
        required: true
    },
    instructor:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    enrollStudents: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    videos: [videoSchema]
});

module.exports = mongoose.model('Course', courseSchema);