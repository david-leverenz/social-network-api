const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction') // requiring the Reaction model

// Schema to create Thought model.
const thoughtSchema = new Schema(
  {
    thoughtText: {
      // This field needs to be populated and has to be between 1 and 280 characters.
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true
    },
    // Pulling the reactions schema into the table.  One thought can have many reactions.
    reactions: [reactionSchema]
  },
  {
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a function to return reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
