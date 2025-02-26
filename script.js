//--> 8. Check if "JavaScript" contains "Script" without using .includes().
let str = "JavaScript";
// console.log(str.includes("Script"));

if (str.indexOf("Script") === -1) {
  console.log(false);
} else {
  console.log(true);
}

console.log(str.indexOf("Script") !== -1);

if (str.search("Script") === -1) {
  console.log(false);
} else {
  console.log(true);
}

console.log(str.search("Script") !== -1);
