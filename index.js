const canvas = document.querySelector('canvas');

// Canvas Context Object
const cContext = canvas.getContext('2d');

// Setting Canvas dimensions
canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
//Looping over the collisions data to create rows.
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, i + 70));
};
class Boundary {
    static width = 48;
    static height = 48;
    constructor({ position }) {
        this.position = position,
            //48 is the size of each 'square' in the grid when exported from Tiled
            this.width = 48,
            this.height = 48
    };
    draw() {
        cContext.fillStyle = "red";
        //Fill Rec (X Start, Y Start, X End , Y End)
        cContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    };
}

const boundaries = [];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025) { 
        boundaries.push (
            new Boundary({
                position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                }
            })
        )}
    })
});

console.log(boundaries[0]);

// Create new JS image Object (can't use string directly - so set src)
const image = new Image();
image.src = './img/Pellet-Town.png';

const playerImage = new Image();
playerImage.src = 'img/player/playerDown.png'

class Sprite {
    // using object within class parameter allows the properties to be called in any order
    constructor({ position, image }) {
        this.position = position;
        this.image = image;
    }
    //Method created
    draw() {
        cContext.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({
    position: {
        x: -735,
        y: -600
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    // RequestAnimationFrame (function(call itself create infinite loop))
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(Boundary => {
        Boundary.draw();
    })
    // Draw Image (HTMLImgObj, XCropStart, YCropStart, XCropEnd, YCropEnd, X, Y, actualWidth, actualHeight)
    cContext.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width / 4) / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    );

    if (keys.w.pressed && lastKey === "w") background.position.y += 3;
    else if (keys.a.pressed && lastKey === "a") background.position.x += 3;
    else if (keys.d.pressed && lastKey === "d") background.position.x -= 3;
    else if (keys.s.pressed && lastKey === "s") background.position.y -= 3;
};
animate();

let lastKey = "";
//listening for keyboard key down
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = "w";
            break
        case 'a':
            keys.a.pressed = true;
            lastKey = "a";
            break
        case 's':
            keys.s.pressed = true;
            lastKey = "s";
            break
        case 'd':
            keys.d.pressed = true;
            lastKey = "d";
            break
    }
})

//listening for keyboard key up
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 's':
            keys.s.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
    }
})


