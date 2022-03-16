const User = require("../models/user");
const Student = require("../models/student");
//const interview = require("../models/interview");
module.exports.signUp=function(req,res){
    res.render('user_SignUP');
}
module.exports.signIn=function(req,res){
    res.render('user_signIn');
}
module.exports.create = function (req, res) {
      // later for sign up
      if (req.body.password != req.body.confirm_password) {
        //req.flash("success", "Password and Confirm Password are not same");
        return res.redirect("back");
      }
      User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
          console.log("Error in finding user in signing up");
          return;
        }
        if (!user) {
          // const secret = 'abcdefg';
    
          User.create(
            {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
            },
            function (err, user) {
              if (err) {
                console.log("Error in finding user in signing up");
                return;
              }
             // req.flash("success", "Signed Up Successfully");
              return res.redirect("/user/signIn");
            }
          );
        } else {
         // req.flash("error", "Sign Up Failed");
          return res.redirect("back");
        }
      });
    };
    module.exports.create_session=function(req,res){
      req.flash('success','Logged in Successfully') 
      return res.redirect('/mainscreen/render');
    }
    module.exports.destory_session=function(req,res)
    {
      req.logout();
      req.flash('success','Logged out Successfully') 
      return res.redirect('/');
    }

