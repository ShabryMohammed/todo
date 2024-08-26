const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateGiven: { type: Date, required: true },
  deadline: { type: Date, required: true },
  assignedTo: { type: String, required: true },
  priority: { type: Boolean, default: false },
  status: { type: String, enum: ['todo', 'inProgress', 'done'], default: 'todo' },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
