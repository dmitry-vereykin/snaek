// Draws the Body of the Snaek, the
let draw_module = (function () {
    let snake_body_function = function (x, y) {
        // Border of Snake Body Box
        canvas_context.strokeStyle = 'darkgreen';
        canvas_context.strokeRect(x*snake_size, y*snake_size, snake_size, snake_size);
        // Fill of Snake Body Box
        canvas_context.strokeStyle = 'darkgreen';
        canvas_context.strokeRect(x*snake_size, y*snake_size, snake_size, snake_size);
    };

    let food_function = function (x, y) {
        // Border of Food Box
        canvas_context.fillStyle = 'yellow';
        canvas_context.fillRect(x*snake_size, y*snake_size, snake_size, snake_size);
        // Fill of Food Box
        canvas_context.fillStyle = 'red';
        canvas_context.fillRect(x*snake_size+1, y*snake_size+1, snake_size-2, snake_size-2);
    };

    let lootbox_function = function (x, y) {
        // Border of Snake Body Box
        canvas_context.strokeStyle = 'black';
        canvas_context.strokeRect(x*snake_size, y*snake_size, snake_size, snake_size);
        // Fill of Snake Body Box
        canvas_context.fillStyle = 'gold';
        canvas_context.fillRect(x*snake_size+1, y*snake_size+1, snake_size-2, snake_size-2);
    };

    let score_text_function = function () {
        // How many foods did the snaek eat
        let score_text = "Score: " + score;
        canvas_context.fillStyle = 'blue';
        canvas_context.fillText(score_text, 335, canvas_height-5)
    };

    let draw_snake_function = function () {
        // Initial snake size
        let snake_length = 4;
        snake = [];
        // Using a for loop we push the 5 elements inside the array(squares).
        // Every element will have x = 0 and the y will take the value of the index.
        for (let i = snake_length - 1; i >= 0; i--){
            snake.push({x:i,y:0});
        }
    };

    let generate_food_function = function () {
        food = {
            // Generate random numbers of the position of the food
            x: Math.floor((Math.random() * 60) + 1),
            y: Math.floor((Math.random() * 60) + 1)
        };

        // Calculate Position of Snakes body
        // we are doing this so when we generate the food
        // we don't generate the food in the same place as the snake
        for (let i = 0; i > snake.length; i++){
            let snake_X = snake[i].x;
            let snake_Y = snake[i].y;

            // If Food is in same place
            // Recalculate
            if (food.x === snake_X || food.y === snake_Y || food.x === snake_X && food.y === snake_Y){
                food.x = Math.floor((Math.random() * 60) + 1);
                food.y = Math.floor((Math.random() * 60) + 1);
            }
        }
    };

    let generate_lootbox_function = function () {
        let corner = Math.floor(Math.random() * Math.floor(4));
        switch (corner){
            case 0:
                lootbox = {
                    x:0,
                    y:0
                };
                break;
            case 1:
                lootbox = {
                    x:69,
                    y:0
                };
                break;
            case 2:
                lootbox = {
                    x:0,
                    y:69
                };
                break;
            case 3:
                lootbox = {
                    x:69,
                    y:69
                };
                break;
        }
    };

    let check_collision_function = function (x, y, array) {
        for (let i = 0; i < array.length; i++){
            if (array[i].x === x && array[i].y === y){
                return true;
            }
        }
        return false;
    };

    // Here is the important function
    let paint = function () {
        // We are fill the canvas with lightgrey
        canvas_context.fillStyle = 'lightgrey';
        canvas_context.fillRect(0, 0, canvas_width , canvas_height);

        // Give it a border
        canvas_context.strokeStyle = 'black';
        canvas_context.strokeRect(0, 0, canvas_width , canvas_height);

        // Disable the start button, while the game is going
        btn.disabled = true;
        dead = false;
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        /*
        Make the snake move.
        Use a variable ('direction') to control the movement.
        To move the snake, pop out the last element of the array and shift it on the top as first element.
        */
        if (direction === 'right') {
            snakeX++;
        }else if(direction === 'left'){
            snakeX--;
        }else if(direction === 'up'){
            snakeY--;
        }else if(direction === 'down'){
            snakeY++;
        }

        /*
        If the snake touches the canvas path or itself, it will die!
        Therefore if x or y of an element of the snake, don't fit inside the canvas, the game will be stopped.
        If the check_collision is true, it means the the snake has crashed on its body itself, then the game will be stopped again.
        */
        if(snakeX === -1 || snakeX === canvas_width/snake_size || snakeY === -1 || snakeY === canvas_height/snake_size || check_collision_function(snakeX, snakeY, snake)){
            // Stop Game
            // Re-enable start button
            snake_death_audio.play();
            btn.disabled = false;

            // Clean the canvas
            canvas_context.clearRect(0, 0, canvas_width , canvas_height);
            gameloop = clearInterval(gameloop);

            // Reset score
            if(score >= highest_score){
                highest_score = score;
                highest_score_display.innerHTML = "Highest Score: " + highest_score;
            }
            score = 0;
            dead = true;
            return;
        }
        let tail = {
            x: snakeX,
            y: snakeY
        };
        // If the snake eats, grow
        // in this case, you shouldn't pop out the last element of the array
        if (snakeX === food.x && snakeY === food.y){

            snake_eating_audio.play();

            score++;
            generate_food_function();

        } else if(snakeX === lootbox.x && snakeY === lootbox.y){
            score += 3;
            cntr = 2;
            generate_lootbox_function();
            lootbox_eat_audio.play();
            if (score !== 0  && score%2 === 0){
                lootbox_function(lootbox.x, lootbox.y);
            }
        } else if(cntr > 0){
            cntr--;
        } else {

            // Pop out the last cell
            let tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }
        snake.unshift(tail);

        // For each element of the array create a square using the bodySnake function we created before.
        for (let i = 0; i < snake.length; i++) {
            snake_body_function(snake[i].x, snake[i].y);
        }

        // Generate food
        food_function(food.x, food.y);
        if (score !== 0  && score%2 === 0){
            lootbox_function(lootbox.x, lootbox.y);
        }

        // Place Score
        score_text_function();
    };

    let init = function () {
        direction = 'down';
        draw_snake_function();
        generate_food_function();
        generate_lootbox_function();
        gameloop = setInterval(paint, 100);
       };
    //You need to return only the _init_ function at the end of the Module.
    return {
        init: init,
        paint: paint
    };
    // Close the Module
}());