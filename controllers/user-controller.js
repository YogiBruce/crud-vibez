const { User } = require("../models");

const userController = {
  //getAllUsers
  getAllUsers(req, res) {
    User.find({})
      .select("__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //getUserById
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "__v",
      })
      .populate({
        path: "friends",
        select: "__v",
      })
      .select("__v")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with this id!" })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //createUser
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //updateUser
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: req.params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json(dbUserData)
      )
      .then(() =>
        res.json({ message: `User ${User.username} has been updated` })
      )
      .catch((err) => res.status(500).json(err));
  },

  //deleteUser
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with this ID!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //addFriend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: prams.id },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .populate({
        path: "friends",
        select: "__v",
      })
      .select("__v")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  //deleteFriend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({
        path: "friends",
        select: "__v",
      })
      .select("__v")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with this ID!" })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
