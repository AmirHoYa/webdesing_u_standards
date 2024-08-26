const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const additionalContent = document.getElementById('additionalContent');
const killerContent = document.getElementById('killerContent');
const survivorContent = document.getElementById('survivorContent');
let currentlyDisplayed = null;

const IMAGES = {
    trapper: {
        color: 'red',
        glowClass: 'glow-red',
        content: killerContent,
        redPercentage: 0.8
    },
    ada_wong: {
        color: 'blue',
        glowClass: 'glow-blue',
        content: survivorContent,
        bluePercentage: 0.8
    }
};

function initCanvas() {
    drawCanvas('blue', 0, canvas.width / 2);
    drawCanvas('red', canvas.width / 2, canvas.width / 2);
}

function drawCanvas(color, x, width) {
    ctx.fillStyle = color;
    ctx.fillRect(x, 0, width, canvas.height);
}

function setCanvasColors() {
    canvas.classList.remove('glow-blue', 'glow-red');

    if (currentlyDisplayed) {
        const selected = IMAGES[currentlyDisplayed];
        if (selected.color === 'red') {
            drawCanvas('blue', 0, canvas.width * 0.2);
            drawCanvas('red', canvas.width * 0.2, canvas.width * 0.8);
        } else if (selected.color === 'blue') {
            drawCanvas('blue', 0, canvas.width * 0.8);
            drawCanvas('red', canvas.width * 0.8, canvas.width * 0.2);
        }
        canvas.classList.add(selected.glowClass);
    } else {
        initCanvas();
    }
}

function handleImageClick(img) {
    const imageKey = img.src.includes('trapper.png') ? 'trapper' : img.src.includes('ada_wong.png') ? 'ada_wong' : null;

    if (imageKey && currentlyDisplayed !== imageKey) {
        resetImageGlow();
        updateState(imageKey, img);
    } else {
        resetState(img);
    }

    setCanvasColors();
}

function resetImageGlow() {
    const images = document.querySelectorAll('.glow-red, .glow-blue');
    images.forEach(image => image.classList.remove('glow-red', 'glow-blue'));
}

function updateState(imageKey, img) {
    currentlyDisplayed = imageKey;
    additionalContent.style.display = 'block';
    img.classList.add(IMAGES[imageKey].glowClass);
    updateAdditionalContent(imageKey);
}

function resetState(img) {
    additionalContent.style.display = 'none';
    currentlyDisplayed = null;
    img.classList.remove('glow-red', 'glow-blue');
}

function updateAdditionalContent(type) {
    Object.values(IMAGES).forEach(item => {
        item.content.style.display = 'none';
    });

    if (type && IMAGES[type]) {
        IMAGES[type].content.style.display = 'block';
    }
}

window.onload = initCanvas;