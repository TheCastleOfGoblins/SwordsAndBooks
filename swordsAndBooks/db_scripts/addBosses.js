databaseToUse = "swordsAndBooks";

mongo = new Mongo("localhost:27017");
db = mongo.getDB(databaseToUse);
// db.auth("rpnadmin", "rpnpass");
// db = mongo.getDB(databaseToUse);

db.bosses.insert({
	id: '1',
    name:"Serventus",
    maxHealth: 280,
    currentHealth: 280,
    expirience: 0,
    nextLevelExp: 600, 

    gender:'Male', 
    race: 'Human',
    level: 3,
    
    power:25, 
    stamina:14,
    speed:10,
    armor:9,

    image:'/bosses_images/Mario.jpeg',
    wins: 3,
    looses: 0
});
db.bosses.insert({
	id: '2',
    name:"Nort Legion Wolf",
    maxHealth: 200,
    currentHealth: 200,
    expirience: 0,
    nextLevelExp: 600, 

    gender:'Male', 
    race: 'Elf',
    level: 3,
    
    power:30, 
    stamina:10,
    speed:17,
    armor:0,

    image:'/bosses_images/Marto.jpg',
    wins: 1,
    looses: 0
});