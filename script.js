/* Age Category Message - Ask the user for their age. If they are under 18, print "You are a minor". If they
 are between 18 and 60, print "You are an adult". If they are above 60, print "You are a senior citizen". */

let userAge = Number(prompt("Enter your age"));

if (userAge < 18) {
  console.log("You are a Minor");
} else if (userAge > 18 && userAge < 60) {
  console.log("You are Adult");
} else if (userAge > 60) {
  console.log("You are a senior citizen");
} else {
  console.log("Invalid age entered");
}
