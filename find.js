const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });
 
const userScheme = new Schema({
    id: Number,
    name: String,
    student_id: String,
    group_id: Number,
    email: String,
    is_student: Number
}, {versionKey: false});

const User = mongoose.model("users", userScheme);
 
User.findOne({"name": "Волочаев Роман Олегович"}, function(err, docs){
    mongoose.disconnect();
     
    if(err) return console.log(err);
     
    console.log(docs);
});