const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    console.log(req.body);
    console.log(req.baseUrl);

    const user = new User ({
      email: req.body.email,
      password: hash
    });

    user.save()
    .then(result => {
      res.status(201).json({
        message: 'User created!',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

  });

});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  console.log(req.baseUrl);

  User.findOne({ email: req.body.email })
  .then(user => {
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    console.log(req.body.password);
    console.log(user.password);
    console.log(bcrypt.compare(req.body.password, user.password));
    return bcrypt.compare(req.body.password, user.password);
  })
  .then( result => {
    console.log(result);
    if (result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign( {email: user.email, userId: user._id}, "secret_this_should_be_longer", {expiresIn: "1h"} );
    console.log(token);
    res.status(200).json({
      token: token
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "Auth failed"
    });
  });

});

module.exports = router;
