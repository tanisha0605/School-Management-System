import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true
  },
  assignedClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  },
  role: {
    type: String,
    default: "Teacher"
    },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
