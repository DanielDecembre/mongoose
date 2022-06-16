const express = require('express');
const Product = require('../models/product')
const router = express.Router();


const productSeed = require('../models/productSeed.js');
router.get('/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {
        res.redirect('/product');
    });
});





/////////////////// Routes/////////



//index 

router.get('/', (req, res) => {
    Product.find({}, (error, allProduct) => {
        res.render('index.ejs', {
            product:allProduct,
        });
    });
})

//New
router.get('/new', (req, res) => {
    res.render('new.ejs');
})


//Delete
router.delete("/:id", (req,res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) =>{
        res.redirect("/products")
    })
})

//Update
router.put("/:id", (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`)
        }
    )
})


//Post/CREATE
router.post('/', (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true; 
    } else {
        req.body.completed = false;
    }
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
})

//Edit
router.get("/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render("edit.ejs", {
            product: foundProduct,
        })
    })
})


//Show
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});


//export
module.export = router