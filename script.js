var btn = document.querySelector('button');
var body = document.querySelector("body");

btn.addEventListener('click', function(){

    var x = Math.random()*100;
    var y = Math.random()*100;
    
    

    var img = document.createElement('img');
    img.setAttribute('src','./Chhota-Bheem-PNG.png');
    img.style.height = '100px';
    img.style.position = 'absolute';
    img.style.left = x+'%';
    img.style.top = y+'%';

    body.appendChild(img);
})