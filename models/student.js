const mongoose=require('mongoose');
const studentSchema =new mongoose.Schema({
    batch: {
     type: String,
     required: true,
    },
    name: {
        type: String,
     required: true,
    },
    email:{
      type:String,
      required:true,
    },
    college:{
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ["Placed", "Not Placed"],
        required: true
      },
      DSA: {
        type: String,
       
      },
      MERN: {
        type: String,
        
      },
      APP_DEV: {
        type: String,
       
      },
      interviews: [
        {
          company: {
            type: String,
           
          },
          date: {
            type: String,
           
          },
          result: {
            type: String,
            enum: [
              "Selected",
              "Not Selected",
              "On Hold",
              "Absent",
              "Interview Pending",
            ],
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );
 const Student=mongoose.model('Student',studentSchema);
 module.exports=Student;