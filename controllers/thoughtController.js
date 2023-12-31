// This page defines what happens for each route defined in the thoughtRoutes.js
const {Thought, User} = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new thought.
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);

            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $push: { thoughts: thoughtData._id}},
                { new: true}
            );
            if(!userData){
                return res.status(404).json({message: "No user with this ID!"})
            }
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single thought.
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought.
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { new: true, runValidators: true });


            if (!thoughtData) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a thought.
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            res.status(200).json(thoughtData)
        } catch (err) {
            res.status(500).json(err);
        }

    },
    // Add a reaction to a thought.
    async addThoughtReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!reaction) {
                return res.status(404).json({ message: "No thought with that ID :(" })
            }
            res.json(reaction)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove reaction to a thought.
    async removeThoughtReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}