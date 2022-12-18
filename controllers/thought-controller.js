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
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({ message: "No thoughts found with this Id!" })
          : res.json(dbThoughtData);
      })
      .catch((err) => res.status(500).json(err));
  },

  //updateThought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
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
  //addReaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId},
      { $push: { reactions: body }},
      { new: true, runValidators: true }
    )
    .populate({
      path: 'reactions',
      select: '__v'
    })
    .select('__v')
    .then((dbThoughtData) => {
      !dbThoughtData
        ? res.status(404).json({ message: "No thoughts found with this Id!" })
        : res.json(dbThoughtData);
    })
    .catch((err) => res.status(500).json(err));
  }

  //deleteThought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then((dbThoughtData) => {
      !dbThoughtData
        ? res.status(404).json({ message: "No thoughts found with this Id!" })
        : res.json(dbThoughtData);
    })
    .catch((err) => res.status(500).json(err));
  }
  
  //deleteReaction
};

module.exports = thoughtController;
