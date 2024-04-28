import Teacher from '../models/teacher.model.js';
import Class from '../models/class.model.js';
import { errorHandler } from '../utils/error.js';

export const createTeacher = async (req, res, next) => {
  try {
    const className = req.body.assignedClass;

    const foundClass = await Class.findOne({ name: className });
    if (!foundClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    const newTeacher = await Teacher.create({
      ...req.body,
      assignedClass: foundClass
    });

    // Update the class with the newly created teacher
    foundClass.teacher = newTeacher._id;
    await foundClass.save();

    res.status(201).json(newTeacher);
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    // Find the teacher to be deleted
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Delete the teacher
    await Teacher.findByIdAndDelete(req.params.id);

    // Remove the teacher's ID from the associated class
    const foundClass = await Class.findOne({ teacher: req.params.id });
    if (foundClass) {
      foundClass.teacher = undefined;
      await foundClass.save();
    }

    res.status(200).json({ message: 'Teacher has been deleted' });
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (req, res, next) => {
  const teacher= await Teacher.findById(req.params.id);
  if (!teacher) {
    return next(errorHandler(404, 'Teacher not found!'));
  }
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTeacher);
  } catch (error) {
    next(error);
  }
};

export const getTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
    if (!teacher) {
      return next(errorHandler(404, 'Teacher not found!'));
    }
    res.status(200).json(teacher);
  } catch (error) {
    next(error);
  }
};

export const getTeachers = async (req, res, next) => {
  try {
    const Teachers = await Teacher.find().populate('assignedClass');
    return res.status(200).json(Teachers);
  } catch (error) {
    next(error);
  }
};
export const getIdByName = async (req, res, next) => {
  try {
    const teacherName = req.params.name;
    const teacherData = await Teacher.findOne({ name: teacherName });

    if (!teacherData) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json(teacherData._id); // Return the ID directly
  } catch (error) {
    next(error);
  }
};
export const getTeachersForm = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({}, { _id: 0,__v:0,createdAt:0,updatedAt:0,role:0});
    return res.status(200).json(teachers);
  } catch (error) {
    next(error);
  }
};

export const getTeacherSalariesSum = async (req, res, next) => {
  try {
    const result = await Teacher.aggregate([
      {
        $group: {
          _id: null,
          sum: { $sum: "$salary" }
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


