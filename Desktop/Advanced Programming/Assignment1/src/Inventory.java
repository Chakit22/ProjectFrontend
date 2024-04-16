// Class meant to store the remainingFries as a part of the Inventory.
public class Inventory {
    private int remainingFries;

    public Inventory() {
        this.remainingFries = 0;
    }

    public int getRemainingFries() {
        return this.remainingFries;
    }

    public void setRemainingFries(int remainingFries) {
        this.remainingFries = remainingFries;
    }

    // Method to update the remainingFries
    public void updateRemainingFries(int currentServesOfFries) {
        if(currentServesOfFries > this.remainingFries) {
            // Have to cook more fries.
            System.out.println("Cooking fries; please be patient");
            // Update remaining fries
            int remainingFriesToBeCooked = currentServesOfFries - this.remainingFries;
            int friesForNextOrder = (5 - remainingFriesToBeCooked % 5) % 5;
            System.out.println(friesForNextOrder + " serves of fries left for next order.\n");
            // Update remaining fries
            this.setRemainingFries(friesForNextOrder);
        } else {
            this.setRemainingFries(this.remainingFries - currentServesOfFries);
        }
    }
}
