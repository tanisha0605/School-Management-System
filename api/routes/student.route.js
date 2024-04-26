import express from 'express';
import { updateStudent,deleteStudent,getStudent,getStudents,createStudent} from '../controllers/student.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();


router.post('/create', verifyToken, createStudent);
router.post('/update/:id',verifyToken,updateStudent);
router.delete('/delete/:id',verifyToken,deleteStudent);
router.get('/get',verifyToken,getStudents);
router.get('/get/:id',verifyToken,getStudent);

export default router;