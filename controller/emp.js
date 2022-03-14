const Student=require('../models/student')
const Interview=require('../models/interview')
module.exports.addStudent=function(req,res){
  res.render('add_students');
}
module.exports.create = async function (req, res) {
  try{
    var student =await  Student.findOne({ email: req.body.email })
    req.flash("success", "Student added successfully");
  }
  catch(err)
  {
    if (err) {
      console.log("Cannot find the student");
      return res.redirect("back");
    }
  }
   
 
    

    if (!student) {
      const DSA = req.body.DSA;
      const MERN = req.body.MERN;
      const APP_DEV = req.body.APP_DEV;
      if (
        DSA < 0 ||
        DSA > 100 ||
        MERN > 100 ||
        MERN < 0 ||
        APP_DEV < 0 ||
        APP_DEV > 100
      ) {
        return res.redirect("back");
      }
       Student.create(
        {
          name: req.body.name,
          email: req.body.email,
          batch: req.body.batch,
          status: req.body.status,
          DSA: req.body.DSA,
          MERN: req.body.MERN,
          APP_DEV: req.body.APP_DEV,
          college:req.body.college,
          // interviews: [
          //   {
          //     company: req.body.company,
          //     date: req.body.date,
          //     result: req.body.result,
          //   },
          // ],
        },
        function (err, user) {
          if (err) {
            console.log("student not added", err);
            return res.redirect("back");
          }

          return res.redirect("/");
        }
      );
    } else {
      console.log("student is already Added");
      return res.redirect("/");
    }
  //});
};

module.exports.edit_Student = async function (req, res) {
  //console.log(req.params.id);
  Student.findOne({ _id: req.params.id } ,function (err, student) {
    if (err) {
      console.log("Student not found", err);
      return res.redirect("/users/profile");
    }
    return res.render("edit_student", {
      title: "Edit Studnet",
      student: student,
    });
  });
};
module.exports.updateStudent = async function (req, res) {
  try{
var student= await Student.findOne({ email: req.body.email });
req.flash("success", "Student Updated Successfully");
  }
  catch(e)
  {
    console.log("Student not found", err);
    return res.redirect("back");
  }
    if (student) {
      if (req.body.status != undefined && req.body.status != student.status) {
        student.updateOne(
          { email: req.body.email },
          { status: req.body.status }
        );
        student.save();

        console.log("student status updated");
        // return res.redirect("back");
      }

      if (req.body.company != undefined) {
        console.log(req.body.company, req.body.date, req.body.result);

        Student.updateOne(
          { email: req.body.email },
          {
            $push: {
              interviews: [
                {
                  company: req.body.company,
                  date: req.body.date,
                  result: req.body.result,
                },
              ],
            },
          },
          function (err, update) {
            if (err) {
              console.log(err);
            }
          }
        );
        student.save();
       // req.flash("success", "Student Updated Successfully");
      }
    }
      let interview=await Interview.findOne( { companyName: req.body.company });
          if (interview) {
            // Interview.updateOne(
            //   { company_name: req.body.company },
            //   {
            //     $push: {
            //       students: [
            //         {
            //           student: student._id,
            //           result: "Interview Pending",
            //         },
            //       ],
            //     },
            //   },
            //   function (err, company) {
            //     if (err) {
            //       console.log(err);
            //     }
            //   }
            // );
            console.log("*********** saved");
            interview.students.push({
              result:"Interview Pending",
              student:student._id,
              
            }
             
)
            
          
            interview.save();
          } else {
            Interview.create(
              {
                companyName: req.body.company,
                date: req.body.date,
                students: [
                  {
                    student: student._id,
                    result: "Interview Pending",
                  },
                ],
              },
              function (err, new_interview) {
                if (err) {
                  console.log("no interview create in db", err);
                }
              }
            );
          }
        
      // console.log("student status updated");
      return res.redirect("back");
    };