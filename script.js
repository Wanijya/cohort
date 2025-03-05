// Implement your own version of `.map()` as a higher-order function.

var arr = [1, 2, 3, 4, 5];

function myMap(arr, func) {
  var newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(func(arr[i]));
  }
  return newArr;
}

var ans = myMap(arr, function (val) {
  return val + 2;
});
