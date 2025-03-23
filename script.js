// WAP to calculate area of triangle using Heron's formula

let a = Number(prompt("Enter the first side of the triangle: "));
let b = Number(prompt("Enter the second side of the triangle: "));
let c = Number(prompt("Enter the third side of the triangle: "));

/*
 heros formula = sqrt of s * (s-a) * (s-b) * (s-c)
  where s = (a+b+c)/2
*/
if (a + b <= c || a + c <= b || c + b <= a) {
  console.log("Triangle is not possible with the given sides");
} else {
  let s = (a + b + c) / 2;
  console.log(Math.sqrt(s * (s - a) * (s - b) * (s - c)));
}
