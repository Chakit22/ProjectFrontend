import java.util.HashMap;

// Class to maintain and display the individual sales report.
public class SalesReport {
    HashMap<Integer, SalesRecord> sales;

    public SalesReport() {
        sales = new HashMap<>();
    }

    public void updateSalesReportHelper(int itemId, Menu menu, int quantityOrdered){
        // Method to handle the case when a meal is ordered, to break the meal into three order items.
        for(int id=1;id<menu.getItemsList().size();++id) {
            // Get the corresponding foodItem
            FoodItem foodItem = menu.getItemsList().get(id - 1);

            // For each of the food items create a new orderItem and pass it in updateSales.
            OrderItem orderItem = new OrderItem(foodItem.getItemName(), (foodItem.getItemPrice() - 1) * quantityOrdered, quantityOrdered);
            updateSalesReport(id, orderItem, menu);
        }
    }

    // method to update the sales after an order is placed.
    public void updateSalesReport(int itemId, OrderItem orderItem, Menu menu) {
        if (sales.containsKey(itemId)) {
            // Sales record of this item is already added so just update it.
            SalesRecord salesRecord = sales.get(itemId);

            // Get the initial values of quantity and cost.
            double initialCost = salesRecord.getTotalCost();
            int inititalQuantity = salesRecord.getTotalQuantity();

            // Update the cost and quantity with the new values.
            salesRecord.setTotalCost(initialCost + orderItem.getTotalCost());
            salesRecord.setTotalQuantity(inititalQuantity + orderItem.getTotalQuantity());
            sales.put(itemId, salesRecord);
        } else {
            if (itemId == menu.getItemsList().size()) {
                // Last food item is always a meal.
                updateSalesReportHelper(itemId, menu, orderItem.getTotalQuantity());
            } else {
                // Create a new record as this item is not a part of the current salesRecord.
                SalesRecord salesRecord = new SalesRecord(orderItem.getItemName(), orderItem.getTotalQuantity(), orderItem.getTotalCost());
                sales.put(itemId, salesRecord);
            }
        }
    }

    public void displaySalesReport(Inventory inventory) {
        System.out.println("Unsold serves of fries : " + inventory.getRemainingFries());
        System.out.println();
        System.out.println("Total sales: ");

        double totalQuantity = 0,totalCost = 0.0;
        for(Integer itemId: sales.keySet()) {
            SalesRecord salesRecord = sales.get(itemId);
            System.out.println(salesRecord.getItemName() + ":   " + (int)salesRecord.getTotalQuantity() + "   $" + salesRecord.getTotalCost());
            totalQuantity += salesRecord.getTotalQuantity();
            totalCost += salesRecord.getTotalCost();
        }

        System.out.println("----------------------");
        System.out.println("		" + (int)totalQuantity + "      $" + totalCost);
    }
}