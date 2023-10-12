const express = require("express");
const router = express.Router();
const db = require("../data/db");
const appController = require("../controllers/appController");

router.get("/films/:film_id", appController.selectedFilm);

router.get("/categories/:category_id", appController.selectedCategory);

router.get("/", appController.allFilms);


module.exports = router;