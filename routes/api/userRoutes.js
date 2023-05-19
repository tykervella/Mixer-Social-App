const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  removeUser,
  editUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers);
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);
router.route('/:userId').delete(removeUser);
router.route('/:userId').put(editUser);


// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend)
router.route('/:userId/friends/:friendId').delete(removeFriend)

module.exports = router;

