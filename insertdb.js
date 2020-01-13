const fs = require('fs');
const fastify = require('fastify')();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var contents = fs.readFileSync('users.json', 'utf8');
let array = JSON.parse(contents)
    //console.log(JSON.parse(contents.pass_text));


    // установка схемы
const userScheme = new Schema({
    id: Number,
    name: String,
    student_id: String,
    group_id: Number,
    email: String,
    is_student: Number
});
  
// подключение
mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });
  
const User = mongoose.model("users", userScheme);
array.forEach(element => {
    //console.log(element)
    const user = new User({
        id: element.id,
        name: element.name,
        student_id: element.number_zach,
        group_id: element.group_id,
        email: element.email,
        is_student: element.is_student
    });

    user.save(function(err){
        mongoose.disconnect();  // отключение от базы данных
          
        if(err) return console.log(err);
        console.log("Сохранен объект", user);
    });
});
  
