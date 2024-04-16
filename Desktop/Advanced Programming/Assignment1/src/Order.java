import java.util.HashMap;

// Represents a single Order placed by the user.

/*
 * HashMap<Integer, OrderItem> corresponds to HashMap<itemId, OrderItem>. Each item will have
 * an unique itemId.
 * OrderItem represents a real world item present in an invoice.
*/

public class Order {
    HashMap<Integer, OrderItem> orderList;

    public Order() {
        orderList = new HashMap<>();
    }

    public HashMap<Integer, OrderItem> getOrderList() {
        return orderList;
    }

    // Add an orderItem to the invoice.
    public void addItemToInvoice(FoodItem foodItem, int quantityOrdered) {
        int itemId = foodItem.getItemId();
        if(orderList.containsKey(itemId)) {
            OrderItem orderItem = orderList.get(itemId);
            // Get the initital cost and quantities
            int inititalQuantity = orderItem.getTotalQuantity();
            double initialCost = orderItem.getTotalCost();

            // Set the updated the cost and quantities in the invoice.
            orderItem.setTotalQuantity(inititalQuantity + quantityOrdered);
            orderItem.setTotalCost(initialCost + foodItem.getItemPrice() * quantityOrdered);
        } else {
            orderList.put(itemId, new OrderItem(foodItem.getItemName(), foodItem.getItemPrice() * quantityOrdered, quantityOrdered));
        }
    }

    // Method to calculate the total cost of the order Items.
    public double calculateTotalCost(SalesReport salesReportGenerator, Menu menu) {
        double totalCost = 0.0;
        // Output string to print 
        String out = "Total for ";
        for(Integer itemId : orderList.keySet()) {
            // Get the orderItem corresponding to an itemId.
            OrderItem orderItem = orderList.get(itemId);
            double cost = orderItem.getTotalCost();
            String itemName = orderItem.getItemName();
            int quantity = orderItem.getTotalQuantity();
            
            // Update the output string.
            out += quantity + " " + itemName;
            out += " ";
            totalCost += cost;

            // Update the total cost in the sales report by adding each unique orderItem.
            salesReportGenerator.updateSalesReport(itemId, orderItem, menu);
        }
        // Add the total cost to the output string
        out += " is $";
        out += totalCost;
        System.out.println(out);

        return totalCost;
    }
}