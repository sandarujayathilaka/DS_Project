const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String
    },
    email:{
        type: String
    },
    addedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    refreshToken: String
});

module.exports = mongoose.model('Instructor', instructorSchema);