const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      },
    username: {
      type: String,
      required: true,
           
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

reactionSchema.virtual('formattedTimestamp').get(function () {
  return this.createdAt.toLocaleString("MM-DD-YYYY");
});

module.exports = reactionSchema;
