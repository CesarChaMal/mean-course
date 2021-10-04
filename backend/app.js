const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const app = express();

mongoose
  // .connect("mongodb+srv://root:admin@cluster0-69rn9.mongodb.net/node-angular?retryWrites=true&w=majority")
  .connect("mongodb+srv://root:admin@cluster0-69rn9.mongodb.net/node-angular", { useNewUrlParser: true } )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// app.use(express.static("mean-course"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
module.exports = app;

// "E:\IdeaProjects\mean-course\mongodb-win32-x86_64-2012plus-4.2.1\bin\mongo.exe" "mongodb+srv://cluster0-69rn9.mongodb.net/test"  --username root -p 'admin'
// ./mongo "mongodb+srv://cluster0-69rn9.mongodb.net/test"  --username root -p 'admin'

