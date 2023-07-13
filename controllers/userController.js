const User = require('../models/User');

module.exports = {
    // Get all users.
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get one user by the ID.
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new user.
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user.
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err);
        }

    },
    // Update a user.
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { new: true, runValidators: true });
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err);
        }

    },
    // Add a friend.
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a friend.
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    }
};