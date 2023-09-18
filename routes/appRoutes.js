const express = require("express");
const router = express.Router();
const db = require("../data/db");

router.use("/films/:film_id", async function(req,res){
    const film_id = req.params.film_id;
    try{
        const [movies,] = await db.execute(
            "SELECT * FROM movies WHERE id=?", [film_id]
        )
        const [categories, ] = await db.execute("SELECT * FROM categories");

        res.render("app/film-details",{
            title : movies.title,
            movies : movies,
            categories : categories,
            selectedCategory : null
        })
    }
    catch(err){
        console.log(err);
    }
})

router.use("/categories/:category_id",async function(req,res){
    const category_id = req.params.category_id;
    try{
        const[movies,] = await db.execute(
            "SELECT * FROM movies WHERE is_active=1 AND category_id=?", [category_id, ]
        );
        const[categories,] = await db.execute(
            "SELECT * FROM categories");

        res.render("app/category-films",{
            title : "Kategori Filmleri",
            movies : movies,
            categories : categories,
            selectedCategory : category_id
        });    
    }
    catch(err){
        console.log(err);
    }
})

router.use("/", async function(req,res){
    try{
        const [movies, ] = await db.execute("SELECT * FROM movies WHERE is_active=1 AND is_home=1");
        const [categories, ] = await db.execute("SELECT * FROM categories");
        res.render("app/index",{
            title : "All Films",
            movies : movies,
            categories : categories,
            selectedCategory : null
        });
    }
    catch(err){
        if(err){
            console.log(err);
        }
    }
    
})


module.exports = router;