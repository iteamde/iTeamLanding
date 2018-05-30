// Тип данных, представляющий отдельный мячик
function Ball(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
     this.strokeColor = "black";
    this.fillColor = "black";
   
}

// Массив, содержащий информацию обо всех мячиках на холсте
var balls = [];


function addBall() {

   
    for(var i=0;i<canvas.width*canvas.height/8000;i++){
    var ball = new Ball(Math.random()*canvas.width,Math.random()*canvas.height,(Math.random()*2-1),(Math.random()*2-1),Math.random()*1+0.2);

    // Сохраняем его в массиве
    balls.push(ball);
	}
}
$('#drawingCanvas').on('click',function(e){
	e.preventDefault();
	var ball = new Ball(e.offsetX,e.offsetY,(Math.random()*2-1)*2,(Math.random()*2-1)*2,Math.random()*0.5+0.2);

    // Сохраняем его в массиве
    balls.push(ball);
	
});

function clearBalls() {
  // Удаляем все мячики
  balls = [];
}
window.onload = function() {
	   // Определение контекста рисования
	   canvas = document.getElementById("drawingCanvas");
	   context = canvas.getContext("2d");
      canvas.width=$('#portfolio').width();
      canvas.height=$('#portfolio').height();
      $(window).resize(function() {
      canvas.width=$('#portfolio').width();
      canvas.height=$('#portfolio').height();
  });
    addBall();
		 
	   // Обновляем холст через 0.02 секунды
	   setTimeout("drawFrame()", 20);
}
function drawFrame() {
    // Очистить холст
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Вызываем метод beginPath(), чтобы убедиться,
    // что мы не рисуем часть уже нарисованного содержимого холста
    context.beginPath();

    // Перебираем все мячики
    for(var i=0; i<balls.length; i++) {
        // Перемещаем каждый мячик в его новую позицию
        var ball = balls[i];
        ball.x += ball.dx;
        ball.y += ball.dy;

        

        // Если мячик натолкнулся на край холста, отбиваем его
        if ((ball.x + ball.radius > canvas.width) || (ball.x - ball.radius < 0)) {
            ball.dx = -ball.dx;
        }

        // Если мячик упал вниз, отбиваем его, но слегка уменьшаем скорость
        if ((ball.y + ball.radius > canvas.height) || (ball.y - ball.radius < 0)) { 
            ball.dy = -ball.dy; 
        }

       

        context.beginPath();
        context.fillStyle = ball.fillColor;
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
        context.lineWidth = 1;
        context.fill();
        context.stroke();
       	
          
 			
 			 	context.beginPath();
        for(var j=i+1;j<balls.length;j++){   		
        context.lineWidth =440/((Math.pow((balls[i].x-balls[j].x),2)+Math.pow((balls[i].y-balls[j].y),2)));
      	if((context.lineWidth<0.6)&&(context.lineWidth>0.035)){
      	context.moveTo(balls[i].x,balls[i].y);
      	context.lineTo(balls[j].x,balls[j].y);

      	context.stroke();
      	}
        

        }
      
        
        
    }

    // Рисуем следующий кадр через 20 миллисекунд
    setTimeout("drawFrame()", 20);
}