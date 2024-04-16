import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class InventoryTest {
    private Inventory inventory;

    @Before
    public void setUp() {
        inventory = new Inventory();
    }

    @Test
    public void testUpdateRemainingFries() {
        // Initial remaining fries
        inventory.setRemainingFries(3);

        // Update remaining fries when 5 serves of new fries are ordered.
        inventory.updateRemainingFries(5);

        // Verify remaining fries after update
        assertEquals(3, inventory.getRemainingFries());

        // Update remaining fries when 2 serves of new fries are ordered.
        inventory.updateRemainingFries(2);

        // Verify remaining fries after update
        assertEquals(1, inventory.getRemainingFries());

        // Update remaining fries when 3 serves of new fries are ordered.
        inventory.updateRemainingFries(3);

        // Verify remaining fries after update
        assertEquals(3, inventory.getRemainingFries());
    }
}
