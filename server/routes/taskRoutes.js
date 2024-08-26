const express = require('express');
const { createTask , getTasks , updateTask} = require('../controllers/taskController');
const router = express.Router();

// Route to create a new task
router.post('/tasks', createTask);

// Route to get all tasks
router.get('/tasks', getTasks);

// Route to update task 
router.put('/tasks/:id', updateTask);

module.exports = router;
