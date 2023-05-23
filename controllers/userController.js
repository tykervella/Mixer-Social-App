const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated thoughts
  async removeUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // finds all thoughts with associated _id and deletes them 
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Edit a User 
  async editUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true } // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
  
      res.json({ message: 'User updated successfully', user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Adding friend with :friendId to user with :userId's friendlist
  async addFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // pushes userId for the friend you are adding to the friends array within associated userId model 
      user.friends.push(req.params.friendId);
      await user.save(); // saves the document with friend data added 
  
      res.json({ message: 'Added a new friend', user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Removing friend with :friendId to user with :userId's friendlist
  async removeFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      // gets index from friend array of the matching element to the friendId 
      const friendIdIndex = user.friends.indexOf(req.params.friendId);
      if (friendIdIndex === -1) {
        return res.status(404).json({ message: 'Friend not found' });
      }
      
      // removes the associated indexed location from friends array and then saves the userId document with the new friend array
      user.friends.splice(friendIdIndex, 1);
      await user.save();
  
      res.json({ message: 'Removed friend', user });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
};
