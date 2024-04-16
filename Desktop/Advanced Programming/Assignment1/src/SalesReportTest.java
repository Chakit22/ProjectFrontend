import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class SalesReportTest {

    private SalesReport salesReport;
    private Inventory inventory;
    private Menu menu;

    @Before
    public void initializeObjects() {
        salesReport = new SalesReport();
        inventory = new Inventory();
        menu = new Menu();
    }

    @Test
    public void testUpdateSalesReport() {
        // Burrito
        OrderItem burritoOrderItem1 = new OrderItem("Burrito", 13.34, 4);
        OrderItem burritoOrderItem2 = new OrderItem("Burrito", 11.25, 2);
        salesReport.updateSalesReport(1, burritoOrderItem1, menu);
        salesReport.updateSalesReport(1, burritoOrderItem2, menu);

        // Fries
        OrderItem friesOrderItem1 = new OrderItem("Fries", 9.27, 3);
        OrderItem friesOrderItem2 = new OrderItem("Fries", 6.54, 2);
        salesReport.updateSalesReport(2, friesOrderItem1, menu);
        salesReport.updateSalesReport(2, friesOrderItem2, menu);
        
        // Test the name, quantity and totalcost
        SalesRecord burritoSalesRecord = salesReport.sales.get(1);
        assertEquals("Burrito", burritoSalesRecord.getItemName());
        assertEquals(24.59, burritoSalesRecord.getTotalCost(), 0.01);
        assertEquals(24.596, burritoSalesRecord.getTotalCost(), 0.01);
        assertEquals(6, burritoSalesRecord.getTotalQuantity());
        
        // Test the name, quantity and totalcost
        SalesRecord friesSalesRecord = salesReport.sales.get(2);
        assertEquals("Fries", friesSalesRecord.getItemName());
        assertEquals(15.815, friesSalesRecord.getTotalCost(), 0.01);
        assertEquals(15.805, friesSalesRecord.getTotalCost(), 0.01);
        assertEquals(5, friesSalesRecord.getTotalQuantity());
    }
}
