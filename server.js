const express = require('express');
const app = express();
const fs = require("fs");

/*
*
* method >listUsers
* method GET : lecture d'une resource 
*/

app.get('/listUsers', function(req, res){
    fs.readFile(__dirname + "/" + "users.json", 'utf-8', function(err, data){
        console.log(data);
        res.send(data);
    });
})

let user = {
	"user4" : {
		"name" : "mohit",
		"password" : "password4",
		"profession" : "teacher",
		"id": 4
	}
}
/* 
*
*
* method >addUsers
* method POST : creation d'une resource 
*
*
*/

app.post('/addUsers', function(req, res) {
	fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
		data = JSON.parse(data);
		data["user4"] = user["user4"];
		console.log(data);
        res.send(JSON.stringify(data));
    });
})

/*
*
* method > getUserByID
* method Get : Recuperer la ressource d'un utilisateur par son identifiant 
*
*/

app.get('/:id', function(req, res) {
	fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
	if(err) throw err;
		//Variable 'user' wiil contain the result of users information to retrieve all ressources
		let users = JSON.parse(data); 
		//Variable 'user' retrieve user information by id 
		let user = users["user" + req.params.id]
		//Display 'user' information by id 
		console.log("User Info by id: " + JSON.stringify(user));
		res.send(JSON.stringify(user));
	});
})

/*
*
* method > deleteUser
* methd delete : 
*
*/

app.delete('deleteUser', function(req, res){
	fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
		//Variable 'data' will contain the result of user information to retrieve all ressource
		data = JSON.parse(data);
		//Delete a user (id:2)
		delete data["user" + 2];
		//Display in log data of the deleted user
		console.log("Delete user" + JSON.stringify(data));
		//Send the information of the result with the user deleted
		res.send(JSON.stringify(data));
	})

})

let server = app.listen(8081, function(){
    let host = server.address().address
    let port = server.address().port
    console.log("Launch API restful with the following URI http://%s:%s", host, port)
})
















