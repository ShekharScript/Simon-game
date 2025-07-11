// alert("hello")

let userClickedPattern = [];
let gamePattern = [];
buttonColors = ["red", "blue", "green", "yellow"]
let level_value = 0
keypress_count = 0

// show increased level :1,2,3
function show_changed_level(level_value) {
    $("#level-title").text("Level " + level_value)
}

//generating random sequence
function nextSequence() {
    level_value = level_value + 1
    show_changed_level(level_value)
    return random_no = Math.floor(Math.random() * 4)
}


//adding color into the game pattern and calling nextSequence()
function calling_next_sequence() {
    randomChoosenColor = buttonColors[nextSequence()];
    animateFlash(randomChoosenColor)
    gamePattern.push(randomChoosenColor)
    console.log("gamerPattern :" + gamePattern+">>>>>")
}


// what to do when key is pressed
document.addEventListener("keypress", function () {
    keypress_count += 1
    //storing the random color sequence and calling nextSequence() for first keypress
    if (keypress_count === 1) {
        calling_next_sequence()
    }
    if(hasUserFalied === true){
        startOver();
    }
})



// startOver function resets all values
function startOver(){
    gamePattern = []
    userClickedPattern = []
    level_value = 0
    hasUserFalied = false ;
    calling_next_sequence()
    i=0
}



//play sound and flash animation
function animateFlash(color) {
    color_item = $("#" + color)
    color_item.addClass("flash")
    playSound(color);
    setTimeout(() => {
        color_item.removeClass("flash")
    }, 100);

}



//now play sound for the selected color
function playSound(ele) {
    console.log("<<<<<<<this is a sound check !!")
    switch (ele) {
        case "red":
            var red = new Audio('sounds/red.mp3')
            red.play()
            break;

        case "blue":
            var blue = new Audio('sounds/blue.mp3')
            blue.play()
            break;

        case "green":
            var green = new Audio('sounds/green.mp3')
            green.play()
            break;

        case "yellow":
            var yellow = new Audio('sounds/yellow.mp3')
            yellow.play()
            break;

        default:
            break;
    }
}




// animation on btn click 
function animateClick(currentColor) {
    color = $("#" + currentColor)
    color.addClass("pressed")
    setTimeout(() => {
        color.removeClass("pressed")
    }, 100);
}


//what to do when user click on color btn

//using : write this - onclick() = handler(this) in div of color boxes (html) 
// function handler(ele){
//  userChosenColour = ele.id
//  userClickedPattern.push(userChosenColour)
//  console.log(userClickedPattern);
// }
//or

// using the jquery for the btn click , no need for changes in html
hasUserFalied = false
i = 0
$(".btn").on("click", function () {
    if (i < gamePattern.length) { 
        // there is no need for :  "if (i < gamePattern.length)" , it can work without this too
        var userChosenColour = this.id
        playSound(this.id)
        animateClick(this.id)
        userClickedPattern.push(userChosenColour)
        console.log("userClickedPattern : " + userClickedPattern);
            if(IsArraysEqual(gamePattern , userClickedPattern , i+1)){
                i = i + 1;
                console.log("i = " + i)
            }
            else {
                hasUserFalied = true
                var wrong_answer = new Audio('sounds/wrong.mp3')
                wrong_answer.play()
                $("body").addClass("game-over")
                setTimeout(() => {
                    $("body").removeClass("game-over")
                }, 200)
                $("h1").text("Game Over, Press Any Key to Restart")
            }
    }

    if (i === gamePattern.length){
            console.log("arrays are equal")
            setTimeout(() => {
            calling_next_sequence()
            }, 1000);
            //reset the user clicked parameters
            userClickedPattern = [];
            i=0;
            console.log(i)
        }
        
    }
)



function IsArraysEqual(a, b , P) {
    let flag = 1 
    for(j =0 ; j < P ; j++){
        if (gamePattern[j] !== userClickedPattern[j])
            flag = 0 
        }
    if(flag==0) return false ;
    else return true;
        
}

