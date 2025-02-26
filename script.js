// Console & Basic Operations (5 Questions)

//--> 1. Log "Hello, JavaScript!" to the console in 3 different ways.
console.log("Hello, World!");
console.warn("Hello, World!");
console.error("Hello, World!");
console.info("Hello, World!");
console.table({ name: "Wanijya", age: 22 });

//--> 2. Perform 35 * 2 - (10 / 2) + 7 and log the result.
var result = 35 * 2 - 10 / 2 + 7;
console.log(result);

//--> 3. Log the data type of "123", 123, true, and null using typeof.
console.log(typeof "123");
console.log(typeof 123);
console.log(typeof null);
console.log(typeof true);

//--> 4. Write a program that swaps the values of two variables.
var a = 12;
var b = 13;
var c;
c = a;
a = b;
b = c;
console.log("After swapping: a = " + a + ", b = " + b);

var a = 12;
var b = 13;
var result = ([a, b] = [b, a]);
console.log("Result: " + result);

var a = 12;
var b = 13;
a = a + b;
b = a - b;
a = a - b;
console.log("After swapping: a = " + a + ", b = " + b);

//--> 5. Use console.group() to organize logs into a group.
console.groupCollapsed("Aaj kaa Hisab!");
console.log("Paani Puri  = 50");
console.log("Neebu Paani = 20");
console.log("Daal Chaawal = 50");
console.groupEnd();
