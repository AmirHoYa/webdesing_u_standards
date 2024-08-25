const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const additionalContent = document.getElementById('additionalContent');
const killerContent = document.getElementById('killerContent');
const survivorContent = document.getElementById('survivorContent');
let isRed = false;
let isBlue = false;
let currentlyDisplayed = '';

// Initialisiere das Canvas mit gleichmäßig verteilten Farben
function initCanvas() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
}

// Setze die Canvas-Farben basierend auf der Auswahl
function setCanvasColors() {
    if (canvas.classList.contains('glow-blue') || canvas.classList.contains('glow-red')) {
        canvas.classList.remove('glow-blue', 'glow-red');
    }

    if (isRed) {
        // 80% Rot und 20% Blau (Rot rechts, Blau links)
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width * 0.2, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(canvas.width * 0.2, 0, canvas.width * 0.8, canvas.height);
        canvas.classList.add('glow-red');
    } else if (isBlue) {
        // 80% Blau und 20% Rot (Blau links, Rot rechts)
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width * 0.8, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(canvas.width * 0.8, 0, canvas.width * 0.2, canvas.height);
        canvas.classList.add('glow-blue');
    } else {
        initCanvas();
    }
}

// Handler für das Klicken der Bilder
function handleImageClick(img) {
    const additionalContent = document.getElementById('additionalContent');

    if (img.src.includes('trapper.png')) {
        if (currentlyDisplayed === 'trapper') {
            additionalContent.style.display = 'none';
            currentlyDisplayed = ''; // Zurücksetzen, wenn der Inhalt versteckt wird
            isBlue = false;
            isRed = false;
            img.classList.remove('glow-red');
        } else {
            currentlyDisplayed = 'trapper';
            isRed = true;
            isBlue = false;
            additionalContent.style.display = 'block';
            img.classList.add('glow-red');
            updateAdditionalContent(img.src);
        }
    } else if (img.src.includes('ada_wong.png')) {
        if (currentlyDisplayed === 'ada_wong') {
            additionalContent.style.display = 'none';
            currentlyDisplayed = ''; // Zurücksetzen, wenn der Inhalt versteckt wird
            isBlue = false;
            isRed = false;
            img.classList.remove('glow-blue');
        } else {
            currentlyDisplayed = 'ada_wong';
            isBlue = true;
            isRed = false;
            additionalContent.style.display = 'block';
            img.classList.add('glow-blue');
            updateAdditionalContent(img.src);
        }
    }

    setCanvasColors();
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