package ticketmachine;

public class TicketDemo {
	
	public static void main(String[] args) {
		TicketMachine machine1 = new TicketMachine(100);
		System.out.println(machine1.getPrice());
		machine1.insertMoney(10);
		
	}
	
	public static class  TicketMachine{
		private int price = 1;
		private int balance = 0;
		int total = 0;
		private int ticketId = 0;
		// constructor
		public TicketMachine(int cost) {
			price = cost;
			if (price < 0) {
				price = 0;
			}
		}
//		getter
		public int getPrice() {
			return price;
		}
		public int getBalance() {
			return balance;
		}
		public void getTotal() {
			System.out.println("Total sold amount (cent):" + total);
		}
//		setter
		public void insertMoney( int amount) {
			balance += amount;
			if (amount > price) {
				System.out.println("change: ");
			}
		}
//		custom methgds
		public void printTicket() {
			for (int i = 0; i < balance/price; i++) {
			System.out.println();
			System.out.println("#############");
			System.out.println("# The Ticket Line");
			System.out.println("# Ticket ID: " + ++ticketId);
			System.out.println("# " + price + " cents.");
			System.out.println("##############");
			}
			total += balance;
			balance = 0;
		}
	}
}



	
