const router = require("express").Router();

//Import user-controller functions

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  addFriend,
  deleteUser,
  deleteFriend,
} = require("../../controllers/user-controller");


// User routes
router
    .route("/")
    .get(getAllUsers)
    .post(createUser);


// User :id routes
router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

    
// User :id friends :id routes
router
    .route("/:id/friends/:friendId")
    .put(addFriend)
    .delete(deleteFriend);


module.exports = router;
