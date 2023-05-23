const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  removeThought,
  editThought,
  addReaction,
  removeReaction
} = require('../../controllers/thotController');

// /api/thoughts/
router.route('/').get(getThoughts);
router.route('/').get(getThoughts).post(createThought);


// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought);
router.route('/:thoughtId').delete(removeThought);
router.route('/:thoughtId').put(editThought);


// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);



module.exports = router;
