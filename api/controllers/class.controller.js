import Class from '../models/class.model.js';
import { errorHandler } from '../utils/error.js';
export const createClass = async (req, res, next) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (req, res, next) => {
  const Class = await Class.findById(req.params.id);

  if (!Class) {
    return next(errorHandler(404, 'Class not found!'));
  }
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json('Class has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (req, res, next) => {
  const Class= await Class.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
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
    const Class = await Class.findById(req.params.id).populate('students').populate('teacher');
    if (!Class) {
      return next(errorHandler(404, 'Class not found!'));
    }
    res.status(200).json(Class);
  } catch (error) {
    next(error);
  }
};

export const getClassIdByName = async (req, res, next) => {
  try {
    const className = req.params.name;
    const classData = await Class.findOne({ name: className });
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
