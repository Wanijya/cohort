// 18. Sort an array in descending order.

let numbers = [5, 3, 8, 1, 9];

let sortArr = numbers.sort(function (a, b) {
  return b - a;
});
console.log(sortArr);
