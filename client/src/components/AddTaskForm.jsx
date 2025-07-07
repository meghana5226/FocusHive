import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = () => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/tasks', 
        { task }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setTask('');
      alert('Task added!');
    } catch (err) {
      alert('Error adding task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        placeholder="Enter a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
