//npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");


//connection setup to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if(err){
    throw err;
  }
  //console.log("connected as id " + connection.threadId);

  readProducts();
});

//global variables
var productName = [];
var price;
var unitID;
var quantity;

//read the table to push product names into an array
function readProducts() {
  var query = "SELECT item_id, product_name, price FROM products"
  connection.query(query, function(err, res) {
    if (err) throw err;
    for(var i = 0; i < res.length; i++) {
      // units.push(`${res[i].item_id}`);
      productName.push(`${res[i].product_name}`);
      //price.push(`Price: $${res[i].price}`);
    }
    run();
  });
};

// ask for user input to determine what they would like to purchase
function run() {
  //console.log(updatedUnits);
  inquirer.prompt([
    {
    type: "checkbox",
    name: "option",
    message: "What product would you like to buy? (Select a product)",
    choices: productName
    }
  ]).then(function(response) {

    //console.log(response.option);

    var query = connection.query("SELECT * FROM products WHERE product_name=?", response.option, function(err, res) {
      if (err) throw err;
      console.log(`The id for this product is ${res[0].ID} and sells for $${res[0].price}.00`);

      product = res[0].product_name;
      quantity = parseInt(res[0].stock_quantity);
      unitID = parseInt(res[0].ID);
      price = parseInt(res[0].price);

      //console.log(unitID);
      //console.log(quantity);

      userBuy();
    });

  });
}

//ask the user the amount of unit they would like to buy
function buy() {
  inquirer.prompt([
    {
    type: "input",
    name: "units",
    message: "How many units will you like to buy?"
    }
  ]).then(function(response) {
    //console.log(typeof(response.id));

    var unitsBought = parseInt(response.units);

    if(unitsBought <= quantity) {
      var newQuantity = quantity - unitsBought;

      var cost = unitsBought * price;

      //console.log(newQuantity);

      connection.query("UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newQuantity
          },
          {
            ID: unitID
          }
        ],
        function(err, res) {
          //console.log(res);
          console.log(`You now own ${unitsBought} ${product}. It cost you $${cost}.00. Enjoy!`);
          again();
        }
      )
    }
    else{
      console.log("Insufficient Quantity");
      run();
    }
  });

}

//ask the user if they would indeed like to purchase some of the product
function userBuy() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "again",
      message: "Would you like to buy some? ",
      default: true
    }
  ]).then(function(answer){

      if(answer.again) {
        buy();
        //console.log("works");
      }
      else{
        run();
      }
  });
}


//ask them if they would like to continue shopping
function again() {
  inquirer.prompt([
    {
      type: "confirm",
      name: "again",
      message: "Would you like to continue? ",
      default: true
    }
  ]).then(function(answer){

      if(answer.again) {
        run();
      }
      else{
        connection.end();
      }
  });
}
