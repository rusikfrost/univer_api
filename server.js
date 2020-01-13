const fastify = require('fastify')(),
      fs = require('fs'),
      mongoose = require("mongoose"),
      Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });

const userScheme = new Schema({
    id: Number,
    name: String,
    student_id: String,
    group: String,
    group_id: Number,
    email: String,
    is_student: Number
}, {versionKey: false});

const User = mongoose.model("users", userScheme);

const wallMessageScheme = new Schema({
  //id: Number,
  name: String,
  group: String,
  status: String,
  message: String,
  date: Number
}, {versionKey: false});

const Wall = mongoose.model("wall", wallMessageScheme);

const privateMessageScheme = new Schema({
  //id: Number,
  name_from: String,
  name_to: String,
  read_status: String,
  message: String,
  date: Number
}, {versionKey: false});

const PrivateMessage = mongoose.model("privateMessage", privateMessageScheme);

const groupMessageScheme = new Schema({
  //id: Number,
  name_from: String,
  chat_name: String,
  read_status: String,
  message: String,
  date: Number
}, {versionKey: false});

const GroupMessage = mongoose.model("groupMessage", groupMessageScheme);


const mrsScheme = new Schema({
	name: String,
	group: String,
	program: String,
	semestr: String,
	theory_m1: Number,
	practice_m1: Number,
	theory_m2: Number,
	practice_m2: Number,
	total_mrs: Number,
	exam_scores: Number,
	total_scores: Number,
	grade: Number,
	date: Number
}, {versionKey: false});

const MRS = mongoose.model("mrs", mrsScheme);

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/users/get_user', async (request, reply) => {

    dbQuery = {}
    console.log(Object.keys(request.query)[0]);
    console.log(Object.values(request.query)[0]);
    dbQuery[Object.keys(request.query)[0]] = Object.values(request.query)[0]

    let usr = await User.findOne(dbQuery, function(err, docs){
        if(err) {
            console.log(err);
            return {error: err};
        }
        console.log(docs);
        return { data: docs }
    });
    return { data: usr }
})

fastify.get('/users/get_users', async (request, reply) => {

    dbQuery = {}
    console.log(Object.keys(request.query)[0]);
    console.log(Object.values(request.query)[0]);
    dbQuery[Object.keys(request.query)[0]] = Object.values(request.query)[0]

    let usr = await User.find(dbQuery, function(err, docs){
        if(err) {
            console.log(err);
            return {error: err};
        }
        console.log(docs);
        return { data: docs }
    });
    return { data: usr }
})


fastify.post('/wall/send_message', async (request, reply) => {

	dbQuery = {}
	console.log(request.query);
	let insert_name = null;
	let insert_group = null;
	let insert_status = null;
	let insert_message = null;

	Object.entries(request.query).forEach(element => {
		console.log(element)
		//console.log(Date().getTime())
		if(element[0] == "name") insert_name = element[1];
		if(element[0] == "group") insert_group = element[1];
		if(element[0] == "status") insert_status = element[1];
		if(element[0] == "message") insert_message = element[1];
	});

	if(insert_name != null && insert_group != null && insert_status != null && insert_message != null){
		let date = Math.floor(Date.now() / 1000);
		console.log(date)

		let data = {
			name: insert_name,
			group: insert_group,
			status: insert_status,
			message: insert_message,
			date: date,
		}

		//dbQuery[Object.keys(request.query)[0]] = Object.values(request.query)[0]
		//const wall = mongoose.model("Wall", wallMessageScheme);

		let wall = await Wall.create(data, function(err, doc){
		    //lmongoose.disconnect();
		    console.log('----------__-------------')
		    if(err) return console.log(err);
		   	return "Сохранен объект user", doc;
		});

		return { data: wall }
	} else {
		return {error: "empty param"}
	}
})


fastify.post('/wall/get_messages', async (request, reply) => {

    dbQuery = {}
    //console.log(Object.keys(request.query)[0]);
    //console.log(Object.values(request.query)[0]);
    //console.log(dbQuery[Object.keys(request.query)[0]])

    if(Object.keys(request.query)[0] != undefined && Object.keys(request.query)[0] != undefined) {
		Object.entries(request.query).forEach(element => {
			dbQuery[element[0]] = element[1] 
		})
    } 

    console.log(dbQuery)

    let wall = await Wall.find(dbQuery, function(err, docs){
        if(err) {
            console.log(err);
            return {error: err};
        }
        console.log(docs);
        return { data: docs }
    });
    return { data: wall }
})



fastify.post('/private_message/send_message', async (request, reply) => {

	dbQuery = {}
	console.log(request.query);
	let insert_name_from = null;
	let insert_name_to = null;
	let insert_read_status = null;
	let insert_message = null;

	Object.entries(request.query).forEach(element => {

		console.log(element)
		if(element[0] == "name_from") insert_name_from = element[1];
		if(element[0] == "name_to") insert_name_to = element[1];
		if(element[0] == "read_status") insert_read_status = element[1];
		if(element[0] == "message") insert_message = element[1];
	});

	if(insert_name_from != null && insert_name_to != null && insert_read_status != null && insert_message != null){
		let date = Math.floor(Date.now() / 1000);
		console.log(date)

		let data = {
			name: insert_name_from,
			group: insert_name_to,
			status: insert_read_status,
			message: insert_message,
			date: date,
		}

		let message = await PrivateMessage.create(data, function(err, doc){

		    if(err) return console.log(err);
		   	return "Сохранен объект user", doc;
		});

		return { data: message }
	} else {
		return {error: "empty param"}
	}
})

fastify.post('/private_message/get_messages', async (request, reply) => {

    dbQuery = {}
    if(Object.keys(request.query)[0] != undefined && Object.keys(request.query)[0] != undefined) {
		Object.entries(request.query).forEach(element => {
			dbQuery[element[0]] = element[1] 
		})
    } 

    console.log(dbQuery)

    let message = await PrivateMessage.find(dbQuery, function(err, docs){
        if(err) {
            console.log(err);
            return {error: err};
        }
        console.log(docs);
        return { data: docs }
    });
    return { data: message }
})



fastify.post('/group_message/send_message', async (request, reply) => {

	dbQuery = {}
	console.log(request.query);
	let insert_name_from = null;
	let insert_chat_name = null;
	let insert_read_status = null;
	let insert_message = null;

	Object.entries(request.query).forEach(element => {

		console.log(element)
		if(element[0] == "name_from") insert_name_from = element[1];
		if(element[0] == "chat_name") insert_chat_name = element[1];
		if(element[0] == "read_status") insert_read_status = element[1];
		if(element[0] == "message") insert_message = element[1];
	});

	if(insert_name_from != null && insert_chat_name != null && insert_read_status != null && insert_message != null){
		let date = Math.floor(Date.now() / 1000);
		console.log(date)

		let data = {
			name: insert_name_from,
			group: insert_chat_name,
			status: insert_read_status,
			message: insert_message,
			date: date,
		}

		let message = await GroupMessage.create(data, function(err, doc){

		    if(err) return console.log(err);
		   	return "Сохранен объект user", doc;
		});

		return { data: message }
	} else {
		return {error: "empty param"}
	}
})

fastify.post('/group_message/get_messages', async (request, reply) => {

    dbQuery = {}
    if(Object.keys(request.query)[0] != undefined && Object.keys(request.query)[0] != undefined) {
		Object.entries(request.query).forEach(element => {
			dbQuery[element[0]] = element[1] 
		})
    } 

    console.log(dbQuery)

    let message = await GroupMessage.find(dbQuery, function(err, docs){
        if(err) {
            console.log(err);
            return {error: err};
        }
        console.log(docs);
        return { data: docs }
    });
    return { data: message }
})

/*
const mrsScheme = new Schema({
	name: String,
	group: String,
	program: String,
	semestr: String,
	theory_m1: Number,
	practice_m1: Number,
	theory_m2: Number,
	practice_m2: Number,
	total_mrs: Number,
	exam_scores: Number,
	total_scores: Number,
	grade: Number,
	date: Number
}, {versionKey: false});

const MRS = mongoose.model("mrs", mrsScheme);

fastify.post('/mrs/send_mrs', async (request, reply) => {

	dbQuery = {}
	console.log(request.query);
	let insert_name_from = null;
	let insert_chat_name = null;
	let insert_read_status = null;
	let insert_message = null;

	Object.entries(request.query).forEach(element => {

		console.log(element)
		if(element[0] == "name_from") insert_name_from = element[1];
		if(element[0] == "chat_name") insert_chat_name = element[1];
		if(element[0] == "read_status") insert_read_status = element[1];
		if(element[0] == "message") insert_message = element[1];
	});

	if(insert_name_from != null && insert_chat_name != null && insert_read_status != null && insert_message != null){
		let date = Math.floor(Date.now() / 1000);
		console.log(date)

		let data = {
			name: insert_name_from,
			group: insert_chat_name,
			status: insert_read_status,
			message: insert_message,
			date: date,
		}

		let message = await GroupMessage.create(data, function(err, doc){

		    if(err) return console.log(err);
		   	return "Сохранен объект user", doc;
		});

		return { data: message }
	} else {
		return {error: "empty param"}
	}
})

fastify.post('/mrs/get_mrs', async (request, reply) => {

    dbQuery = {}
    if(Object.keys(request.query)[0] != undefined && Object.keys(request.query)[0] != undefined) {
		Object.entries(request.query).forEach(element => {
			dbQuery[element[0]] = element[1] 
		})
    } 

    console.log(dbQuery)

    let message = await GroupMessage.find(dbQuery, function(err, docs){
        if(err) {
            console.log(err);
            return {error: err};
        }
        console.log(docs);
        return { data: docs }
    });
    return { data: message }
})

*/





/*
fastify.post('/wall/get_messages', async (request, reply) => {

  dbQuery = {}
  console.log(Object.keys(request.query)[0]);
  console.log(Object.values(request.query)[0]);
  //dbQuery[Object.keys(request.query)[0]] = Object.values(request.query)[0]

  let wall = await Wall.find(dbQuery, function(err, docs){
      if(err) {
          console.log(err);
          return {error: err};
      }
      console.log(docs);
      return { data: docs }
  });
  return { data: wall }
})
*/

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()