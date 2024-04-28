import Student from '../models/student.model.js';
import Class from '../models/class.model.js';
import { errorHandler } from '../utils/error.js';
export const createStudent = async (req, res, next) => {
  try {
    const className = req.body.class;

    // Find the class by name
    const foundClass = await Class.findOne({ name: className });

    // If class not found, return error
    if (!foundClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if adding the student will exceed the max capacity
    if (foundClass.currentCapacity >= foundClass.maxCapacity) {
      return res.status(400).json({ message: 'Class is full. Cannot add more students.' });
    }

    // Create the student with the class association
    const newStudent = await Student.create({
      ...req.body,
      class: foundClass._id // Assign class ID to the student
    });

    // Update the class with the newly created Student and increase currentCapacity
    foundClass.students.push(newStudent._id);
    foundClass.currentCapacity++;
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
    const students = await Student.find().populate("class")
    return res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};
export const getIdByName = async (req, res, next) => {
  try {
    const studentName = req.params.name;
    const studentData = await Student.findOne({ name: studentName });
    if (!studentData) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json( studentData._id );
  } catch (error) {
    next(error);
  }
};
export const getStudentsForm = async (req, res, next) => {
  try {
    const students = await Student.find({}, { _id: 0,__v:0,createdAt:0,updatedAt:0,role:0});
    return res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

export const getStudentFeesSum = async (req, res, next) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: null,
          sum: { $sum: "$feesPaid" }
        }
      }
    ]);

    if (result.length > 0) {
      res.status(200).json({ sum: result[0].sum });
    } else {
      res.status(200).json({ sum: 0 }); 
    }
  } catch (error) {
    next(error); 
  }
};

