
const { localsName } = require("ejs");
const Interview = require("../models/interview");
module.exports.addInterview = function (req, res) {
    return res.render("add_interview", {
      title: "Add Student",
    });
  }
  

module.exports.createInterview = function (req, res) {
  //console.log(req.body.companyName);
  Interview.findOne(
    { companyName: req.body.companyName },
    function (err, company) {
      if (err) {
        console.log("error in finding the company", err);
        return res.redirect("back");
      }

      if (!company) {
        Interview.create(
          {
            companyName: req.body.companyName,
            date: req.body.interviewDate,
            // if(req.body.student != undefined && req.body.result != undefined){
            // students: [
            //   {
            //     student: req.body.student,
            //     result: req.body.result,
            //   },
            // ],
          },
          function (err, new_interview) {
            if (err) {
              console.log("cant create interview", err);
              return res.redirect("back");
            }
            req.flash("success", "Interview Added Successfully");
            return res.redirect("/mainscreen/render");
          }
        );
      } else {
        
        req.flash("success", "Interview is already added");
        return res.redirect("back");
      }
    }
  );
};
module.exports.showdetails=async function(req,res){
  try {
    const interviews = await Interview.findOne({ _id: req.params.id }).populate(
      "students.student",
      
    );
    // return res.status(200).json({
    //   message: "Here is the list of all the Interviews",
    //   interviews,
    // });
    return res.render("interview_details", {
      title: "MY page",
      interview: interviews,
    });
  } catch (err) {
    console.log("error while fetching all the interviews from the DB!", err);
    return res.status(500).json({
      message: "error while fetching all the interviews from the DB!",
    });
  }
}