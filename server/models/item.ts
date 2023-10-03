import mongoose, { Schema } from 'mongoose';

// Create a new schema
const todoItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const ItemModel = mongoose.model('todo', todoItemSchema);

export default ItemModel;
