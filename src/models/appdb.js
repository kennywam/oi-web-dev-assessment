const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "my_cms_db";

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connect to MongoDB
client.connect();

const app = express();
app.use(express.json());
app.use(passport.initialize());

// Define a User model
const User = {
  username: "admin",
  password: "password123",
};

// Configure Passport.js for local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === User.username && password === User.password) {
      return done(null, User);
    } else {
      return done(null, false, { message: "Invalid username or password" });
    }
  })
);

// Generate JWT token
function generateToken(user) {
  return jwt.sign(user, "secret_key", { expiresIn: "1h" });
}

// Verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

// Create a new post
app.post("/posts", verifyToken, async (req, res) => {
  try {
    const db = client.db(dbName);
    const postsCollection = db.collection("posts");
    const result = await postsCollection.insertOne(req.body);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const db = client.db(dbName);
    const postsCollection = db.collection("posts");
    const posts = await postsCollection.find().toArray();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single post by ID
app.get("/posts/:id", async (req, res) => {
  try {
    const db = client.db(dbName);
    const postsCollection = db.collection("posts");
    const post = await postsCollection.findOne({
      _id: ObjectId(req.params.id),
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post by ID
app.put("/posts/:id", verifyToken, async (req, res) => {
  try {
    const db = client.db(dbName);
    const postsCollection = db.collection("posts");
    const result = await postsCollection.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.modifiedCount === 1) {
      res.json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post by ID
app.delete("/posts/:id", verifyToken, async (req, res) => {
  try {
    const db = client.db(dbName);
    const postsCollection = db.collection("posts");
    const result = await postsCollection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    if (result.deletedCount === 1) {
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = generateToken({ username: user.username });
    return res.json({ token });
  })(req, res, next);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
