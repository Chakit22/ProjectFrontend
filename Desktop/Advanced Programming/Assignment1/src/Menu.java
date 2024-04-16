import java.util.ArrayList;
import java.util.List;

// Represents the Menu of the restaurant.

/* Predefined list of Item IDs
 * 1 ->  Burritto
 * 2 ->  Fries
 * 3 ->  Soda
 * 4 ->  Meal (1 Burrito, 1 Fries, 1 Soda). Meal is not considered a different food Item but it breaks down to 
various fooditems.
*/

public class Menu {
    private List<FoodItem> itemsList;

    public Menu() {
        itemsList = new ArrayList<>();
        itemsList.add(new FoodItem(1,"Burrito", 7));
        itemsList.add(new FoodItem(2, "Fries", 4));
        itemsList.add(new FoodItem(3, "Soda", 2.5));
        itemsList.add(new FoodItem(4, "Meal", (7 + 4 + 2.5) - 3));
    }

    public List<FoodItem> getItemsList() {
        return itemsList;
    }

    // Method to display all the items as a part of the Menu
    public void displayItems() {
        int noOfItems = this.itemsList.size();
        for(int i=0;i<noOfItems;++i){
            System.out.println(i+1 + ") " + (this.itemsList.get(i)).getItemName());
        }
        System.out.println(noOfItems + 1 + ") " + "No more");
    }

    // Method to update the price of a food item.
    public void updatePrice(int itemId, double updatedPrice) {
        int menuSize = this.itemsList.size();
        // Update the Meal prices.
        double inititalItemCost = this.itemsList.get(itemId - 1).getItemPrice();
        double initialMealCost = this.itemsList.get(menuSize - 1).getItemPrice();

        double updatedMealCost = initialMealCost - inititalItemCost + updatedPrice;
        this.itemsList.get(menuSize - 1).setItemPrice(updatedMealCost);

        // Update the price of a Fooditem
        this.itemsList.get(itemId - 1).setItemPrice(updatedPrice);
    }
}