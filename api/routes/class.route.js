import express from 'express';
import { deleteClass,updateClass,getClass,getClasses,createClass, getClassIdByName} from '../controllers/class.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post('/create', verifyToken, createClass);
router.post('/update/:id',verifyToken,updateClass);
router.delete('/delete/:id',verifyToken,deleteClass);
router.get('/get',verifyToken,getClasses);
router.get('/get/:id',verifyToken,getClass);
router.get('/getIdByName/:name',verifyToken,getClassIdByName);

export default router;