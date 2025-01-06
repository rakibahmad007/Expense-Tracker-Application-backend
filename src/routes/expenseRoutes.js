import express from 'express';
import { getExpenses, deleteExpense, createExpense } from '../controllers/expenseController.js';

const router = express.Router();

// Routes without authentication
router.get('/', getExpenses);
router.post('/', createExpense);
router.delete('/:id', deleteExpense);

export default router;