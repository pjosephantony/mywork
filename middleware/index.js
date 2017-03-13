var Comment = require("../models/comments");
var Book = require("../models/books");

var middlewareObj = {};

middlewareObj.checkCommentPermission = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err){
				res.redirect("back");
			} else {
				if(comment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You dont have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You have to login");
		res.redirect("back");
	}
}

middlewareObj.checkPermission = function(req, res, next){
	if(req.isAuthenticated()){
		Book.findById(req.params.id, function(err, book){
			if(err){
				req.flash("error", "Book not found")
				res.redirect("back");
			} else {
				if(book.user.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You dont have permission to do that");
					res.redirect("/books");
				}
			}
		});
	} else {
		req.flash("error", "You have to login to do that!!")
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You have to login to do that!!");
	res.redirect("/login");
}

module.exports = middlewareObj;