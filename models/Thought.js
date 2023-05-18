const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');


  
  const thoughtSchema = new mongoose.Schema({
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
  
  const Thought = mongoose.model('Thought', thoughtSchema);
  
  module.exports = Thought;