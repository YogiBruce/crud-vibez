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

  //createUser

  //updateUser

  //deleteUser

  //addFriend

  //deleteFriend
};

module.exports = userController;
