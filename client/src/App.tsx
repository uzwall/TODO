import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TodoForm />} />
      {/* Add more routes as needed */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
