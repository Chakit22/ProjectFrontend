import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

// As order's are prepared in the Kitchen they are reponsible for the preparation time.
public class Kitchen {
    // Time to prepare Soda is 0.
    private List<Integer> prepTimesList;

    public Kitchen() {
        prepTimesList = new ArrayList<>();
        // This is in the same order as of the menu items.
        /*
         * 1 -> Burrito : 9
         * 2 -> Fries   : 8
         * 3 -> Soda    : 0
         */
        prepTimesList.add(9);
        prepTimesList.add(8);
        prepTimesList.add(0);
    }

    // method to calculate the preparation time for an order.
    public int calculateOrderPreparationTime(Order order, Menu menu) {
        HashMap<Integer, OrderItem> orderList = order.getOrderList();
        int timeForBurrito = 0, timeForFries = 0; 
        int menuSize = menu.getItemsList().size();
        
        if(orderList.isEmpty()) {
            // No items ordered. The customer saw the menu and didn't order anything.
            System.out.println("No food items ordered!");
            return 0;
        }

        // Calculate meal quantity
        int mealQuantity = 0;
        if (orderList.containsKey(menuSize)) {
            mealQuantity = orderList.get(menuSize).getTotalQuantity();
        }

        // Calculate the time for burrito and fries.
        if (orderList.containsKey(1)) {
            int burritoQuantity = orderList.get(1).getTotalQuantity() + mealQuantity;
            int burritoTimePerServe = prepTimesList.get(0);
            timeForBurrito = ((burritoQuantity + 1) / 2) * burritoTimePerServe;
        }
        
        if (orderList.containsKey(2)) {
            int friesQuantity = orderList.get(2).getTotalQuantity() + mealQuantity;
            int friesTimePerServe = prepTimesList.get(1);

            if(friesQuantity % 5 == 0) { 
                timeForFries = (friesQuantity / 5) * friesTimePerServe;
            } else {
                timeForFries = ((friesQuantity + 5) / 5) * friesTimePerServe;
            }
        }

        // As both the dishes are prepared in parallel, the time to prepare will be maximum of both of them.
        return Math.max(timeForBurrito, timeForFries);
    }
}