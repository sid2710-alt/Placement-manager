const fs = require("fs");
const Student = require("../models/student");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


module.exports.csvload = async function (req, res) {
  try{
    const csvWriter = createCsvWriter({
      path: 'assests/data.csv',
      header: [
        { id:'sn',title:"SNo"},
          {id: 'name', title: 'Name'},
          {id: 'email', title: 'Email'},
          {id: 'batch', title: 'Batch'},
          {id: 'status', title: 'Status'},
          {id: 'dsa', title: 'DSA'},
          {id: 'webd', title: 'WebD'},
          {id: 'react', title: 'React'},
          {id: 'interview', title: 'Interview'},
          {id: 'date', title: 'Date'},
          {id: 'result', title: 'Result'},
      ]
  });
  const arrayStudent = await Student.find({});
  //console.log(arrayStudent);
  const records = [];
  //{'sn':'','name':'','email':'','batch':'','status':'','dsa':'','webd':'','react':'','interview':'','date':'','resul':''};
  let n=1;
  for(let student of arrayStudent)
  {
  
    let record = {}
  record.name=student.name;
  console.log(record.name);
  record.email=student.email;
  record.status=student.status;
  record.dsa=student.DSA;
  record.react=student.MERN;
  record.webd=student.APP_DEV;
  if (student.interviews.length > 0) {
            for (interview of student.interviews) {
              record.sn=n;
                n++;
                record.interview=interview.company;
                record.date=interview.date;
                record.result=interview.result;
                records.push(record);
            }
          }
          else{
            record.sn=n;
            n++;
           // console.log(records);
            records.push(record);
            //console.log(records);
  
          }
  
  }
  //console.log(records[1]);
  await csvWriter.writeRecords(records);       // returns a promise
      return res.download("assests/data.csv");
  }
  
  catch(err)
  {
console.log(err);
  }
};
  
