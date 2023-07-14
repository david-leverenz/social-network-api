const Thought = require('../models/Thought');

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
            const thoughtData = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId },{$set: req.body }, {new: true, runValidators: true});
            
       
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
}