// Represents the sales Record for a single item for the day.
public class SalesRecord {
    private String itemName;
    private int totalQuantity;
    private double totalCost;

    public SalesRecord(String itemName, int totalQuantity, double totalCost) {
        this.itemName = itemName;
        this.totalQuantity = totalQuantity;
        this.totalCost = totalCost;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public String getItemName() {
        return itemName;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public double getTotalCost() {
        return totalCost;
    }
}
