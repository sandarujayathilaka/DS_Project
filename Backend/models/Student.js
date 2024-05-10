const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
    enrollCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    refreshToken: String
});

module.exports = mongoose.model('Student', studentSchema);