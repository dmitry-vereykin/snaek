(function(window, document, drawModule, undefined, paint){
    // Connect the button in the HTML with the init function
    btn.addEventListener("click", function(){draw_module.init();});

    document.onkeydown = function (event){
        keyCode = window.event.keyCode;
        switch (keyCode){

            case 37:
                if (direction !== 'right'){
                    direction = 'left';
                    if(dead === false){
                        draw_module.paint();
                    }
                }
                break;

            case 39:
                if (direction !== 'left'){
                    direction = 'right';
                    if(dead === false){
                        draw_module.paint();
                    }
                }
                break;

            case 38:
                if (direction !== 'down'){
                    direction = 'up';
                    if(dead === false){
                        draw_module.paint();
                    }
                }
                break;

            case 40:
                if (direction !== 'up'){
                    direction = 'down';
                    if(dead === false){
                        draw_module.paint();
                    }
                }
                break;
            case 65:
                if (direction !== 'right'){
                    direction = 'left';
                    if(dead === false){
                        draw_module.paint();
                    }
                }
                break;

            case 68:
                if (direction !== 'left'){
                    direction = 'right';
                    if(dead === false){
                        draw_module.paint();
                    }
                }
                break;

            case 87:
                if (direction !== 'down'){
                    direction = 'up';
                    if(dead === false){
                        draw_module.paint();
                    }
                }
                break;

            case 83:
                if (direction !== 'up'){
                    direction = 'down';
                    if(dead === false){
                        draw_module.paint();
                    }
                }
                break;
        }
    }


})(window, document, draw_module);