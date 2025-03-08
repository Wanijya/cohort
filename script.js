// Implement a function that throttles another function (HOF + Closures).

function throt(fn, delay) {
  let lastCall = 0;
  return function () {
    let current = Date.now();
    if (current - lastCall >= delay) {
      lastCall = current;
      fn();
    }
  };
}

var newfunc = throt(function(){
  console.log('will run in 2 seconds');
}, 2000);

newfunc();