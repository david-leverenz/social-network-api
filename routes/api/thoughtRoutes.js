// All routes for thoughts are defined in this file.  Because I am performing different types of methods for some, I can use the same route for multiple functions.
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts - used for getting all thoughts and creating a thought.
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId - for getting thoughts by id and changing or deleteing them.
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions - used to add a thought reaction.
router.route('/:thoughtId/reactions').post(addThoughtReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId - provides ability to delete a reaction.
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

module.exports = router;