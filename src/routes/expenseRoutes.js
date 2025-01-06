import { Router } from 'express';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/')
    .post(protect, createExpense)
    .get(protect, getExpenses);

router.route('/:id')
    .put(protect, updateExpense)
    .delete(protect, deleteExpense);

export default router;
