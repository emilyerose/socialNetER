const { User, Application } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Reaction.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  createFriend(req,res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { /*somehow need to find a user object b friend id and then add it here i think */ } },
        { runValidators: true, new: true }
      )
        .then((application) =>
          !application
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(application)
        )
        .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { userId: req.params.friendId } } },
    )
      .then((application) =>
        !application
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(application)
      )
      .catch((err) => res.status(500).json(err));
  },
};

