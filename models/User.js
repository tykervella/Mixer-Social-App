const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true, 
      unique: true,
      trim: true,

    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/, // Regular expression to validate email format
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Create a virtual property 'friendCount'
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
  .set(function (v) {
    const count = v
    this.set(count);
  });


// Initialize our User model
const User = model('User', userSchema);

const handleError = (err) => console.error(err);

User.find({})
  .exec()
  .then(async (collection) => {
    if (collection.length === 0) {
      const usersData = [
        {
          username: 'user1',
          email: 'user1@example.com',
        },
        {
          username: 'user2',
          email: 'user2@example.com',
        },
        {
          username: 'user3',
          email: 'user3@example.com',
        },
      ];
      
      const results = await User.insertMany(usersData);
      return console.log('Users inserted', results);
    }
    return console.log('Already populated');
  })
  .catch((err) => handleError(err));


module.exports = User;
