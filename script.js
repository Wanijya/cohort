// WAP to check the year is leap year or not.

let year = Number(prompt("Enter a year: "));

if (year % 4 == 0) {
  if (year % 100 == 0) {
    if (year % 400 == 0) {
      console.log("Leap year");
    } else {
      console.log("Not a leap year");
    }
  } else {
    console.log("Leap year");
  }
} else {
  console.log("Not a leap year");
}
