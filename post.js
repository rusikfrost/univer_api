const request = require('request');
request.post({url:'http://localhost:3000/get_user/{"name": "Волочаев Роман Олегович"}'}, function(err,httpResponse,body){ 
    
console.log(body)
})