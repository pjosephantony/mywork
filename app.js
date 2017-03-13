var express              = require("express"),
    app                  = express(),
    mongoose             = require("mongoose"),
    passport             = require("passport"),
    localStrategy        = require("passport-local"),
    User                 = require("./models/user"), 
    Book                 = require("./models/books"),
    Comment              = require("./models/comments"),
    seedDB               = require("./seeds"),
    methodOverride		 = require("method-override"),
    flash                = require("connect-flash"),
    bodyParser           = require("body-parser");


 var commentRoutes   = require("./routes/commentroutes"),
     bookRoutes      = require("./routes/bookroutes"),
     authRoutes      = require("./routes/authroutes");




mongoose.connect("mongodb://localhost/bookreview"); 
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(flash());

app.use(methodOverride("_method"));

//PASSPORT CONFIG

app.use(require("express-session")({
	secret: "bookreview",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this is a middleware which run for every route which helps in passing req.user to template file(.ejs file)
app.use(function(req, res, next){
	res.locals.user = req.user;
	res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(commentRoutes);
app.use(bookRoutes);
app.use(authRoutes);


//seedDB();


app.listen("3000", function(){
	console.log("Server Started");
});