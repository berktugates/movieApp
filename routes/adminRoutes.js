const express = require("express");
const router = express.Router();
const db = require("../data/db");

//MOVIE CREATE,EDIT,DELETE

// Movie Create Start
router.get("/admin/movie/create", async function(req,res){
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
});

router.post("/admin/movie/create", async function(req, res){
    const title = req.body.title;
    const description = req.body.description;
    const is_home = req.body.is_home == "on" ? 1:0;
    const is_active = req.body.is_active == "on" ? 1:0;
    const image = req.body.image;
    const category_id = req.body.category_id       
    try{
        await db.execute("INSERT INTO movies(title,description,is_home,is_active,image,category_id) VALUES(?,?,?,?,?,?)",[title,description,is_home,is_active,image,category_id]);
        res.redirect("/admin/movies");
    }
    catch(err){
        console.log(err);
    }
});
// Movie Create End

// Movie Edit Start
router.get("/admin/movie/:movieid", async function(req,res){
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
});

router.post("/admin/movie/:movieid", async function (req, res) {
    const id = req.body.movieid;
    const title = req.body.title;
    const description = req.body.description;
    const is_home = req.body.is_home == "on" ? 1 : 0;
    const is_active = req.body.is_active == "on" ? 1 : 0;
    const image = req.body.image;
    const category_id = req.body.category_id;
    try {
        await db.execute(
            "UPDATE movies SET title=?, description=?, is_home=?, is_active=?, image=?, category_id=? WHERE id=?",
            [title, description, is_home, is_active, image, category_id, id]
        );
        res.redirect("/admin/movies");
    } catch (err) {
        console.log(err);
    }
});

// Movie Edit End

// Movie Delete Start
router.get("/admin/movie/delete/:movieid", async function(req, res){
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
});

router.post("/admin/movie/delete/:movieid", async function(req, res){
    const id = req.params.movieid;
    try{
        await db.execute("DELETE FROM movies WHERE id=?", [id]);
        res.redirect("/admin/movies");
    }
    catch(err){
        console.log(err);
    }
})
// Movie Delete End

// Movies List
router.get("/admin/movies", async function(req,res){
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
});

//####################################################################################

// CATEGORY CREATE,EDIT,DELETE

// Create Category Start
router.get("/admin/category/create", async function(req,res){
    try{
        res.render("admin/create-category")
    }
    catch(err){
        console.log(err)
    }
});

router.post("/admin/category/create", async function(req,res){
    const name = req.body.name;
    try{
        await db.execute("INSERT INTO categories(name) VALUES(?)",[name]);
        res.redirect("/admin/categories")
    }
    catch(err){
        console.log(err);
    }
});
// Create Category End

// Edit Category Start
router.get("/admin/category/:category_id", async function(req,res){
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
});

router.post("/admin/category/:category_id", async function(req,res){
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
});
// Edit Category End

// Delete Category Start
router.get("/admin/category/delete/:category_id",async function(req,res){
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
})

router.post("/admin/category/delete/:category_id", async function(req,res){
    const id = req.params.category_id;
    try{
        await db.execute("DELETE FROM categories WHERE id=?",[id]);
        res.redirect("/admin/categories")
    }
    catch(err){
        console.log(err);
    }
})
// Delete Category End

// Category List Start
router.get("/admin/categories", async function(req,res){
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
})
// Category List End
module.exports = router;