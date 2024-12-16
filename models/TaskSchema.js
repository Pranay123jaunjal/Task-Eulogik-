const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  stage: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do' },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
});

module.exports = mongoose.model('Task', TaskSchema);
