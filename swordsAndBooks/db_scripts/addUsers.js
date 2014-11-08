databaseToUse = "swordsAndBooks";

mongo = new Mongo("localhost:27017");
db = mongo.getDB(databaseToUse);
// db.auth("rpnadmin", "rpnpass");
// db = mongo.getDB(databaseToUse);


db.users.insert({id:'1', name: 'Hary',password:'123'});
db.users.insert({id:'2',name:'Emi', password: '123'});
db.users.insert({id:'3',name:'Misho', password: '123'});

