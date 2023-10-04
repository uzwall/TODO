
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoItemsRoutes from './routes/todoItems';
import cors from 'cors';


dotenv.config();

const app = express();

// Use express.json() to parse JSON requests
app.use(express.json());

// Port
const PORT: number = parseInt(process.env.PORT as string, 10) || 5500;

//use cors
app.use(cors())

// Use routes 
app.use('/api', todoItemsRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECT as string)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err));



// Connect to the server
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
