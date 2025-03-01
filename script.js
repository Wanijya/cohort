// 20. Find the most frequent element in an array.

let arr = [3, 4, 1, 3, 4, 6, 7];
let obj = {};

arr.forEach(function (val) {
  obj[val] === undefined ? (obj[val] = 1) : obj[val]++;
});
