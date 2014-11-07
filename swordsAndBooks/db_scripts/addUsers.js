databaseToUse = "swordsAndBooks";

mongo = new Mongo("localhost:27017");
db = mongo.getDB(databaseToUse);
// db.auth("rpnadmin", "rpnpass");
// db = mongo.getDB(databaseToUse);


db.users.insert({name: 'Hary',password:'123'});
db.users.insert({name:'Emi', password: '123'});
db.users.insert({name:'Misho', password: '123'});

