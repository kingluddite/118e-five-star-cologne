const express = require("express");
// bring in graphql middleware
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

// models
const Cologne = require("./models/Cologne");
const User = require("./models/User");

// graphql
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// connect to db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => {
    console.log(`Error on start: ${err.stack}`);
    process.exit(1);
  });

mongoose.set("useCreateIndex", true);

// initialize app
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token, typeof token);
  if (token !== "null" && token !== "" && token !== undefined) {
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
  context: ({ req }) => ({ Cologne, User, currentUser: req.currentUser })
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
