# Bamazon

---- 

 ## Table of contents
* [What is Bamazon](#what-is-bamazon)
* [Technologies](#technologies)
* [Files Included](#files-included)
* [Functionality](#functionality)
* [Upcomming Changes](#upcomming-changes)
* [Contributors](#contributors)

----

## What is Bamazon 

Bamazon is a amazon like app that leverages MySQL and node to allow the customer, manager and supervisor to access what's available for sale via the command Line Interface(CLI).

----

## Link to screenshots
![image](https://github.com/2019-11-18.png)

----

## Technologies

* [npm](https://www.npmjs.com/)

    - npm is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry.

    *[npm i cli-table]
    -This utility allows you to render unicode-aided tables on the command line from your node.js scripts.

    *[npm i inquirer]
    Inquirer.js strives to be an easily embeddable and beautiful command line interface for Node.js (and perhaps the "CLI Xanadu").

    Inquirer.js should ease the process of

    providing error feedback
    asking questions
    parsing input
    validating answers
    managing hierarchical prompts

    *[npm i mysql] 
    This is a node.js driver for mysql. It is written in JavaScript, does not require compiling, and is 100% MIT licensed.


* [mySQL](https://www.mysql.com/)

    - MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language. 

----

## Files 

* root
    * README.MD
* mySQL
    * Bamazon 
        * Table: products
* js
    * bamazon.js - customer file
    * banazonManager.js
    * banazonSupervisor.js

----

## Functionality

* Install - 
    npm init
    npm install
    npm i cli-table
    npm i msql
    npm i inquirer

* To view Customer interface type node bamazon.js into the command line.

Customer Experience
* Customer sees a table with 10 items for sale under the following column headings: 
    * Item ID
    * Product Name
    * Price
    * Quantity

* Customer questions follow: 
    * Please provide the ID of the product you would like to purchase.
        * User puts in the item ID number
    * How many items would you like to purchase? 
        *User puts in the item quantity

        * Based on stock availablity customer will receive one of two messages:
            * Stock Available:
                * Thank you for your order. Your total cost is XXXX.
            * Stock Not Available
                * Apologies, we ran out of stock. Please pick another item.

* MySQL 
    * Stock Available:
        * Database is updated.
    * Stock Not Available
        * No impact on the database.

    
