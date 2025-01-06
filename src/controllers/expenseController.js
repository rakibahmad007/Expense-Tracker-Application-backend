 
import Expense, { find, findByIdAndUpdate, findByIdAndDelete } from '../models/expenseModel';

export async function createExpense(req, res) {
    const { description, amount, category } = req.body;
    try {
        const expense = new Expense({
            user: req.user.id,
            description,
            amount,
            category
        });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function getExpenses(req, res) {
    try {
        const expenses = await find({ user: req.user.id });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updateExpense(req, res) {
    const { id } = req.params;
    const { description, amount, category } = req.body;
    try {
        const expense = await findByIdAndUpdate(
            id,
            { description, amount, category },
            { new: true }
        );
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteExpense(req, res) {
    const { id } = req.params;
    try {
        await findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}