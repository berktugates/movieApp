const express = require("express");
const router = express.Router();
const fs = require("fs");
const imageUpload = require("../helpers/image-upload");
const adminController = require("../controllers/adminController");
//MOVIE CREATE,EDIT,DELETE

// Movie Create Start
router.get("/admin/movie/create", adminController.createMovieGet);

router.post("/admin/movie/create", imageUpload.upload.single("image"),adminController.createMoviePost);
// Movie Create End

// Movie Edit Start
router.get("/admin/movie/:movieid", adminController.editMovieGet);

router.post("/admin/movie/:movieid", imageUpload.upload.single("image"), adminController.editMoviePost);
// Movie Edit End

// Movie Delete Start
router.get("/admin/movie/delete/:movieid", adminController.deleteMovieGet);

router.post("/admin/movie/delete/:movieid", adminController.deleteMoviePost)
// Movie Delete End

// Movies List
router.get("/admin/movies", adminController.movieListGet);

//####################################################################################

// CATEGORY CREATE,EDIT,DELETE

// Create Category Start
router.get("/admin/category/create", adminController.createCategoryGet);

router.post("/admin/category/create", adminController.createCategoryPost);
// Create Category End

// Edit Category Start
router.get("/admin/category/:category_id", adminController.editCategoryGet);

router.post("/admin/category/:category_id", adminController.editCategoryPost);
// Edit Category End

// Delete Category Start
router.get("/admin/category/delete/:category_id", adminController.deleteCategoryGet);

router.post("/admin/category/delete/:category_id", adminController.deleteCategoryPost);
// Delete Category End

// Category List Start
router.get("/admin/categories", adminController.categoryListGet);
// Category List End

router.get("/admin", adminController.admin);
module.exports = router;