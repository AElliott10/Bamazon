//Connect the database
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "-8Rbc12?",
  database: "bamazon"
});

//Database connection Test - works
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  itemsForSale();
});

//Customer Experience - first sees all items for sale and following details: item_id, product_name, price, stock_quantity
function itemsForSale() {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;
    var displayTable = new Table({
      head: ["Item ID", "Product Name", "Price", "Quantity"],
      colWidths: [10, 25, 10, 10]
    });
    for (var i = 0; i < results.length; i++) {
      displayTable.push(
        [results[i].item_id, results[i].product_name, results[i].price, results[i].stock_quantity]
      );
    }
    console.log(displayTable.toString());
    orderQuestions(results);
  });
}

function orderQuestions(answers) {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "item_ID",
        type: "input",
        message: "Please provide the ID of the product you would like to purchase."
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many items would you like to purchase?",
      },
    ])
      .then(function (answers) {
        var stockRequested = answers.stock_quantity;
        var itemID = answers.item_ID;
        managePurchase(itemID, stockRequested);
      })
  }
  )
}

//managePurchase
function managePurchase(itemID, stockRequested) {
  connection.query("SELECT * FROM products WHERE item_id = " + itemID, function (err, results) {
    if (err) { console.log(err) };
    //console.log(results)
    if (stockRequested <= results[0].stock_quantity) {
      var totalPurchase = results[0].price * stockRequested;
      console.log("Thank you for your order. Your total cost is " + totalPurchase + ".");
      var oldTotal = results[0].stock_quantity
      var newTotal = oldTotal - stockRequested
      connection.query("UPDATE products SET stock_quantity = " + newTotal + " WHERE item_id = " + itemID);
    } else {
      console.log("Apologies, we ran out of stock. Please pick another item.");
    }
    connection.end();
  });
}
