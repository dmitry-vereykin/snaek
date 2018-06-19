(function(window, document, drawModule, undefined){
    // Connect the button in the HTML with the init function
    btn.addEventListener("click", function(){draw_module.init();});

    document.onkeydown = function (event){
        keyCode = window.event.keyCode;
        switch (keyCode){

            case 37:
                if (direction != 'right'){
                    direction = 'left';
                }
                break;

            case 39:
                if (direction != 'left'){
                    direction = 'right';
                }
                break;

            case 38:
                if (direction != 'down'){
                    direction = 'up';
                }
                break;

            case 40:
                if (direction != 'up'){
                    direction = 'down';
                }
                break;
        }
    }


})(window, document, draw_module);