// Write a function that uses closures to create a counter.

function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}
var fn = counter();
fn();
fn();
fn();
fn();

