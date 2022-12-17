const { Thought, User } = require('../models');

const thoughtController = {
    //getAllThoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //getThoughtById


    //createThought


    //updateThought


    //addReaction


    //deleteThought


    //deleteReaction


};

module.exports = thoughtController;
