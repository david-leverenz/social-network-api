const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    // username and email need to be unique and populated.  They are also trimmed to make sure no leading/trailing spaces are added to the database
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      // Below is a regex to validate the email address.
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    // Thoughts and friends are, essentially, foreign keys in this model.  One user can have many friends and thoughts.
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
  },
  {
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual('friendCount').get(function () {
  return `${this.friends.length}`;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
