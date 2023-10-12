const express = require("express");
const db = require("../data/db");

// MOVIE CONTROLLERS

exports.createMovieGet = async function(req,res){
    try{
        const [categories, ] = await db.execute("SELECT * FROM categories");
        res.render("admin/create-movie",{
            title : "Add Film",
            categories : categories
        })
    }
    catch(err){
        console.log(err)
    }
};

exports.createMoviePost =  async function(req, res){
    const title = req.body.title;
    const description = req.body.description;
    const is_home = req.body.is_home == "on" ? 1:0;
    const is_active = req.body.is_active == "on" ? 1:0;
    const image = req.file.filename;
    const category_id = req.body.category_id;
    const rayting = req.body.rayting;     
    try{
        await db.execute("INSERT INTO movies(title,description,is_home,is_active,image,category_id,rayting) VALUES(?,?,?,?,?,?,?)",[title,description,is_home,is_active,image,category_id,rayting]);
        res.redirect("/admin/movies");
    }
    catch(err){
        console.log(err);
    }
}

exports.editMovieGet = async function(req,res){
    const id = req.params.movieid;
    try{
        const [movies,] = await db.execute("SELECT * FROM movies WHERE id=?",[id]);
        const [categories,] = await db.execute("SELECT * FROM categories");
        res.render("admin/edit-movie",{
            title : "Edit Film",
            movies : movies,
            categories : categories
        })
    }
    catch(err){
        console.log(err);
    }
}

exports.editMoviePost = async function (req, res) {
    const id = req.body.movieid;
    const title = req.body.title;
    const description = req.body.description;
    const is_home = req.body.is_home == "true" ? 1 : 0;
    const is_active = req.body.is_active == "true" ? 1 : 0;
    let image = req.body.image;
    const rayting = req.body.rayting;
    if(req.file){
        image = req.file.filename;
        fs.unlink("/img/" + req.body.image, err=>{
            console.log(err);
        })
    }
    const category_id = req.body.category_id;
    try {
        await db.execute(
            "UPDATE movies SET title=?, description=?, is_home=?, is_active=?, image=?, category_id=?, rayting=? WHERE id=?",
            [title, description, is_home, is_active, image, category_id, rayting, id]
        );
        res.redirect("/admin/movies");
    } catch (err) {
        console.log(err);
    }
}

exports.deleteMovieGet = async function(req, res){
    const id = req.params.movieid;
    try{
        const [movies,] = await db.execute("SELECT * FROM movies WHERE id=?", [id]);
        const movie = movies[0];
        res.render("admin/delete-movie",{
            title:"Delete Movie",
            movie : movie
        });
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteMoviePost = async function(req, res){
    const id = req.params.movieid;
    try{
        await db.execute("DELETE FROM movies WHERE id=?", [id]);
        res.redirect("/admin/movies");
    }
    catch(err){
        console.log(err);
    }
}

exports.movieListGet = async function(req,res){
    try{
        const [movies, ] =  await db.execute("SELECT * FROM movies");
        res.render("admin/movies-list",{
            title:"Movies List",
            movies : movies
        });
    }
    catch(err){
        console.log(err);
    }
}

// CATEGORY CONTROLLERS

exports.createCategoryGet = async function(req,res){
    try{
        res.render("admin/create-category")
    }
    catch(err){
        console.log(err)
    }
}

exports.createCategoryPost = async function(req,res){
    const name = req.body.name;
    try{
        await db.execute("INSERT INTO categories(name) VALUES(?)",[name]);
        res.redirect("/admin/categories")
    }
    catch(err){
        console.log(err);
    }
}

exports.editCategoryGet = async function(req,res){
    const id = req.params.category_id;
    try{
        const[categories,] = await db.execute("SELECT * FROM categories WHERE id=?",[id]);
        const category = categories[0];
        res.render("admin/edit-category",{
            category : category
        });
    }
    catch(err){
        console.log(err);
    }
}

exports.editCategoryPost = async function(req,res){
    const id = req.params.category_id;
    const name = req.body.name;
    console.log(req.body);
    try{
        await db.execute("UPDATE categories SET name=? WHERE id=?",[name,id]);
        res.redirect("/admin/categories");
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteCategoryGet = async function(req,res){
    const id = req.params.category_id;
    try{
        const category = await db.execute("SELECT * FROM categories WHERE id=?", [id])
        res.render("admin/delete-category",{
            title: "Delete Category",
            category : category
        })
    }
    catch(err){
        console.log(err);
    }
}

exports.deleteCategoryPost = async function(req,res){
    const id = req.params.category_id;
    try{
        await db.execute("DELETE FROM categories WHERE id=?",[id]);
        res.redirect("/admin/categories")
    }
    catch(err){
        console.log(err);
    }
}

exports.categoryListGet = async function(req,res){
    try{
        const [categories,] = await db.execute("SELECT * FROM  categories");
        res.render("admin/categories-list",{
            title: "Category List",
            categories : categories
        })
    }
    catch(err){
        console.log(err);
    }
}

exports.admin = async function(req,res){
    try{
        res.render("admin/index")
    }
    catch(err){

    }
}