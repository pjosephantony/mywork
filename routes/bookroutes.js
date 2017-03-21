var express = require("express");
var router = express.Router();
var Book = require("../models/books");
var middleware = require("../middleware");


router.get("/books", function(req, res){

	Book.find({}, function(err, books){
		if(err){
			console.log(err);
		}else{
			res.render("books/books", {books:books});		
		}
	})

	
})

router.post("/books", middleware.isLoggedIn, function(req, res){
	Book.create(req.body.book, function(err, book){
		if(err){
			console.log(err);
		}else{
			book.user.id = req.user._id;
			book.user.username = req.user.username;
			book.save();
			//console.log(book);
			req.flash("success", "New book Added!!");
			res.redirect("/books");
		}
	});
})

router.get("/books/new", middleware.isLoggedIn, function(req, res){
	res.render("books/newbook");
});

router.get("/books/:id", function(req, res){
	Book.findById(req.params.id).populate("comments").exec(function(err, book){
		if(err){
			console.log(err);
		}else{
			//console.log(book);
			res.render("books/showbook", {book: book});		
		}
	});
	
});

//EDIT

router.get("/books/:id/edit", middleware.checkPermission, function(req, res){
		Book.findById(req.params.id, function(err, book){
					res.render("books/editbook", {book: book});
			});
});

//UPDATE

router.put("/books/:id", middleware.checkPermission, function(req, res){
	Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updateBook){
		if(err) {
			res.redirect("/books");
		} else {
			req.flash("success", "Update made successfully");
			res.redirect("/books/"+updateBook._id);
		}
	});
});

//DELETE

router.delete("/books/:id", middleware.checkPermission, function(req, res){
	Book.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/books");
		} else {
			req.flash("success", "Book deleted");
			res.redirect("/books");
		}
	});
});


module.exports = router;