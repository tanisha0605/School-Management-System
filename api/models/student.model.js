import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
  feesPaid: {
    type: Number,
    required: true
  },
  class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
  },
  role: {
    type: String,
    default: "Student"
},
},{ timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;

