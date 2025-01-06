import Expense from '../models/expenseModel.js';

// Get all expenses (for all users)
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({}); // Fetch all expenses
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new expense
export const createExpense = async (req, res) => {
    const { description, amount, category } = req.body;
    try {
        const expense = new Expense({
            user: '64f8e4b1c7a9f8a1f8e4b1c7', // Hardcoded user ID
            description,
            amount,
            category,
        });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an expense
export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};