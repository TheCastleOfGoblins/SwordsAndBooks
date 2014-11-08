databaseToUse = "swordsAndBooks";

mongo = new Mongo("localhost:27017");
db = mongo.getDB(databaseToUse);
// db.auth("rpnadmin", "rpnpass");
// db = mongo.getDB(databaseToUse);

db.books.insert({title: 'Fantasy World', userId:'545d407e4bda0b7d725c11f0'});
