var fs = require("fs");
var users = fs.readFileSync("users.json");
 var usersContent = JSON.parse(users);
 //console.log(jsonContent[0]);

var groups = fs.readFileSync("groups.json");

 var groupsContent = JSON.parse(groups);
 //console.log(jsonContent[0]);
var obj = {
   arr: []
};
for (var i = usersContent.length - 1; i >= 0; i--) {
	 //console.log(usersContent[i])
	 for (var j = groupsContent.length - 1; j >= 0; j--) {


	 	//usersContent[i]
	 	if(usersContent[i].group_id == groupsContent[j].id ){
	 		console.log(usersContent[i].group_id, '==', groupsContent[j].id )
	 		usersContent[i].group = groupsContent[j].name
			
			obj.arr.push(usersContent[i])
	 	}

	 	//console.log(groupsContent[j].group_id)
	 }
}

var json = JSON.stringify(obj);
fs.writeFileSync("newUser.json", json)