const { Thought, User } = require("../models");

const thoughtController = {
  //getAllThoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //getThoughtById
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "__v",
      })
      .select("__v")
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({ message: "No thoughts found with this Id!" })
          : res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  //createThought

  //updateThought

  //addReaction

  //deleteThought

  //deleteReaction
};

module.exports = thoughtController;
