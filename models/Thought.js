const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
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
    reactions: [reactionSchema]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a function that formats the timestamp for later use in a query.

thoughtSchema.virtual('formattedTimestamp').get(function () {
  return this.createdAt.toLocaleString("MM-DD-YYYY");
});



// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
