var express = require("express");
var router = express.Router();
var Comment = require("../models/comments");
var Book = require("../models/books");
var middleware = require("../middleware");


router.get("/books/:id/comments/new", middleware.isLoggedIn, function(req, res){

	Book.findById(req.params.id, function(err, book){
		if(err) {
			console.log(err);
		} else {
			res.render("comments/newcomment", {book: book});		
		}
	});
	
});

// ADD A COMMENT
router.post("/books/:id/comments", middleware.isLoggedIn, function(req, res){
	Book.findById(req.params.id, function(err, book){
		if(err){
			console.log(err);
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", err.message)
				}else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					book.comments.push(comment);
					book.save();
					req.flash("success", "Comment added successfully");
					res.redirect("/books/"+book._id);
				}
			});
		}
	});
});

//edit
router.get("/books/:id/comments/:comment_id/edit", middleware.checkCommentPermission, function(req, res){
	Comment.findById(req.params.comment_id, function(err, comment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/editcomment",{comment: comment, book_id: req.params.id});
		}
	});
});

// update

router.put("/books/:id/comments/:comment_id", middleware.checkCommentPermission, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment updated successfully");
			res.redirect("/books/"+req.params.id);
		}
	})
})

// destroy

router.delete("/books/:id/comments/:comment_id", middleware.checkCommentPermission, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			//req.flash("success", "Comment deleted successfully");
			res.redirect("/books/"+req.params.id);
		}
	})
});


module.exports = router;