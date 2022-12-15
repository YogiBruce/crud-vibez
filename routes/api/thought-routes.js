const router = require("express").Router();

//Import thought-controller functions

const {
getAllThoughts,
getThoughtById,
createThought,
updateThought,
addReaction,
deleteThought,
deleteReaction
} = require("../../controllers/thought-controller");


// Thought routes
router
    .route("/")
    .get(getAllThoughts);


//Thought :id routes
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//Thought :userId routes
router
    .route("/:userId")
    .post(createThought);


//Thought :thoughtId reactions routes
router
    .route("/:thoughtId/reactions")
    .post(addReaction);


//Thought :thoughtId :reactionId routes
router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);


module.exports = router;