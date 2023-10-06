import React, { useEffect, useState } from 'react';
import './TodoForm.css';
import axios from 'axios';


function TodoForm() {
  const [name, setName] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [lists, setLists] = useState<any[]>([]);
  const [itemIdToUpdate, setItemIdToUpdate] = useState<string | undefined>(undefined); // Initialize itemIdToUpdate
  const [isUpdating, setIsUpdating] = useState(false);
  const [filter, setFilter] = useState<string>('all'); // Initialize filter



  useEffect(() => {
    // Fetch all items from the database using useEffect
    const getLists = async () => {
      axios.get("http://node-api:3300/api/items")
      .then((res) => {
        setLists(res.data);
        console.log("Data has been received!");
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
    getLists();
  }, []); 

  const handleEdit =  (itemId: string)  => {
    // Find item to update
    const itemToUpdate = lists.find((list) => list._id === itemId);

    // Set form fields to item values
    setName(itemToUpdate?.name);
    setShortDescription(itemToUpdate?.shortDescription);
    setDate(itemToUpdate?.date.substring(0, 10));
    setTime(itemToUpdate?.time);
    setItemIdToUpdate(itemId);
    setIsUpdating(true);
    
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = {
      name,
      shortDescription,
      date,
      time,
    };
  
    if (isUpdating) {
      // Update existing item
      axios
        .put(`http://node-api:3300/api/item/${itemIdToUpdate}`, formData)
        .then((res) => {
          const updatedLists = lists.map((list) => {
            if (list._id === itemIdToUpdate) {
              // Replace the old data with the new data
              return res.data;
            }
            return list;
          });
      
          setLists(updatedLists);
          setName("");
          setShortDescription("");
          setDate("");
          setTime("");
          setIsUpdating(false);
          setItemIdToUpdate(undefined);
          
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data:", error);
        });
    } else {
      // Add new item
      axios
        .post("http://node-api:3300/api/item", formData)
        .then((res) => {
          // Handle success
          // Reset form fields
          setLists([...lists, res.data]);
          setName("");
          setShortDescription("");
          setDate("");
          setTime("");
          
        })
        .catch((error) => {
          // Handle error
          console.error("Error submitting data:", error);
        });
    }
  };
  
  //for To delete data from the database
  const handleDelete = (id: any) => {
    axios
      .delete(`http://node-api:3300/api/item/${id}`)
      .then((res: any) => {
        console.log('Data successfully deleted!', res.data);
        setLists(lists.filter((list) => list._id !== id));
      })
      .catch((err: any) => {
        console.error('Error deleting data:', err);
      });
  };

  //for To update the checkbox
  const handleCheckboxChange = (itemId: string) => {
    // Find the item by ID
    const updatedLists = lists.map((list) => {
      if (list._id === itemId) {
        // Toggle the 'completed' property
        return { ...list, completed: !list.completed };
      }
      return list;
    });
    setLists(updatedLists);
  };
  //filtering the data
  const filteredLists = lists.filter((list) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'upcoming') {
      return !list.completed;
    } else if (filter === 'done') {
      return list.completed;
    }
    return true;
  });


  return (
    <div className="todo-form-container">
      <h1>TODO LIST</h1>
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
        <button type="submit"  >{isUpdating ? "Update" : "Add"}</button>
      </form>
      
      <div className="filter-buttons">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="upcoming">Upcoming</option>
              <option value="done">Done</option>
            </select>
      </div>
        
          {filteredLists.map((list) => ( 
             
            <div className="todo-listItems" >
            <div className="todo-list" key={list._id}>
          
            <input
              className="custom-checkbox"
              type="checkbox"
              checked={list.completed}
              onChange={() => handleCheckboxChange(list._id)}
            />
              <div className="list1">
                <p className="item-description">{list.shortDescription}</p>

                <div className="list-details">
                  <p className="item-name">{list.name}</p>
                  <p className="item-date">{list.date.substring(0, 10)}</p>
                  <p className="item-time">{list.time}</p>
                </div>
              </div>
              <div className="list2">
                <button className="update-item" onClick={()=>{handleEdit(list._id)}}>Edit</button>
                <button className="delete-item" onClick={()=>{handleDelete(list._id)}}>Delete</button>
              </div>
            </div>
            </div>
          ))}
        
      
    </div>
  );
}

export default TodoForm;
