// Represents each order item as a part of the order system.
/*
 * Each order item in a real world in a system will have the name, totalPrice and a quantity property.
*/

public class OrderItem {
    private String itemName;
    private double totalCost;
    private int totalQuantity;

    public OrderItem(String itemName, double totalCost, int totalQuantity) {
        this.itemName = itemName;
        this.totalCost = totalCost;
        this.totalQuantity = totalQuantity;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public String getItemName() {
        return itemName;
    }
}
