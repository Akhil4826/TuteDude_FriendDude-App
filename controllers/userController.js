const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const mongoose = require('mongoose')

const User = require('../models/user')

// register API
exports.register = [
  // Validate and sanitize fields.
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).json({ errors: errors.array() })
      return
    } else {
      // Data from form is valid.
      // Check if User with same username already exists.
      User.findOne({ username: req.body.username }).exec((err, foundUser) => {
        if (err) {
          return next(err)
        }

        if (foundUser) {
          // User exists, send error.
          res.status(400).json({ message: 'User already exists.' })
        } else {
          // User does not exist, create new user.
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              return next(err)
            }

            const user = new User({
              username: req.body.username,
              password: hashedPassword,
            }).save((err) => {
              if (err) {
                return next(err)
              }

              req.user = user

              // Successful - redirect to new user record.
              res.status(200).json({ message: 'User created successfully!' })
            })
          })
        }
      })
    }
  },
]

// login API
exports.login = [
  // Validate and sanitize fields.
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).json({ errors: errors.array() })
      return
    } else {
      // Data from form is valid.
      // Check if User with same username already exists.
      User.findOne({ username: req.body.username }).exec((err, foundUser) => {
        if (err) {
          return next(err)
        }

        if (foundUser) {
          // User exists, check password.
          bcrypt.compare(
            req.body.password,
            foundUser.password,
            (err, result) => {
              if (err) {
                return next(err)
              }

              if (result === true) {
                // Passwords match. Log user in.
                req.login(foundUser, (err) => {
                  if (err) {
                    return next(err)
                  }

                  req.user = foundUser

                  // Successful - redirect to new user record.
                  res.status(200).json({ message: 'Login successful!' })
                })
              } else {
                // Passwords do not match.
                res.status(400).json({ message: 'Incorrect password.' })
              }
            }
          )
        } else {
          // User does not exist.
          res.status(400).json({ message: 'User does not exist.' })
        }
      })
    }
  },
]

// logout API
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }

    res.status(200).json({ message: 'Logout successful!' })
  })
}

// get user if logged in
exports.getUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

// get user by id
exports.getUserById = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id)
      .populate('posts')
      .exec((err, foundUser) => {
        if (err) {
          return next(err)
        }

        if (foundUser) {
          res.status(200).json({ user: foundUser })
        } else {
          res.status(404).json({ message: 'User not found.' })
        }
      })
  } else {
    res.status(400).json({ message: 'Invalid ID.' })
  }
}

// get user by username
exports.getUserByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username }).exec((err, foundUser) => {
    if (err) {
      return next(err)
    }

    if (foundUser) {
      res.status(200).json({ user: foundUser })
    } else {
      res.status(404).json({ message: 'User not found.' })
    }
  })
}

// search user
exports.searchUser = async (req, res, next) => {
  try {
    const { q } = req.query
    const users = await User.find({
      username: { $regex: q, $options: 'i' },
    })

    if (users.length < 1) {
      res.status(404).json({ message: 'No users found.' })
      // throw new ErrorHandler(404, 'No users found.')
    } else {
      res.status(201).json({ users })
    }
  } catch (err) {
    next(err)
  }
}

// get user username by id as string
exports.getUsernameById = (req, res, next) => {
  User.findById(req.params.id).exec((err, foundUser) => {
    if (err) {
      return next(err)
    }

    if (foundUser) {
      res.status(200).json({ username: foundUser.username })
    } else {
      res.status(404).json({ message: 'User not found.' })
    }
  })
}

// get user friends
exports.getUserFriends = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .populate('friends')
    .exec((err, foundUser) => {
      if (err) {
        return next(err)
      }

      if (foundUser) {
        res.status(200).json({ friends: foundUser.friends })
      } else {
        res.status(404).json({ message: 'User not found.' })
      }
    })
}

// get user friend requests
exports.getUserFriendRequests = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .populate('friendRequests')
    .exec((err, foundUser) => {
      if (err) {
        return next(err)
      }

      if (foundUser) {
        res.status(200).json({ friendRequests: foundUser.friendRequests })
      } else {
        res.status(404).json({ message: 'User not found.' })
      }
    })
}
// unfriend API
exports.unfriend = (req, res, next) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;

  // Check if the user and friend are valid
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
    return res.status(400).json({ message: 'Invalid user or friend ID.' });
  }

  // Find the user and remove the friend from their friend list
  User.findById(userId, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user is friends with the given friend
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'You are not friends with this user.' });
    }

    // Remove friend from user's friend list
    user.friends.pull(friendId);

    // Save the updated user document
    user.save((err, updatedUser) => {
      if (err) {
        return next(err);
      }

      // Find the friend and remove the user from their friend list as well
      User.findById(friendId, (err, friend) => {
        if (err) {
          return next(err);
        }

        if (!friend) {
          return res.status(404).json({ message: 'Friend not found.' });
        }

        // Remove the user from the friend's friend list
        friend.friends.pull(userId);

        // Save the updated friend document
        friend.save((err, updatedFriend) => {
          if (err) {
            return next(err);
          }

          res.status(200).json({ message: 'Unfriended successfully!' });
        });
      });
    });
  });
};

get user posts
 exports.getUserPosts = (req, res, next) => {
   User.findOne({ username: req.params.username })
     .populate('posts')
     .exec((err, foundUser) => {
       if (err) {
         return next(err)
       }

       if (foundUser) {
         res.status(200).json({ posts: foundUser.posts })
       } else {
         res.status(404).json({ message: 'User not found.' })
       }
     })
 }



// Get friend recommendations
exports.getFriendRecommendations = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Find the logged-in user
    const user = await User.findById(userId).populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Fetch all users except the logged-in user and their current friends
    const friendsIds = user.friends.map((friend) => friend._id.toString());
    friendsIds.push(userId.toString());

    const potentialFriends = await User.find({
      _id: { $nin: friendsIds }, // Exclude self and current friends
    });

    // Calculate mutual friends for each potential friend
    const recommendations = potentialFriends.map((potentialFriend) => {
      const mutualFriends = potentialFriend.friends.filter((friend) =>
        user.friends.some(
          (userFriend) => userFriend._id.toString() === friend.toString()
        )
      );

      return {
        _id: potentialFriend._id,
        username: potentialFriend.username,
        profilePictureUrl: potentialFriend.profilePictureUrl,
        mutualFriendsCount: mutualFriends.length,
      };
    });

    // Sort recommendations by number of mutual friends (descending)
    recommendations.sort((a, b) => b.mutualFriendsCount - a.mutualFriendsCount);

    res.status(200).json({ recommendations });
  } catch (err) {
    next(err);
  }
};


// edit user profilePictureUrl
exports.changeProfilePicture = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.findByIdAndUpdate(
      req.params.id,
      { profilePictureUrl: req.body.profilePictureUrl },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          return next(err)
        }

        if (updatedUser) {
          res.status(200).json({ user: updatedUser })
        } else {
          res.status(404).json({ message: 'User not found.' })
        }
      }
    )
  } else {
    res.status(400).json({ message: 'Invalid ID.' })
  }
}
