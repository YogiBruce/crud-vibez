const router = require("express").Router();

//Import thought-controller functions

const {
getAllThoughts,
getThoughtsById,
createThought,
updateThought,
addReaction,
deleteThought,
deleteReaction
} = require("../../controllers/thought-controller");


// Thought routes

//Thought :id routes

//Thought :userId routes

//Thought :thoughtId reactions routes

//Thought :thoughtId :reactionId routes

module.exports = router