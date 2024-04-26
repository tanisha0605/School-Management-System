import Student from '../models/student.model.js';
import Class from '../models/class.model.js';
import { errorHandler } from '../utils/error.js';

export const createStudent = async (req, res, next) => {
  try {
    const className = req.body.class;

    const foundClass = await Class.findOne({ name: className });
    console.log(foundClass);
    if (!foundClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    const newStudent = await Student.create({
      ...req.body,
      class: foundClass._id
    });

    // Update the class with the newly created Student
    foundClass.students = newStudent._id;
    await foundClass.save();

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    // Find the student to be deleted
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete the student
    await Student.findByIdAndDelete(req.params.id);

    // Remove the student's ID from the associated class
    const foundClass = await Class.findOneAndUpdate(
      { students: req.params.id },
      { $pull: { students: req.params.id } },
      { new: true }
    );

    if (!foundClass) {
      return res.status(404).json({ message: 'Associated class not found' });
    }

    res.status(200).json({ message: 'Student has been deleted' });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  const student= await Student.findById(req.params.id);
  if (!student) {
    return next(errorHandler(404, 'Student not found!'));
  }
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate("class");
    if (!student) {
      return next(errorHandler(404, 'Student not found!'));
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find()
    return res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};
