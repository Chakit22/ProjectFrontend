import java.util.InputMismatchException;
import java.util.Scanner;

public class BurritoKing {
    private Scanner input;

    public BurritoKing() {
        input = new Scanner(System.in);
    }

    // Function to manage transaction
    public void orderCheckout(double totalCost) {
        double moneyGiven = 0.0;
        do {
            System.out.print("Please enter money: ");
            try {
                moneyGiven = this.input.nextDouble();
                if (moneyGiven < 0.0) {
                    System.out.println("Please enter a positive value.");
                    continue;
                }
            } catch(InputMismatchException e) {
                System.out.println("Invalid input. Please enter a valid amount.");
                this.input.nextLine();
                continue;
            }
            if(moneyGiven < totalCost) System.out.println("Sorry, that’s not enough to pay for order.");
        } while(moneyGiven < totalCost);

        if (moneyGiven >= totalCost) {
            double changeToReturn = moneyGiven - totalCost;
            if(changeToReturn == 0) {
                System.out.println("No Change due!");
            } else {
                System.out.println("Change returned " + "$" + changeToReturn);
            }
        }
    }

    public void orderFood(Menu menu, Kitchen kitchen, SalesReport salesReport, Inventory inventory) {
        // Create a new order object
        Order order = new Order();

        // Default itemId is -1.
        int itemId = -1;

        // Get menuSize
        int menuSize = menu.getItemsList().size();

        do {
            // Display the various food items.
            System.out.println("\n> Select the Food item");
            menu.displayItems();

            System.out.print("Please select: ");
            try {
                itemId = this.input.nextInt();
            } catch(InputMismatchException e) {
                System.out.println("Please enter a valid itemId.");
                this.input.nextLine();
                continue;
            }

            if (itemId >= 1 && itemId <= menuSize) {
                String itemName = menu.getItemsList().get(itemId - 1).getItemName();
                double itemPrice = menu.getItemsList().get(itemId - 1).getItemPrice();

                System.out.print("How many " + itemName + " would you like to buy: ");
                
                try {
                    int quantity = this.input.nextInt();

                    if (quantity < 0) {
                        System.out.println("please enter a positive value for quantity.");
                        continue;
                    }

                    // Add the order Items to invoice.
                    order.addItemToInvoice(new FoodItem(itemId, itemName, itemPrice), quantity);

                    // If the item is fries or we have ordered a meal then we have to update the remainingFries
                    if (itemId == 2 || itemId == 4) {
                        // Quantity for fries and order remains the same.
                        inventory.updateRemainingFries(quantity);
                    }
                } catch(InputMismatchException e) {
                    System.out.println("Please enter a valid quantity!");
                    this.input.nextLine();
                    continue;
                }
            } else if (itemId == menuSize + 1) {
                // Nothing to be ordered more.
                if (order.getOrderList().isEmpty()) {
                    // No items ordered. The customer saw the menu and didn't order anything.
                    System.out.println("No food items ordered!");
                    return;   
                }

                // Calculate the total preparation time.
                int prepTime = kitchen.calculateOrderPreparationTime(order, menu);

                // display total cost.
                double totalCost = order.calculateTotalCost(salesReport, menu);

                // Manage the money
                this.orderCheckout(totalCost);

                // Display time
                System.out.println("Time taken: " + (int)prepTime + " minutes.");
            } else {
                System.out.println("Please enter a valid itemId.");
                continue;
            }
        } while(itemId != menuSize + 1);
    }

    // function for updating the prices in a Menu
    public void updatePrice(Menu menu) {
        // Display the menu items to update prices for
        menu.displayItems();

        // Get menuSize
        int menuSize = menu.getItemsList().size();

        do {
            try {
                // Select a Menu item to update price for.
                System.out.print("Please enter ItemId to update the price for: ");
                int itemId = this.input.nextInt();

                // itemId can also not be equal to menuSize as the last item is a Meal so.
                if (itemId >= menuSize || itemId < 1) {
                    System.out.println("Please enter valid itemId's.");
                    continue;
                }
        
                System.out.print("Please enter the new price: ");
                double price = this.input.nextDouble();
                // itemId can also not be equal to menuSize as the last item is a Meal so.
                if (price < 1.0) {
                    System.out.println("Item price should be greater than or equal to 1.0 ");
                    continue;
                }

                menu.updatePrice(itemId, price);
                break;
            } catch(InputMismatchException e) {
                System.out.println("Please enter valid values for itemId and price.");
                this.input.nextLine();
            }
        } while(true);
    }

    // Open the restaurant
    public void openRestaurant() {
        // Load the menu in the system
        Menu menu = new Menu();

        // Create a new Kitchen object
        Kitchen kitchen = new Kitchen();

        // Create a new Restaurant options object
        RestaurantOptions restaurantOptions = new RestaurantOptions();

        // Create a new SalesReport object
        SalesReport salesReport = new SalesReport();

        // Create a new InventoryObject
        Inventory inventory = new Inventory();

        // Keep a default option.
        int option = -1;

        do {
            // Display the restaurant name
            System.out.println("\n===============================================================");
            System.out.println("Burrito King");
            System.out.println("===============================================================\n");

            // Display different Options like order, sales report, exit etc.
            restaurantOptions.displayOptions();

            // Select a Restaurant Option
            System.out.print("Please select: ");

            try {
                option = this.input.nextInt();
            } catch(InputMismatchException e) {
                System.out.println("Please enter a valid Restaurant Option.");
                this.input.nextLine();
                continue;
            }

            if(option > 4 || option < 1) {
                System.out.println("Please enter a valid Restaurant Option.");
                continue;
            }
            
            switch (option) {
                case 1:   // Order option.   
                            this.orderFood(menu, kitchen, salesReport, inventory);
                            break;

                case 2:   // Printing the sales report
                            salesReport.displaySalesReport(inventory);
                            break;

                case 3:   // Updating prices
                            this.updatePrice(menu);
                            break;

                case 4:   	System.out.println("Bye Bye."); 
                            break;
            }
            System.out.println();
        } while(option != 4);
    }

    public static void main(String[] args) {
        // Create a new object for restaurant
        BurritoKing burritoKing = new BurritoKing();
        burritoKing.openRestaurant();
        return;
    }
}