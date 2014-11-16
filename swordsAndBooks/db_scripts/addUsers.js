databaseToUse = "swordsAndBooks";

mongo = new Mongo("localhost:27017");
db = mongo.getDB(databaseToUse);
// db.auth("rpnadmin", "rpnpass");
// db = mongo.getDB(databaseToUse);


db.users.insert({id:'1', username: 'Hary',password:'$2a$10$9Mgc82ghVOS1nk.Sccmx3uWmhk6XhJuIHQMt6vLwuYxkG0fJrrIMe'});
db.users.insert({id:'2',username:'Emi', password: '$2a$10$9Mgc82ghVOS1nk.Sccmx3uWmhk6XhJuIHQMt6vLwuYxkG0fJrrIMe'});
db.users.insert({id:'3',username:'Misho', password: '$2a$10$9Mgc82ghVOS1nk.Sccmx3uWmhk6XhJuIHQMt6vLwuYxkG0fJrrIMe'});

