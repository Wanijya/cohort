// WAP to find CI

let p = Number(prompt("Enter Principle"));
let r = Number(prompt("Enter a rate"));
let t = Number(prompt("Enter a time"));

// A = P * (1 + r/100)^t
// CI = A - P
console.log((p * Math.pow(1 + r / 100, t)) - p);
