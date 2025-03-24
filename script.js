// WAP accept name and age from the user. Check if the user is valid voter or not.

let age = Number(prompt("Enter a age:"));
let username = prompt("Enter your name:");

if (age >= 18) {
  console.log(`Hello ${username}, you are eligible to vote.`);
} else if (age < 18) {
  console.log(`Hello ${username}, you are not eligible to vote.`);
} else {
  console.log("Invalid input");
}
