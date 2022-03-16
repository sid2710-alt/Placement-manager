const cookieParser = require('cookie-parser');
const express = require('express');
 const app = express();

 const port = process.env.PORT || 8000;
 const db=require('./config/mongoose');
 const session=require('express-session');
 const flash = require("connect-flash");
 const expressLayouts = require('express-ejs-layouts');
 const cookie_parser = require('cookie-parser');
 const passport=require('passport');
 const passportLocal=require('./config/passport local-strategy');
 const MongoStore = require('connect-mongo');
 const customMware=require('./config/middleware');
 
 
 app.set("view engine", "ejs");
 app.set("views", "./views");
 
 app.use(session({
    name: 'placement',
    secret: 'bangbange',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 1000),
    },
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://siddhu:siddhu@cluster0.pmixm.mongodb.net/Placement?retryWrites=true&w=majority",
        autoRemove: 'disabled',
    },
        function (err) {
            console.log(err || 'store connection ok')

        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setFlash);
app.use(passport.setAuthenticated);
app.use(express.urlencoded({extended: true}));
 
 app.use(cookieParser());
 app.use(expressLayouts);
 app.use(express.static('./assests'));
 app.use("/", require("./routes/index"));
 //setting up view engine
 
  app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
 
 
 app.listen(port, function(err){
    if(err){console.log("Error in running Server", err); return;}
    console.log("Server is up and running at port", port);
});


































