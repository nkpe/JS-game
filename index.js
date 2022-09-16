const canvas = document.querySelector('canvas');

// Canvas Context Object
const cContext = canvas.getContext('2d');

// Setting Canvas dimensions
canvas.width = 1024;
canvas.height = 576;

// Fill Style (must be before fillRect!)
cContext.fillStyle = "pink";
// Fill Rect (X, Y, Width, Height)
cContext.fillRect(0, 0, canvas.width, canvas.height);

// Create new JS image Object (can't use string directly - so set src)
const image = new Image();
image.src = './img/Pellet-Town.png';

const playerImage = new Image();
playerImage.src = 'img/player/playerDown.png'

image.onload = () => {
    // Draw Image (HTMLImgObj, XCropStart, YCropStart, XCropEnd, YCropEnd, X, Y, actualWidth, actualHeight)
    cContext.drawImage(image, -735, -600);
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
}


