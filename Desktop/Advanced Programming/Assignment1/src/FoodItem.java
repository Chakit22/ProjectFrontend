// Represents each food item as a part of the Menu Class.
public class FoodItem {
    private int itemId;
    private String itemName;
    private double itemPrice;

    public FoodItem(int itemId, String itemName, double itemPrice){
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
    }

    public int getItemId() {
        return this.itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName(){
        return this.itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public double getItemPrice(){
        return this.itemPrice;
    }

    public void setItemPrice(double updatedPrice){
        this.itemPrice = updatedPrice;
    }
}