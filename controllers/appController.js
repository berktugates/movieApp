const express = require("express");
const db = require("../data/db");

exports.selectedFilm = async function(req,res){
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
}

exports.selectedCategory = async function(req,res){
    const category_id = req.params.category_id;
    try{
        const[movies,] = await db.execute(
            "SELECT * FROM movies WHERE is_active=1 AND category_id=?", [category_id, ]
        );
        const[categories,] = await db.execute(
            "SELECT * FROM categories");

        res.render("app/category-films",{
            title : "Category Films",
            movies : movies,
            categories : categories,
            selectedCategory : category_id
        });    
    }
    catch(err){
        console.log(err);
    }
}

exports.allFilms = async function(req,res){
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
    
}