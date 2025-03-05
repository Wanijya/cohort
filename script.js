// Implement a function that limits how many times another function can be called (Closure + HOF).

function fnlimiter(fn, limit) {
  let totalCallback = 0;
  return function () {
    if (totalCallback < limit) {
      totalCallback++;
      fn();
    }else{
      console.error("limit reached");
    }
  };
}

var limiter = fnlimiter(() => console.log("heyy"), 3);
limiter();
limiter();
limiter();
limiter();
