var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feedDog;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog = createButton("Feed the Dog");
  feedDog.position(900,95);
  feedDog.mousePressed(feedTheDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var fedTimeRef = database.ref('FeedTime');
    fedTimeRef.on("value",function(data){
        lastFed = data.val();
    })
 
  //write code to display text lastFed time here
  textSize(15);
  text("Last Feed:" + lastFed, 430, 30);

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedTheDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var foodStockVal = foodObj.getFoodStock();
  if(foodStockVal <= 0){
    foodObj.updateFoodStock(foodStockVal * 0);
  }
  else{
    foodObj.updateFoodStock(foodStockVal - 1);
  }

  lastFed = hour();

  database.ref('FeedTime').update({
    FeedTime:lastFed
  });

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

