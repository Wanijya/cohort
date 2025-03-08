// Create a function that takes a callback and executes it after every `n` seconds indefinitely.

function baarbaarchalao(fn, time) {
  setInterval(fn, time);
}

baarbaarchalao(function () {
  console.log("Hey there!");
}, 2000);
