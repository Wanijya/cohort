// 16. Remove duplicate values from an array

let arr = [1,2,1,3,4,6,3,2,5,5,12,13,12,9,1];

let uniqueArr = [...new Set(arr)];
console.log(uniqueArr);