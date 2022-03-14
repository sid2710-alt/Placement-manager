const Student = require("../models/student");
const Interview=require("../models/interview");
const { localsName } = require("ejs");
module.exports.home = function (req, res) {
    
    res.render('home');
    
    
}
module.exports.show =async function (req, res) {
    try{
        let students=await Student.find({});
        let interviews=await Interview.find({});
      
            return res.render('mainscreen', {
                students: students,
                interviews:interviews
            })
    }
    catch(e)
    {
        console.log('Error in rendenring',e);
    }
    

}
