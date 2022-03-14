const mongoose = require("mongoose");
const interviewSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
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

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;