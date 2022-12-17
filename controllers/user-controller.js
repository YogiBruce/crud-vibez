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
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //createUser
 createUser({ body }, res){
    User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
 }
  //updateUser

  //deleteUser

  //addFriend

  //deleteFriend
};

module.exports = userController;
