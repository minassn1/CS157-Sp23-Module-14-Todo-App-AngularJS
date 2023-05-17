const express = require("express");
const Todo = require("../models/todo.js");
const authUser = require("../middleware/authUser.js");
const adminRole = require("../middleware/adminRole.js");

const router = express.Router();

// The 4 CRUD operations for this task app (Create, Read, Update, Delete) => (POST, GET, PATCH, DELETE)

// GET (Read All Tasks)
// /api/todos/?filter={"task":"study"}&select={"task":1}&sort={"task":1}&skip=10&limit=10
router.get("/", authUser, (req, res) => {
  if (req.query.filter) {
    req.query.filter = JSON.parse(req.query.filter);
  }

  if (req.query.select) {
    req.query.select = JSON.parse(req.query.select);
  }

  if (req.query.sort) {
    req.query.sort = JSON.parse(req.query.sort);
  }

  let skip;
  if (req.query.skip) {
    skip = parseInt(req.query.skip);
  }

  let limit;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  
  Todo.find(req.query.filter)
      .select(req.query.select)
      .sort(req.query.sort)
      .skip(skip)
      .limit(limit)
    .exec(function(err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(500).send(err);
    }
  })
});

// GET (Read One Task)
router.get("/:id", authUser, (req, res) => {
  Todo.findById(req.params.id, function(err, result) {
    if (!err) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Not Found!");
      }
    } else {
      res.status(500).send(err);
    }
    
  })
})


// POST (Create new Task)
router.post("/", authUser, (req, res) => {
  let newTask = new Todo(req.body);

  newTask.save(function(err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(400).send(err);
    }
  })
})

// PATCH (Update a Task)
router.patch("/:id", authUser, (req, res) => {
  Todo.findByIdAndUpdate(
    req.params.id, // The id of the document
    req.body, // The object that contains the changes
    {
      new: true, // return the updated object
      runValidators: true // make sure the updates are validated against the schema
    },
    function(err, result) {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(400).send(err);
      }
    }
  )
})

// DELETE (Delete a Task)

router.delete("/:id",authUser, (req, res) => {
  Todo.findByIdAndDelete(req.params.id, function(err, result) {
    if (!err) {
      res.status(200).send(result);
    } else {
      res.status(400).send(err);
    }
  })
})

module.exports = router;