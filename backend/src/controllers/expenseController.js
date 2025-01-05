// filepath: /backend/src/controllers/expenseController.js
const Expense = require('../models/expenseModel');

exports.createExpense = async (req, res) => {
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
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { description, amount, category } = req.body;
    try {
        const expense = await Expense.findByIdAndUpdate(
            id,
            { description, amount, category },
            { new: true }
        );
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};