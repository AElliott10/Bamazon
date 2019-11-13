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
  //connection.end();
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

function orderQuestions(answer) {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "choice",
        type: "input",
        message: "Please provide the ID of the product you would like to purchase."
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many items would you like to purchase?"
      },
    ])
      // Manage Inventory
      .then(function (answer) {
        var stockRequested = answer.stock_quantity;
        var itemID = answer.choice;
        managePurchase();
      });
  });

  function managePurchase() {
    var total = 0;
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
      [answer.stock_quantity, answer.choice],
      function (error) {
        if (error) throw err;
        // Calculate Total
        total = total + (answer.stock_quantity * results.price);
        console.log("Purchase complete! Total purchase price: " + total);
      }
    );
  }
}
