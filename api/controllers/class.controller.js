import Class from '../models/class.model.js';
import { errorHandler } from '../utils/error.js';
import Student from '../models/student.model.js';
export const createClass = async (req, res, next) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (req, res, next) => {
  const classData = await Class.findById(req.params.id);

  if (!classData) {
    return next(errorHandler(404, 'Class not found!'));
  }
  try {
    // Find all students associated with the class
    const studentsToUpdate = await Student.find({ class: req.params.id });

    // Update class field for each student to null
    await Promise.all(studentsToUpdate.map(async (student) => {
      student.class = null; 
      await student.save();
    }));

    // Delete the class
    await Class.findByIdAndDelete(req.params.id);
    
    res.status(200).json('Class has been deleted!');
  } catch (error) {
    next(error);
  }
};



export const updateClass = async (req, res, next) => {
  const existingclass= await Class.findById(req.params.id);
  if (!existingclass) {
    return next(errorHandler(404, 'Class not found!'));
  }
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedClass);
  } catch (error) {
    next(error);
  }
};

export const getClass = async (req, res, next) => {
  try {
    const classData = await Class.findById(req.params.id).populate('students').populate('teacher');
    if (!classData) {
      return next(errorHandler(404, 'Class not found!'));
    }
    res.status(200).json(classData);
  } catch (error) {
    next(error);
  }
};

export const getClassByName = async (req, res, next) => {
  try {
    const className = req.params.name;
    const classData = await Class.findOne({ name: className }).populate('students').populate('teacher');
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(classData);
  } catch (error) {
    next(error);
  }
};

export const getClasses = async (req, res, next) => {
  try {
    const Classes = await Class.find().populate('students').populate('teacher');
    return res.status(200).json(Classes);
  } catch (error) {
    next(error);
  }
};
export const getIdByName = async (req, res, next) => {
  try {
    const className = req.params.name;
    const classData = await Class.findOne({ name: className });
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(classData._id );
  } catch (error) {
    next(error);
  }
};
export const getClassesForm = async (req, res, next) => {
  try {
    const Classes = await Class.find({}, { _id: 0 ,numMaleStudents:0, numFemaleStudents:0,__v:0,createdAt:0,updatedAt:0,students:0,teacher:0,currentCapacity:0});
    return res.status(200).json(Classes);
  } catch (error) {
    next(error);
  }
};

