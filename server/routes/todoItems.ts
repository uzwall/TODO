import express from 'express';
import ItemModel from '../models/item'; // Import your Mongoose model here

const router = express.Router();

// Create a new item
router.post('/item', async (req, res) => {
  try {
    const { name, shortDescription, date, time } = req.body;

    if (!name || !shortDescription || !date || !time) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newItem = new ItemModel({
      name,
      shortDescription,
      date,
      time,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all items
router.get('/items', async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Delete an item
router.delete('/item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ItemModel.findByIdAndDelete(id);
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an item
router.put('/item/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, shortDescription, date, time } = req.body;

    if (!name || !shortDescription || !date || !time) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const updatedItem = await ItemModel.findByIdAndUpdate(
      id,
      { name, shortDescription, date, time },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



export default router;
