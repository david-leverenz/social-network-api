const Thought = require('../models/Thought');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
   // Create a new thought.
   async createThought(req, res) {
    try {
        const thoughtData = await Thought.create(req.body);
        res.json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
},
    }