// Create a function that takes another function as an argument and calls it after 3 seconds (HOF + Callback).

function callerfnc(fn) {
  setTimeout(fn, 3000);
}

// callerfnc(function(){
//   console.log("heyy");
// })

callerfnc(() => console.log("heyy after 3 seconds!!"));
