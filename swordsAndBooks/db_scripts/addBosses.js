databaseToUse = "swordsAndBooks";

mongo = new Mongo("localhost:27017");
db = mongo.getDB(databaseToUse);
// db.auth("rpnadmin", "rpnpass");
// db = mongo.getDB(databaseToUse);

db.bosses.insert({
	id: '1',
    name:"Serventus",
    maxHealth: 200,
    currentHealth: 200,
    expirience: 0,
    nextLevelExp: 600, 

    gender:'Male', 
    race: 'Human',
    level: 7,
    
    power:35, 
    stamina:10,
    speed:15,
    armor:12,

    image:'/bosses_images/Mario.jpeg',
    wins: 3,
    looses: 0
});
db.bosses.insert({
	id: '2',
    name:"Nort Legion Wolf",
    maxHealth: 160,
    currentHealth: 160,
    expirience: 0,
    nextLevelExp: 600, 

    gender:'Male', 
    race: 'Elf',
    level: 5,
    
    power:30, 
    stamina:8,
    speed:17,
    armor:0,

    image:'/bosses_images/Marto.jpg',
    wins: 1,
    looses: 0
});
db.bosses.insert({
	id: '3',
    name:"The Behemot",
    maxHealth: 100,
    currentHealth: 100,
    expirience: 0,
    nextLevelExp: 600, 

    gender:'Male', 
    race: 'Human',
    level: 4,
    
    power:21, 
    stamina:5,
    speed:5,
    armor:10,

    image:'/bosses_images/Kalin.jpeg',
    wins: 1,
    looses: 0
});
db.bosses.insert({
	id: '4',
    name:"The Cheater",
    maxHealth: 100,
    currentHealth: 100,
    expirience: 0,
    nextLevelExp: 600, 

    gender:'Female', 
    race: 'Human',
    level: 1,
    
    power:9, 
    stamina:5,
    speed:5,
    armor:2,

    image:'/bosses_images/Zori.jpeg',
    wins: 1,
    looses: 0
});
db.bosses.insert({
	id: '5',
    name:"Marmot",
    maxHealth: 100,
    currentHealth: 100,
    expirience: 0,
    nextLevelExp: 600, 

    gender:'Male', 
    race: 'Human',
    level: 6,
    
    power:13, 
    stamina:5,
    speed:10,
    armor:2,

    image:'/bosses_images/Svetlio.jpeg',
    wins: 1,
    looses: 0
});
db.bosses.insert({
	id: '6',
    name:"The Destroyer",
    maxHealth: 120,
    currentHealth: 120,
    expirience: 0,
    nextLevelExp: 600, 

    gender:'Male', 
    race: 'Orc',
    level: 6,
    
    power:30, 
    stamina:6,
    speed:10,
    armor:2,

    image:'/bosses_images/Boiko.jpg',
    wins: 1,
    looses: 0
});