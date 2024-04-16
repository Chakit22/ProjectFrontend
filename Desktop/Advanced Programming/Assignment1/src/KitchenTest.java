import static org.junit.Assert.assertEquals;
import org.junit.Before;
import org.junit.Test;

public class KitchenTest {
    private Kitchen kitchen;
    private Order order;
    private Menu menu;

    @Before
    public void initializeObjects() {
        kitchen = new Kitchen();
        order = new Order();
        menu = new Menu();
    }

    @Test
    public void testOrderPrepTime_NoItemsOrdered() {
        int result = kitchen.calculateOrderPreparationTime(order, menu);
        assertEquals(0, result);
    }
    
    @Test
    public void testOrderPrepTime_SodaOnly() {
        order.addItemToInvoice(new FoodItem(3, "Soda", 2.5), 5);
        int result = kitchen.calculateOrderPreparationTime(order, menu);
        assertEquals(0, result);
    }

    // Test case to assert order preparation time when all items are added.    
    @Test
    public void testOrderPrepTime() {
        order.addItemToInvoice(new FoodItem(1, "Burrito", 7.0), 5);
        order.addItemToInvoice(new FoodItem(3, "Soda", 2.5), 10);
        order.addItemToInvoice(new FoodItem(2, "Fries", 4.0), 14);
        order.addItemToInvoice(new FoodItem(4, "Meal", 10.5), 5);
        // Individual + Meal
        int totalBurritos = 5 + 5, totalFries = 14 + 5;
        int burritoPrepTime = ((10 + 1) / 2) * 9, friesPrepTime = ((19 + 5) / 5) * 8;
        int result = kitchen.calculateOrderPreparationTime(order, menu);
        assertEquals(Math.max(burritoPrepTime, friesPrepTime), result);
    }
}