# BurritoKing

BurritoKing is a Java based application which simulates a real restuarant with functionalities like placing an order, updating the Inventory, getting the Daily Sales Report etc. It follows an Object Oriented Programming Approach and uses various programming concepts.

# Class Files and Structure
<img width="926" alt="Screenshot 2024-04-16 at 2 56 30 PM" src="https://github.com/Chakit22/BurritoKing/assets/118890138/d5a788bf-1226-4933-99b1-0130bd03e388">

Consider the above image which consists of various classes as a part of this application.

Let's dive deep into each of these classes,

Certainly! Here are the points formatted for inclusion in the README.md file:

1. **BurritoKing.java**
   - BurritoKing class represents a restaurant management system, providing functions for order management, menu updating, and restaurant operation.
   - It facilitates food ordering, transaction management, menu price updating, and restaurant option selection through user interaction.

2. **FoodItem.java**
   - FoodItem class defines individual food items available on the menu, storing item details such as ID, name, and price.
   - It offers methods for accessing and modifying item attributes within the restaurant system.

3. **Inventory.java**
   - Inventory class manages the remaining servings of fries within the restaurant's inventory, ensuring availability for orders.
   - It includes functionality to update and track the remaining fries quantity based on customer orders.

4. **Kitchen.java**
   - Kitchen class handles order preparation and calculates preparation time for items based on the kitchen's capabilities.
   - It determines the time required to prepare orders and manages parallel preparation of different dishes.

5. **Menu.java**
   - Menu class represents the restaurant menu, containing a list of available food items along with their prices and IDs.
   - It provides methods for displaying menu items and updating prices for individual items or meal packages.

6. **Order.java**
   - Order class represents a customer's order, containing a list of ordered items and their quantities for invoice generation.
   - It manages adding items to the order, calculating the total cost, and updating sales records upon order completion.

7. **OrderItem.java**
   - OrderItem class represents an individual item within a customer's order, storing details such as name, total cost, and quantity.
   - It facilitates accessing and updating item attributes within the order system.

8. **RestaurantOptions.java**
   - RestaurantOptions class provides options for interacting with the restaurant system, including ordering, viewing sales reports, updating prices, and exiting.
   - It presents a menu of available options for users to choose from during their interaction with the system.

9. **SalesRecord.java**
   - SalesRecord class represents the sales record for a specific food item within a given period, storing details such as quantity sold and total revenue.
   - It encapsulates information about individual sales for effective tracking and reporting.

10. **SalesReport.java**
    - SalesReport class generates and displays sales reports, including details of total sales, quantity sold, and revenue earned for each item.
    - It also provides information on unsold servings of fries in the inventory.
   

### Exception Handling:
- The Java files include exception handling mechanisms, primarily using `try-catch` blocks to manage potential errors such as `InputMismatchException` during user input validation. These ensure the smooth execution of operations and maintain the usability of the restaurant management system by gracefully handling incorrect inputs and preventing unexpected program crashes / termination.

# JUnit Test Files Structure

### InventoryTest.java:

1. The `testUpdateRemainingFries` method in `InventoryTest` class verifies the correct behavior of updating the remaining fries count in the `Inventory` class.
2. It covers various scenarios such as updating fries count with different quantities ordered and ensures the accurate calculation of the remaining fries count after each update.

### KitchenTest.java:

1. In `KitchenTest` class, the `testOrderPrepTime` method evaluates the calculation of order preparation time in the `Kitchen` class.
2. It tests the preparation time for different combinations of ordered items, including scenarios with no items ordered, only soda ordered, and multiple items ordered, ensuring accurate time calculation.

### RestaurantOptionsTest.java:

1. The `testDisplayOptions` method in `RestaurantOptionsTest` class validates the correct display of restaurant options in the `RestaurantOptions` class.
2. It ensures that the displayed options match the expected output, covering the functionality of displaying options for ordering, showing sales reports, updating prices, and exiting the program.

### SalesReportTest.java:

1. In `SalesReportTest` class, the `testUpdateSalesReport` method assesses the functionality of updating sales records in the `SalesReport` class.
2. It tests the accurate updating of sales records for different items and quantities, verifying the correct calculation of total quantities and costs in the sales report.

### Running the Application
To run the Burrito King Application, follow these steps:

Compile the Java files using the following command in the terminal or command prompt:
```
javac src/*.java
```
Run the application with the following command:
```
java src/BurritoKing.java
```
The application will start, and you can interact with the main menu by entering the corresponding numbers for the desired operations.

### Running Test Cases
The application includes test cases.

Run the test cases with the following commands:

```
java -cp .:junit-4.XX.jar:hamcrest-core-1.3.jar org.junit.runner.JUnitCore InventoryTest KitchenTest RestaurantOptionsTest SalesReportTest
```
