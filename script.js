// 17. Find the second largest number in an array.

let arr = [
  1, 5, 9, 3, 4, 7, 2, 1, 6, 13, 67, 12, 4, 9, 21, 13, 21, 5, 55, 58, 55, 58,
];

// unique values
// let uniqueArr = [...new Set(arr)];

// // sort in descending order
// let sortedArr = uniqueArr.sort(function (a, b) {
//   return b - a;
// })[1];

// console.log(sortedArr);

console.log(
  [...new Set(arr)].sort(function (a, b) {
    return b - a;
  })[1]
);
