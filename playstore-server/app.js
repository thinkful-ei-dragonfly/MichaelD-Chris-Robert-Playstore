/* eslint-disable quotes */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(morgan("common"));
//Express 4.x command for asynch operation


const playstore = require("./playstore.js");

app.get("/apps", (req, res) => {
  const { sort, genres } = req.query;

  let results = playstore;

  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res.status(400).send("Sort must be one of Rating or App");
    }
  }

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  if (genres) {
    if (
      ["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genres
      )
    ) {
      results = playstore.filter(application => {
        return application.Genres.includes(genres);
      });
    } else {
      res.status(400).send("please enter a valid genre");
    }
  }

  res.json(results);
});

module.exports = app;