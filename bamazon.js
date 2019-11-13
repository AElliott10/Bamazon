//Connect the database
var mysql = require("mysql");
var inquirer = require("inquirer");

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
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results, fields) {
    if (err) throw err;
    console.log(results);
    orderQuestions();
  });
}

function orderQuestions() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "item_id",
        type: "input",
        message: "Please provide the ID of the product you would like to purchase."
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many items would you like to purchase?"
      },
    ])
      // determine if enough stock

      .then(function (answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.choice) {
            chosenItem = results[i];
          }
        }

        if (chosenItem.stock_quantity < parseInt(answer.stock_quantity)) {
          // stock is sufficient, decrease inventory amount by the amount requested.
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: answer.quantity
              },

              {
                item_id: chosenItem.id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Purchase complete!");
              itemsForSale();
            }
          );
        }
        else {
          // else send message "Insufficent quantity
          console.log("Insufficent quantity, please pick another item.");
          itemsForSale();
        }
      });
  });
}
/*App prompts user with two messages
Message one - Please provide the ID of the product you would like to purchase.
Message two - How many items would you like to purchase?*/





