import express from 'express';
import controller from '../controller/Author';

const router = express.Router();

// Create author
router.post('/create', controller.creatAuthor);

// Get author
router.get('/get/:authorId', controller.readAuthor);

// Get all authors
router.get('/get/', controller.readAllAuthor);

// Update author
router.patch('/update/:authorId', controller.updateAuthor);

// Delete author
router.delete('/delete/:authorId', controller.deleteAuthor);

