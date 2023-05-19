const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const users = await Thought.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // Get a single thought
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v'); //selects the reactionCount virtual 
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new user
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete a user and associated thoughts
    async removeThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
      
        res.json({ message: 'Thought deleted!' })
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Edit a User 
    async editThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          req.body,
          { new: true } // Return the updated document
        );
    
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
    
        res.json({ message: 'Thought updated successfully', thought });
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
};
