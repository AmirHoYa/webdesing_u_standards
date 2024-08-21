function toggleSurvivorDetails(imgElement) {
    let details = imgElement.nextElementSibling;
    
    if (details && details.classList.contains('details') && details.style.display === 'block') {
        details.style.display = 'none';
        return;
    }
    
    closeDetails();

    if (!details || !details.classList.contains('details')) {
        const survivor = survivorDetails.find(k => k.name === imgElement.alt);

        if (survivor) {
            setAllSurvivorDetails(imgElement, survivor);
        }

        details = imgElement.nextElementSibling;
    }

    if (details) {
        details.style.display = 'block';
        details.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function setAllSurvivorDetails(imgElement, survivor) {
    const details = createDetailsContainer();
    details.innerHTML = createSurvivorDetailsHTML(survivor);
    imgElement.parentNode.insertBefore(details, imgElement.nextSibling);
}

function createDetailsContainer() {
    const details = document.createElement('div');
    details.className = 'details';
    return details;
}

function createSurvivorDetailsHTML(survivor) {
    const detailsName = createHeading(survivor.name, "detailsName");
    const description = createParagraph(survivor.description, "survivorDetailsColor");
    const voicelinesHeading = createSubHeading("Voicelines");
    const voicelines = createVoicelines(survivor.voicelines);
    const perksHeading = createSubHeading("Teachable Perks");
    const teachablePerks = createTeachablePerks(survivor.teachablePerks, survivor.perksDescriptions);

    return `
        ${detailsName}
        ${description}
        ${voicelinesHeading}
        <div class="survivor-info">
            ${voicelines}
        </div>
        ${perksHeading}
        <div class="perks">
            ${teachablePerks}
        </div>
    `;
}

function createHeading(text, className) {
    return `<h2 class="${className}">${text}</h2>`;
}

function createParagraph(text, className) {
    return `<p class="${className}">${text}</p>`;
}

function createSubHeading(text) {
    return `<h3>${text}</h3>`;
}

function createVoicelines(voicelinesUrl) {
    if(!voicelinesUrl) {
        return `<p>Has No Voicelines</p>`;
    }
    return `
        <div class="killer-voicelines">
            <p><strong>Voicelines:</strong></p>
            <audio controls>
                <source src="${voicelinesUrl}" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
        </div>
    `;
}

function createTeachablePerks(teachablePerks, perksDescriptions) {
    return Array.from(teachablePerks).map(([perk, img]) => `
        <div class="killer-perk-item">
            <img src="${img.src}" alt="${img.alt}">
            <p class="killerDetailsSubHeadingColor"><strong>${perk}:</strong></p> 
            <p class="killerDetailsColor">${perksDescriptions.get(perk)}</p>
        </div>
    `).join('');
}

function closeDetails() {
    const allDetails = document.querySelectorAll('.details');
    allDetails.forEach(detail => {
        detail.style.display = 'none';
    });
}