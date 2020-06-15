window.onload = function() {
  //Create canvas
  const canvas = document.getElementById('gameBoard');
  const ctx = canvas.getContext('2d');
 
  //Start object ball at bottom middle position
  let x = canvas.width/2;
  let y = canvas.height - 30;

  //Set direction of ball movement
  let dx = 2;
  let dy = -2;

  // Store ball radius
  const ballRadius = 10;

  // Ball color
  let ballColor = 'rgb(187, 0, 0)';

  // Paddle measurements
  let paddleHeight = 10;
  let paddleWidth = 75;
  let paddleX = (canvas.width - paddleWidth) / 2;

  // Paddle keys
  let rightPressed = false;
  let leftPressed = false;

  // Paddle event listeners
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  // Paddle event handling
  function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      rightPressed = true;
    }
    if (e.key == 'Left' || e.key == 'ArrowLeft') {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
      rightPressed = false;
    }
    if (e.key == 'Left' || e.key == 'ArrowLeft') {
      leftPressed = false;
    }
  }

  // Add paddle movement functionality
  function paddleMovement() {
    // if right key pressed is true
    if (rightPressed) {
      // Move paddle 7px right and set paddle to far right if limit of canvas is reached 
      paddleX += 7;
      if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
      }
    }
    // if left key pressed is true
    else if (leftPressed) {
      // Move paddle 7px left and set paddle to far left if limit of canvas is reached 
      paddleX -= 7;
      if (paddleX < 0) {
        paddleX = 0;
      }
    }
  }

  // Random number between 0 and 100;
  function getRandomNum1to100() {
    return ~~(Math.random() * 100);
  }

  // Create object ball
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
  }

  // Create paddle
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#ccc';
    ctx.fill();
    ctx.closePath(); 
  }


  // Detect collision
  function detectCollision() {
    if (y + dy < ballRadius/2) {
      dy = -dy;
      ballColor = `rgb(187, ${getRandomNum1to100()}, 0)`;
    } 
    else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      }
      else {
        gameOver();
      }
    }
    else if (x + dx < ballRadius/2 || x + dx > canvas.width - ballRadius/2) {
      dx = -dx;
      ballColor = `rgb(187, ${getRandomNum1to100()}, 0)`;
    }
  }

  // Draw and update canvas
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    detectCollision();
    paddleMovement();
    x += dx;
    y += dy;
  }
  
  function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '40px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2);
    clearInterval(interval)
    createGameOverBtn();
  }

  function createGameOverBtn() {
    const gameOverBtn = document.createElement('button');
    const btnArea = document.querySelector('.btnArea')
    gameOverBtn.appendChild(document.createTextNode('RESTART'));
    btnArea.appendChild(gameOverBtn);
    gameOverBtn.addEventListener('click', () => {
      document.location.reload();
    })
  }

  // Call draw() every 10 ms
  const interval = setInterval(draw, 10);
}

































