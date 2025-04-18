const express = require("express");
const knex = require("../database.js"); 
const router = express.Router();

router.get("/projects", (req, res) => {
  knex
    .select()
    .table("projects")
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch projects" });
    });
});

router.post("/projects", (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.start_date ||
    !req.body.due_date
  ) {
    res.status(400).send("Missing information");
  }

  knex("projects")
    .insert(req.body)
    .then((project) => {
      res.status(201).send("project created");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("failed to create project");
    });
});

router.put("/projects/:id", (req, res) => {
  let data = req.body;
  const { id } = req.params;

  knex("projects")
    .where({ id })
    .update(data)
    .then(() => {
      res.status(201).send("project updated");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("failed to update project");
    });
});

router.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  knex("projects")
    .where({ id })
    .delete()
    .then(() => {
      res.status(200).send("project deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("failed to delete project");
    });
});

module.exports = router;
