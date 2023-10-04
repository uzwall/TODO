import React, { useState } from 'react';
import './TodoForm.css';
import axios from "axios";


function TodoForm() {
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    date: '',
    time: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to your server)
    console.log(formData);
  };

  return (
    <div className="todo-form-container">
    <h2>Todo List</h2>
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="shortDescription">Short Description:</label>
        <input
          type="text"
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit"> Add </button>
    </form>
    <div className="todo-listItems">

      <div className='todo-list'>
          <input id='custom-checkbox' type='checkbox' />
          <div className='list1'>
          <p className='item-description'>go to the park buy flower,watch,torch,rope</p>
          
          <span>
          <p className='item-name'>Name</p>
          <p className='item-date'>Date</p>
          <p className='item-time'>Time</p>
          </span>
        
          </div>
          <div className='list2'> 
          <button className='update-item'>Edit</button>
          <button className='delete-item'>Delete</button>
          </div>
        

      </div>
    </div>
  </div>
  
    
  );
}

export default TodoForm;
