// Start by declaring the canvas element and setting its context to 2d
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d');
// Define the width and height of the canvas with a static size that is accomodating to most screens
canvas.width = 1024
canvas.height = 576

// Use the fillRect() method with the context(drawing tool) to fill the canvas with a default color of black
    // Pass in four argument: x-axis, y-axis, width, height
    // The first two 0's place the drawing tool at the top left corner of the canvas
    // The canvas.width and canvas.height tell the fill tool to fill from the top left corner
        // to the bottom right corner of the canvas
context.fillRect(0, 0, canvas.width, canvas.height)

// By specifying a gravity, I ensure that the characters are brought down to the bottom of the page at a specific rate
const gravity = 0.7

// Create a sprite class that will be used to define numerous characters throughout the game
class Sprite {
    // Place constructors of position and speed to define where the characters are and how quickly they move
    constructor({position, speed}) {
        this.position = position
        this.speed = speed
        // Create a static height for the characters
        this.height = 150
        // By setting lastKey as a parameter to be passed in, I can determine which key was the last one pressed for movement
        this.lastKey
    }

    // Create a draw method that will draw out each sprite when called on in the game
    drawSprite() {
        // Create a basic red rectangular sprite for the time being
        context.fillStyle = 'red'
        // This places the context tool at whichever positioned is defined when creating the character
        // The 50 defines the width of the character in pixels
        // this.height defines the height of the character as defined in the Sprite class
        context.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    // Create an update class that will update the Sprite over time as it changes positions on the canvas
    update() {
        // Calling on the this.drawSprite() draws out the defined sprite at its new position
        this.drawSprite()

        this.position.x += this.speed.x
        // This will update the falling speed of the sprite by increasing the y-position by a factor of y-speed
        this.position.y += this.speed.y

        // Create an if statement to stop the sprite from falling below the bottom of the canvas
            // As the sprite falls and is close to the bottom of the canvas, the y-speed will become 0
        if(this.position.y + this.height + this.speed.y >= canvas.height) {
            this.speed.y = 0
            // Once the sprite is close to the bottom of the page, the gravity effect will cause the sprite to continue to 
            // fall until it reaches the absolute bottom of the canvas
        } else {
            this.speed.y += gravity
        }
    }
}

// Create first player Sprite with a position in the top left corner of the screen and an initial falling speed of 10px
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    speed: {
        x: 0,
        y: 10
    }
})

// Create an enemy Sprite with a position closer to the center of the canvas with a falling speed of only gravity
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    speed: {
        x: 0,
        y: 0
    }
})

// Declare an object of keys to store each key binding for the player and enemy and whether or not it is being pressed by 
// setting each of them to false initially
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

// Create an infinite loop function called movement that updates the characters new position while also clearing the character from
// its past position by refilling that location with a 'black' fill to match the canvas
function movement() {
    window.requestAnimationFrame(movement)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    // By setting the player and enemy speed.x to 0, the characters will stop all movement forward and backward when the key is no longer
    // being pressed
    player.speed.x = 0
    enemy.speed.x = 0

    // Set two if...else statements for both the player and enemy to determine if the keys are being pressed as well as if it is the 
    // lastKey pressed. If so, make the characters move either left or right at a specified speed
    if(keys.a.pressed && player.lastKey === 'a') {
        player.speed.x = -5
    } else if(keys.d.pressed && player.lastKey === 'd') {
        player.speed.x = 5
    }

    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.speed.x = -5
    } else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.speed.x = 5
    }
}

// Call on the movement function to initiate the loop
movement()

// Use a switch...case statment to store several objectives based on a singular event being e.key
    // the case should specify the key being pressed, set the keys.key.pressed to true, specify the lastKey
    // and then break to ensure the loop ends
        // Do a new case for each key including the enemy.
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.speed.y = -20
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.speed.y = -20
            break
    }
})

// Create a keyup eventlistener that will set the keys.key.pressed to false and then break to stop all movement
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})