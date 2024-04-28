import express from 'express';
import { createTeacher,updateTeacher,deleteTeacher,getTeacher,getTeachers,getIdByName,getTeachersForm,getTeacherSalariesSum} from '../controllers/teacher.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create', verifyToken, createTeacher);
router.post('/update/:id',verifyToken,updateTeacher);
router.delete('/delete/:id',verifyToken,deleteTeacher);
router.get('/get',verifyToken,getTeachers);
router.get('/get/:id',verifyToken,getTeacher);
router.get('/getIdByName/:name',verifyToken,getIdByName);
router.get('/getForm',verifyToken,getTeachersForm);
router.get('/getTeacherSalariesSum',verifyToken,getTeacherSalariesSum);

export default router;