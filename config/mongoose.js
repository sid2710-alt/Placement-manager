const mongoose = require("mongoose");
const url="mongodb+srv://siddhu:siddhu@cluster0.pmixm.mongodb.net/Placement?retryWrites=true&w=majority";

/*******************MAKING CONNECTION***************************/
const connectionParams={
    useNewUrlParser: true,
   // useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
