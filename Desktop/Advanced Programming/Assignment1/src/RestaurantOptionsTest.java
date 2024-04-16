import org.junit.Test;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import static org.junit.Assert.assertEquals;

// Test class to check the displayed output.
public class RestaurantOptionsTest {

    @Test
    public void testDisplayOptions() {
        ByteArrayOutputStream outContent = new ByteArrayOutputStream();
        // Set output stream to ByteOutputStream which will capture everything printed on the console.       
        System.setOut(new PrintStream(outContent));
        RestaurantOptions restaurantOptions = new RestaurantOptions();
        String expectedOutput = "1) Order\n2) Show sales report\n3) Update prices\n4) Exit\n";

        // Call the method.
        restaurantOptions.displayOptions();

        // Assert
        assertEquals(expectedOutput, outContent.toString());
    }
}
