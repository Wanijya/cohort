// 19. Reverse an array without using .reverse().

let num = [1,23,4,5,7,8,10]
let arr = [];

for (let i = num.length - 1; i >= 0; i--) {
  arr.push(num[i]);
}

console.log(arr);

