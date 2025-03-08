// Implement a function that returns a function with a preset greeting (Closure).

function greet(greeting){
  return function(name) {
    console.log(`${greeting} ${name}`);
  }
}

var greetingfun = greet("heloo");
greetingfun("Wanijya");
greetingfun("Amit");

var spanishFun = greet("Hola");
spanishFun("Wanijya");