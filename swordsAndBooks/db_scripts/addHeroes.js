databaseToUse = "swordsAndBooks";

mongo = new Mongo("localhost:27017");
db = mongo.getDB(databaseToUse);
// db.auth("rpnadmin", "rpnpass");
// db = mongo.getDB(databaseToUse);

db.heros.insert({id:'11', name:"Dragon Slayer",
    maxHealth: 100,
    currentHealth: 100,
    gender:'male', 
    level: 12,
    power:32, 
    strength:20,
    speed:10,
    intelligence:10,
    image:'/img/slayer.jpg',
	userId:'1'});

db.heros.insert({id:'12', name:"Sweet Fairy",
    maxHealth: 100,
    currentHealth: 100,
    gender:'male', 
    level: 10,
    power:12, 
    strength:20,
    speed:15,
    intelligence:15,
    image:'/img/fairy.jpg',
	userId:'1'});

db.heros.insert({id:'13',name:"Ass Kicker",
    maxHealth: 100,
    currentHealth: 100,
    gender:'male', 
    level: 14,
    power:22, 
    strength:21,
    speed:33,
    intelligence:17,
    image:'/img/kicker.jpg', 
	userId:'1'});

db.heros.insert({id:'111',name:"Orc Warrior",
    maxHealth: 100,
    currentHealth: 100,
    gender:'male', 
    level: 9,
    power:19, 
    strength:10,
    speed:14,
    intelligence:17,
    image:'/img/random.jpg', 
    userId:'1'});
