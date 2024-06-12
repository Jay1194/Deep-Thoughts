// import thought model
const { User, Thought } = require('../models');
// handle errors and have them sent back to client (mongo built-in feature)
const { AuthenticationError } = require('apollo-server-express');
//import signToken
const { signToken } = require('../utils/auth');

// will perform a .find() method on the Thought model. We're also returning the thought data in descending order, as can be seen in the .sort() method that we chained onto it.
const resolvers = {
    Query: {
        // get all thoughts
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // get a thought by username
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        me: async (parent, args, context) => {
            //check for the existence of context.user
            if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('thoughts')
            .populate('friends');

            return userData;
        }
        // If no context.user property exists, then we know that the user isn't authenticated and we can throw an AuthenticationError
        throw new AuthenticationError('Not logged in');
    },
},

    Mutation: {

        // create user
        addUser: async (parent, args) => {
            // the Mongoose User model creates a new user in the database with whatever is passed in as the args
            const user = await User.create(args);
            // add sign token
            const token = signToken(user);

            return { token, user };
        },
        // user login
        login: async (parent, { email, password }) => {

            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const token = signToken(user);
            return { token, user };
        },

        // Only logged-in users should be able to use this mutation, hence why we check for the existence of context.user first (The token includes the user's username, email, and _id properties, which become properties of context.user and can be used in the follow-up Thought.create() and User.findByIdAndUpdate() methods.)
        addThought: async (parent, args, context) => {
            if (context.user) {
                const thought = await Thought.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { thoughts: thought._id } },
                    // without the { new: true } flag in User.findByIdAndUpdate(), Mongo would return the original document instead of the updated document.
                    { new: true }
                );
                return thought;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Reactions are stored as arrays on the Thought model, so you'll use the Mongo $push operator. Because you're updating an existing thought, the client will need to provide the corresponding thoughtId. Be sure to copy the _id property from one of the test thoughts you created.
        addReaction: async (parent, {thoughtId, reactionBody }, context) => {
            if (context.user) {
                const updatedThought = await Thought.findOneAndUpdate(
                    { _id: thoughtId },
                    { $push: { reactions: { reactionBody, username: context.user.username } } }, 
                    { new: true, runValidators: true }
                );

                return updatedThought
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // looks for an incoming friendId and add that to the current user's friends array. A user can't be friends with the same person twice, though, hence why we're using the $addToSet operator instead of $push to prevent duplicate entries.
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
          }
    }
};

module.exports = resolvers;