// All routes for users are defined in this file.  Because I am performing different types of methods for some, I can use the same route for multiple functions.
const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users - get and post
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId - get, delete and update by user ID
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId - adds and removes friends by ID.
router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;