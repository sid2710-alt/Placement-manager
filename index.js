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
 app.use(express.urlencoded({extended: true}));
 
 app.use(cookieParser());

 app.use(express.static('./assests'));
 
 //setting up view engine
 app.use(expressLayouts);
 
 app.set("view engine", "ejs");
 app.set("views", "./views");
 app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
 app.use(session({
    name: 'placement',
    secret: 'bangbange',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 1000),
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/fake-it',
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
 
 app.use("/", require("./routes/index"));
 app.listen(port, function(err){
    if(err){console.log("Error in running Server", err); return;}
    console.log("Server is up and running at port", port);
});



































 // const cookie_parser = require('cookie-parser');
// const expressLayouts = require('express-ejs-layouts');
 //const db = require('./config/mongoose')
// const session = require('express-session');
// const passport = require('passport');
// const passportLocal = require('./config/passport-local-strategy');
// const passportjwt=require('./config/passport-jwt-strategy');
// //const { disable } = require('express/lib/application');
// const MongoStore = require('connect-mongo');
// const sassMiddleware = require('node-sass-middleware');
// const flash = require('connect-flash');
// const customMware=require('./config/middleware');
// const passportGoogle=require('./config/passport-google-oauth2-strategy')
// app.use(sassMiddleware({
//     src: './assests/scss',
//     dest: './assests/css',
//     debug: true,
//     outputStyle: 'expanded',
//     prefix: '/css'
// }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cookie_parser());
// app.use(expressLayouts);
// app.use(express.static('./assests'));
// app.use('/uploads',express.static(__dirname +'/uploads'));
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);
// app.set('view engine', 'ejs')
// app.set('views', './views')

// app.use(session({
//     name: 'codeial',
//     secret: 'bangbange',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 1000),
//     },
//     store: MongoStore.create({
//         mongoUrl: 'mongodb://localhost/fake-it',
//         autoRemove: 'disabled',
//     },
//         function (err) {
//             console.log(err || 'store connection ok')

//         }
//     )
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.setAuthenticated);
// app.use(flash());
// app.use(customMware.setflash);
// app.use('/', require('./routes/index'))

// app.listen(port, function (err) {
//     if (err)
//         console.log('Error :', err);
//     else
//         console.log(`Server is running on port:${port}`);
// });
