import express from 'express';
import { updateStudent,deleteStudent,getStudent,getStudents,createStudent,getIdByName,getStudentsForm,getStudentFeesSum} from '../controllers/student.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();


router.post('/create', verifyToken, createStudent);
router.post('/update/:id',verifyToken,updateStudent);
router.delete('/delete/:id',verifyToken,deleteStudent);
router.get('/get',verifyToken,getStudents);
router.get('/get/:id',verifyToken,getStudent);
router.get('/getIdByName/:name',verifyToken,getIdByName);
router.get('/getForm',verifyToken,getStudentsForm);
router.get('/getStudentFeesSum',verifyToken,getStudentFeesSum)
export default router;