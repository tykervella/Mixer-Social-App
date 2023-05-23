const { Thought } = require('../models');

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
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new thought with associated request body 
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete thought with associated ID
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
    // Edit a Thought
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

    // adding the reactionBody into the reactions array with associated thoughtId
    async addReaction(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
    
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
        // pushes req.body for new reaction to the reactions array within associated thoughtId model 
        thought.reactions.push(req.body);
        await thought.save(); // saves the document with friend data added 
    
        res.json({ message: 'Added new reaction', thought });
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // Removing reaction with :reactionId froo thought with :thoughtId in reactions 
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      // Find the index of the reaction within the reactions array
      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction.reactionId.equals(req.params.reactionId)
      );
    if (reactionIndex === -1) {
      return res.status(404).json({ message: 'Reaction not found' });
    }

    // Remove the reaction at the found index from the reactions array
    thought.reactions.splice(reactionIndex, 1);

    // Save the updated thought document
    await thought.save();
  
      res.json({ message: "Deleted reaction", thought});
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
};
