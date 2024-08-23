const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const additionalContent = document.getElementById('additionalContent');
const killerContent = document.getElementById('killerContent');
const survivorContent = document.getElementById('survivorContent');
let isRed = false;
let isBlue = false;

// Initialisiere das Canvas mit gleichmäßig verteilten Farben
function initCanvas() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
}

// Setze die Canvas-Farben basierend auf der Auswahl
function setCanvasColors() {
    if (isRed) {
        // 80% Rot und 20% Blau (Rot rechts, Blau links)
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width * 0.2, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(canvas.width * 0.2, 0, canvas.width * 0.8, canvas.height);
    } else if (isBlue) {
        // 80% Blau und 20% Rot (Blau links, Rot rechts)
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width * 0.8, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(canvas.width * 0.8, 0, canvas.width * 0.2, canvas.height);
    } else {
        initCanvas();
    }
}

// Handler für das Klicken der Bilder
function handleImageClick(img) {
    const additionalContent = document.getElementById('additionalContent');
    if (img.src.includes('trapper.png')) {
        if (isRed) {
            isRed = false;
            additionalContent.style.display = 'none';
        } else {
            isRed = true;
            isBlue = false;
            additionalContent.style.display = 'block';
        }
    } else if (img.src.includes('ada_wong.png')) {
        if (isBlue) {
            isBlue = false;
            additionalContent.style.display = 'none';
        } else {
            isBlue = true;
            isRed = false;
            additionalContent.style.display = 'block';
        }
    }
    setCanvasColors();
    updateAdditionalContent(img.src);
}

function updateAdditionalContent(type) {
    if (type.includes('trapper.png')) {
        killerContent.style.display = 'block';
        survivorContent.style.display = 'none';
    } else if (type.includes('ada_wong.png')) {
        survivorContent.style.display = 'block';
        killerContent.style.display = 'none';
    }
    additionalContent.style.display = 'block';
}

// Initialisiere das Canvas beim Laden der Seite
window.onload = initCanvas;