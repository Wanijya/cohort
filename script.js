// Implement a function that takes a callback and only executes it once (HOF + Closure).

function onlyOnceCaller(cb){
  let excuted = false;
  return function(){
    if(!excuted){
      excuted = true;
      cb();
    } else {
      console.error("Only Executed Once");
    }
  }
}

var newFun = onlyOnceCaller(function(){
 console.log("ran");
});

newFun();
newFun();
newFun();