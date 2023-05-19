const { Schema, model } = require('mongoose');

  const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

  
  const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return new Date(timestamp).toLocaleString(); // Format the timestamp however you want
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  });
  
  thoughtSchema  
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
     })
  .set(function (v) {
    const count = v
    this.set(count);
  });
  
  const Thought = model('Thought', thoughtSchema);

  const handleError = (err) => console.error(err);

Thought.find({})
  .exec()
  .then(async (collection) => {
    if (collection.length === 0) {
      const thoughtsData = [
        {
          username: 'user1',
          thoughtText: 'String of Text goes here',
        },
        {
          username: 'user2',
          thoughtText: 'String of Text goes here',
        },
        {
          username: 'user1',
          thoughtText: 'String of Text goes here',
        },
        {
          username: 'user4',
          thoughtText: 'String of Text goes here',
        },
        {
          username: 'user1',
          thoughtText: 'String of Text goes here',
        },
        {
          username: 'user2',
          thoughtText: 'String of Text goes here',
        },
      ];
      
      const results = await Thought.insertMany(thoughtsData);
      return console.log('Thoughts inserted', results);
    }
    return console.log('Already populated');
  })
  .catch((err) => handleError(err));

  
  module.exports = Thought;