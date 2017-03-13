var mongoose = require("mongoose");
var Book = require("./models/books");
var Comment = require("./models/comments");

var data = [
{
	name: "The Book of Strange New Things",
	image: "http://bookcoverarchive.com/wp-content/uploads/2016/12/Book-of-Strange-New-Things.jpg",
	author: "Michel Faber",
	genre: "Science Fiction",
	review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis urna ante. Suspendisse et interdum lacus, a faucibus orci. Sed pharetra risus purus, a aliquet mi laoreet sit amet. Sed scelerisque felis vitae scelerisque ornare. Duis elementum turpis sit amet ante euismod porttitor. Sed pharetra sapien vel enim iaculis, ut feugiat massa convallis. Donec mattis pellentesque augue a tempus. Integer sit amet commodo lectus. Ut iaculis, dolor et iaculis dictum, urna dolor bibendum eros, et vestibulum arcu nunc a ex. Duis dapibus ex eu suscipit aliquam."
},
{
	name: "Alena",
	image: "http://bookcoverarchive.com/wp-content/uploads/2015/12/alena.jpg",
	author: "Michel Faber",
	genre: "Science Fiction",
	review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis urna ante. Suspendisse et interdum lacus, a faucibus orci. Sed pharetra risus purus, a aliquet mi laoreet sit amet. Sed scelerisque felis vitae scelerisque ornare. Duis elementum turpis sit amet ante euismod porttitor. Sed pharetra sapien vel enim iaculis, ut feugiat massa convallis. Donec mattis pellentesque augue a tempus. Integer sit amet commodo lectus. Ut iaculis, dolor et iaculis dictum, urna dolor bibendum eros, et vestibulum arcu nunc a ex. Duis dapibus ex eu suscipit aliquam."	
},
{
	name: "Witches of America",
	image: "http://bookcoverarchive.com/wp-content/uploads/2015/10/witches-of-america.jpg",
	author: "Michel Faber",
	genre: "Science Fiction",
	review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis urna ante. Suspendisse et interdum lacus, a faucibus orci. Sed pharetra risus purus, a aliquet mi laoreet sit amet. Sed scelerisque felis vitae scelerisque ornare. Duis elementum turpis sit amet ante euismod porttitor. Sed pharetra sapien vel enim iaculis, ut feugiat massa convallis. Donec mattis pellentesque augue a tempus. Integer sit amet commodo lectus. Ut iaculis, dolor et iaculis dictum, urna dolor bibendum eros, et vestibulum arcu nunc a ex. Duis dapibus ex eu suscipit aliquam."	
}
]

function seedDB(){
	Book.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("All data removed");
	// 	data.forEach(function(book){
	// 	Book.create(book, function(err, book){
	// 		if(err){
	// 			console.log(err);
	// 		} else {
	// 			Comment.create(
	// 				{
	// 					text: "a aliquet mi laoreet sit amet. Sed scelerisque felis vitae scelerisque ornare. Duis elementum turpis sit amet ante euismod porttitor. Sed pharetra sapien",
	// 					author: "Person"
	// 				}, function(err, comment){
	// 					if(err){
	// 						console.log(err);
	// 					} else {
	// 						book.comments.push(comment);
	// 						book.save();
	// 						console.log("book added with a comment!!");
	// 					}

	// 			})
				
	// 		}
	// 	});
	// });
});
	
	
}

module.exports = seedDB;