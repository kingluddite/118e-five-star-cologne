const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/* new with apollo 2 */
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { ObjectID } = require('mongoose').mongo.ObjectID;

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  ObjectID: new GraphQLScalarType({
    name: 'ObjectID',
    description:
      'The `ObjectID` scalar type represents a [`BSON`](https://en.wikipedia.BSON) commonly used in `mongodb`',
    serialize(_id) {
      if (_id instanceof ObjectID) {
        return _id.toHexString();
      }
      if (typeof _id === 'string') {
        return _id;
      }
      throw new Error(
        `${Object.getPrototypeOf(_id).constructor.name} not convertible to `
      );
    },
    parseValue(_id) {
      if (typeof _id === 'string') {
        return ObjectID.createFromHexString(_id);
      }
      throw new Error(`${typeof _id} not convertible to ObjectID`);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ObjectID.createFromHexString(ast.value);
      }
      throw new Error(`${ast.kind} not convertible to ObjectID`);
    },
  }),

  Query: {
    // colognes

    getAllColognes: async (root, args, { Cologne }) => {
      const allColognes = await Cologne.find().sort({
        createdDate: 'desc',
      });
      return allColognes;
    },

    getCologne: async (root, { _id }, { Cologne }) => {
      const cologne = await Cologne.findOne({ _id });
      return cologne;
    },

    // user

    getCurrentUser: async (root, args, { currentUser, User }) => {
      // do we have a currentUser
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username,
      }).populate({
        path: 'favorites',
        model: 'Cologne',
      });
      return user;
    },
  },

  Mutation: {
    addCologne: async (
      root,
      { scentName, scentPrice, description, username },
      { Cologne }
    ) => {
      const newCologne = await new Cologne({
        scentName,
        scentPrice,
        description,
        username,
      }).save();

      return newCologne;
    },

    signinUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      // check to make sure password matches with user that is found
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      // all good? return token
      return { token: createToken(user, process.env.SECRET, '1hr') };
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      // check if user already exists
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      // user doesn't exist, create one
      const newUser = await new User({
        username,
        email,
        password,
      }).save();

      return { token: createToken(newUser, process.env.SECRET, '1hr') };
    },
  },
};
