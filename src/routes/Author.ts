import express from 'express';
import controller from '../controller/Author';
import { ValidateJoi, Shcemas } from '../middleware/ValidateSchema';

const router = express.Router();

// Create author
router.post('/create', ValidateJoi(Shcemas.author.create), controller.creatAuthor);

// Get author
router.get('/get/:authorId', controller.readAuthor);

// Get all authors
router.get('/get/', controller.readAllAuthor);

// Update author
router.patch('/update/:authorId', ValidateJoi(Shcemas.author.update), controller.updateAuthor);

// Delete author
router.delete('/delete/:authorId', controller.deleteAuthor);

export = router;