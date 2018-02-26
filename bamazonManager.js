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
    run();
  });

  //global variables
  var product = [];
  var price;
  var unitID;
  var quantity;

  function run() {
    console.log(product);
    inquirer.prompt([
      {
      type: "checkbox",
      name: "option",
      message: "What product would you like to buy? (Select a product)",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
      }
    ]).then(function(response) {
      //console.log(response);
      if(response.option == "View Products for Sale"){
        viewProducts();
      }
      if(response.option == "View Low Inventory"){
        lowInventory();
      }
      if(response.option == "Add to Inventory"){
        addInventory();
      }
      if(response.option ==  "Add New Product"){
        addProduct();
      }
    });
  }

  // list every available item: the item IDs, names, prices, and quantities
  function viewProducts(){
    var query = "SELECT * FROM products"
    connection.query(query, function(err, res) {
      if (err) throw err;
      for(var i = 0; i < res.length; i++) {
        console.log(`Item ID: ${res[i].ID}  Product: ${res[i].product_name}  Department: ${res[i].department_name}  Price: $${res[i].price}.00  Stock: ${res[i].stock_quantity}`);
        product.push(res[i].product_name);
        quantity = res[i].stock_quantity
      }
      //addInventoryConfirmation()
    });
    //console.log("viewProducts");
  }

  //list all items with an inventory count lower than five
  function lowInventory(){
    var query = "SELECT * FROM products WHERE stock_quantity < 5"
    connection.query(query, function(err, res) {
      if (err) throw err;
      for(var i = 0; i < res.length; i++) {
        console.log(`Item ID: ${res[i].ID}  Product: ${res[i].product_name}  Department: ${res[i].department_name}  Price: $${res[i].price}.00  Stock: ${res[i].stock_quantity}`);

        quantity = parseInt(res[i].stock_quantity);
        console.log(quantity);

        // if(quantity >= 5){
        //   console.log("Quantity is sufficient");
        // }
      }

    });
  }

  function addInventory(){
    viewProducts();
    inquirer.prompt([
      {
        type: "checkbox",
        name: "choice",
        message: "Select a product to add inventory to: ",
        choices: product
      }
    ]).then(function(response) {
      //console.log(response.choice);
      var products = response.choice;

      inquirer.prompt([
        {
          type: "input",
          name: "quantity",
          message: "How many units would you like to add?"
        }
      ]).then(function(response) {

          addQuantity = quantity + parseInt(response.quantity);

          console.log(quantity);

          var query = "UPDATE products SET ? WHERE ?";
          connection.query(query,
            [
              {
                stock_quantity: quantity
              },
              {
                product_name: products
              }
            ],function(err, res) {
              if (err) throw err;
              console.log(`New Stock Quantity: ${res}`);
          });
        });
     });

  }

  function addProduct(){
    console.log("add product");
  }

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
          //run();
        }
        else{
          connection.end();
        }
    });
  }

  function addInventoryConfirmation() {
    inquirer.prompt([
      {
        type: "confirm",
        name: "again",
        message: "Would you like to add inventory? ",
        default: true
      }
    ]).then(function(answer){

        if(answer.again) {
          addInventory();
        }
        else{
          connection.end();
        }
    });
  }
