const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages for admin
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

// Create new message (contact form)
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    res.status(400).json({ message: 'Error sending message', error: error.message });
  }
});

// Mark message as read
router.put('/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id, 
      { isRead: true }, 
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error updating message', error: error.message });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
});

// Get unread messages count
router.get('/unread/count', async (req, res) => {
  try {
    const count = await Message.countDocuments({ isRead: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unread count', error: error.message });
  }
});

module.exports = router;


