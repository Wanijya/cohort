// Shop Discount on Graphic

let amount = Number(prompt("Enter the amount of your purchase: "));
let discount = 0;

if (amount >= 0 && amount <= 5000) {
  discount = 0;
} else if (amount > 5000 && amount <= 7000) {
  discount = 5;
} else if (amount > 7000 && amount <= 9000) {
  discount = 10;
} else if (amount > 9000) {
  discount = 20;
} else {
  console.log("Invalid amount.");
}

console.log(amount - (discount * amount) / 100);
