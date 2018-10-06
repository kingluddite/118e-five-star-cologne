const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

// models
const Cologne = require('./models/Cologne');
const User = require('./models/User');

// bring in graphql middleware
const { ApolloServer } = require('apollo-server-express');

// graphql
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// connect to db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB connected'))
  .catch(err => {
    console.log('Error on start: ' + err.stack);
    process.exit(1);
  });

mongoose.set('useCreateIndex', true);

// initialize app
const app = express();

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token, typeof token);
  if (token !== 'null') {
    try {
      // add currentuser to the request object
      req.currentUser = await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

// create apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Cologne, User, currentUser: req.currentUser }),
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
