package drinkmachine;

public class AutoMachine {
	String drinkName;
	int drinkPrice;
	public AutoMachine (String drinkName, int drinkPrice) {
		this.drinkName = drinkName;
		this.drinkPrice = drinkPrice; 
	}
//	getter method
	public double getPrice() {
		return this.drinkPrice;
	}
//	payment
	public void payment(int amount) {
		if (amount == drinkPrice) {
			System.out.println("Thank you ta Pepsi awlaa");
		} else if (amount > drinkPrice) {
			amount -= drinkPrice;
			System.out.println("Change: " + amount + " Thank you ta Pepsi awlaa");
		} else if (amount < drinkPrice) {
			drinkPrice -= amount;
			System.out.println(drinkPrice + " Nemj hiine uu ");
		} else {
			System.out.println("Mungu uu hiine uu");
		}
	}
}
