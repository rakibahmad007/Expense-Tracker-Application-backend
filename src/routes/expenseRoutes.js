import express from 'express';
import { getExpenses, deleteExpense, createExpense, updateExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

// Routes without authentication
router.get('/', getExpenses);
router.post('/', createExpense);
router.delete('/:id', deleteExpense);
router.put('/:id', updateExpense);




export default router;