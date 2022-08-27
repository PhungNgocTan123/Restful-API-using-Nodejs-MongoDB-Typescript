import express from 'express';
import controller from '../controller/User';
import { ValidateJoi, Shcemas } from '../middleware/ValidateSchema';

const router = express.Router();

// Register
router.post('/register', ValidateJoi(Shcemas.author.create), controller.register);

// Login
router.post('/login', controller.login);


export = router;