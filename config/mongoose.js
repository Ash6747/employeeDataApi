// Connect to MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ashishsatpute6747:syBeZUByEJnmdaOY@cluster0.jjkvnzv.mongodb.net/employee_data?retryWrites=true&w=majority',{
  useNewUrlParser: true
});  //mongodb://localhost/employee_data

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;