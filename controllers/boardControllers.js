const Board = require('../models/boardModel');

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const board = new Board({ name: req.body.name });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: 'Board deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
