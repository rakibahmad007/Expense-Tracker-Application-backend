import Expense from "../models/expenseModel.js";

// Get all expenses (for all users)
export const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const expenses = await Expense.find({ user: userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new expense
export const createExpense = async (req, res) => {
  const { description, amount, category, date } = req.body;
  try {
    const expense = new Expense({
      user: req.user.id,
      description,
      amount,
      category,
      date
    });
    console.log(expense);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an expense from the database
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const expense = await Expense.findOne({
      _id: id,
      user: userId,
    });

    await expense.deleteOne();
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }


  
};
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    // const userId = req.user.id;

    // // Find the expense and ensure it belongs to the authenticated user
    // const expense = await Expense.findOne({ _id: id, user: userId });

    // if (!expense) {
    //   return res.status(404).json({ error: "Expense not found" });
    // }

    // Update the expense
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      req.body,
      { new: true, useFindAndModify: false }
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};