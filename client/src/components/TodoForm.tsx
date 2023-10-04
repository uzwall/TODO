import React, { useEffect, useState } from 'react';
import './TodoForm.css';
import axios from 'axios';

function TodoForm() {
  const [name, setName] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      name,
      shortDescription,
      date,
      time,
    };

    axios
      .post('http://localhost:3300/api/item', formData)
      .then((res: any) => {
        console.log('Data Added Successfully!');
        console.log('Data successfully submitted:', res.data);
      })
      .catch((err: any) => {
        console.error('Error submitting data:', err);
      });

    // Reset form fields after submission
    setName('');
    setShortDescription('');
    setDate('');
    setTime('');
  };

  const [lists, setLists] = useState<any[]>([]);

  // Create a function to fetch all items from the database using useEffect
  useEffect(() => {
    axios.get("http://localhost:3300/api/items")
      .then((res) => {
        console.log('Data fetched successfully!');
        setLists(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  //create function to add item to database
  //create function to delete item from database
  //create function to update item from database

  return (
    <div className="todo-form-container">
      <h2>Todo List</h2>
      <form className="todo-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="shortDescription">Short Description:</label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={shortDescription}
            onChange={(event) => setShortDescription(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
      
        
          {lists.map((list) => (
            <div className="todo-listItems">
            <div className="todo-list">
            <div key={list.id}>
              <input className="custom-checkbox" type="checkbox" />
              <div className="list1">
                <p className="item-description">{list.shortDescription}</p>

                <span>
                  <p className="item-name">{list.name}</p>
                  <p className="item-date">{list.date}</p>
                  <p className="item-time">{list.time}</p>
                </span>
              </div>
              <div className="list2">
                <button className="update-item">Edit</button>
                <button className="delete-item">Delete</button>
              </div>
            </div>
            </div>
            </div>
          ))}
        
      
    </div>
  );
}

export default TodoForm;
