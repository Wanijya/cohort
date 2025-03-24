// WAP to accept an int and check whether it is an even or odd number.

let num = Number(prompt("Enter a number: "));

if (num % 2 == 0) {
  console.log(`${num} is an even number.`);
} else {
  console.log(`${num} is an odd number.`);
}
