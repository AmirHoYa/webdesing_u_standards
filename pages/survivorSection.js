function toggleSurvivorDetails(imgElement) {
    let details = imgElement.nextElementSibling;
    
    if (details && details.classList.contains('survivor-details') && details.style.display === 'block') {
        details.style.display = 'none';
        return;
    }
    
    closeSurvivorDetails();

    if (!details || !details.classList.contains('survivor-details')) {
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
    const details = createSurvivorDetailsContainer();
    details.innerHTML = createSurvivorDetailsHTML(survivor);
    imgElement.parentNode.insertBefore(details, imgElement.nextSibling);
}

function createSurvivorDetailsContainer() {
    const details = document.createElement('div');
    details.className = 'survivor-details';
    return details;
}

function createSurvivorDetailsHTML(survivor) {
    const detailsName = createSurvivorDetailsHeading(survivor.name, "detailsName");
    const description = createSurvivorDetailsParagraph(survivor.description, "survivorDetailsColor");
    const voicelinesHeading = createSurvivorDetailsSubHeading("Voicelines");
    const voicelines = createSurvivorVoicelines(survivor.voicelines);
    const perksHeading = createSurvivorDetailsSubHeading("Teachable Perks");
    const teachablePerks = createSurvivorTeachablePerks(survivor.teachablePerks, survivor.perksDescriptions);

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

function createSurvivorDetailsHeading(text, className) {
    return `<h2 class="${className}">${text}</h2>`;
}

function createSurvivorDetailsParagraph(text, className) {
    return `<p class="${className}">${text}</p>`;
}

function createSurvivorDetailsSubHeading(text) {
    return `<h3>${text}</h3>`;
}

function createSurvivorVoicelines(voicelinesUrl) {
    if(!voicelinesUrl) {
        return `<p>Has No Voicelines</p>`;
    }
    return `
        <div class="killer-voicelines">
            <audio controls>
                <source src="${voicelinesUrl}" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
        </div>
    `;
}

function createSurvivorTeachablePerks(teachablePerks, perksDescriptions) {
    return Array.from(teachablePerks).map(([perk, img]) => `
        <div class="killer-perk-item">
            <img src="${img.src}" alt="${img.alt}">
            <p class="killerDetailsSubHeadingColor"><strong>${perk}:</strong></p> 
            <p class="killerDetailsColor">${perksDescriptions.get(perk)}</p>
        </div>
    `).join('');
}

function closeSurvivorDetails() {
    const allDetails = document.querySelectorAll('.survivor-details');
    allDetails.forEach(detail => {
        detail.style.display = 'none';
    });
}

const survivorDetails = [
    {
        name: "Dwight Fairfield",
        description: "Blabla",
        teachablePerks: new Map([
            ["Unnerving Presence", { src: "../killer/src/killerPerks/trapper_teachable1.png", alt: "Unnerving Presence" }],
            ["Brutal Strength", { src: "../killer/src/killerPerks/trapper_teachable2.png", alt: "Brutal Strength" }],
            ["Agitation", { src: "../killer/src/killerPerks/trapper_teachable3.png", alt: "Agitation" }]
        ]),
        perksDescriptions: new Map([
            ["Unnerving Presence", "Survivors within your Terror Radius will be faced with difficult skill checks while repairing and healing."],
            ["Brutal Strength", "Speed up the process of breaking pallets, destroying breakable walls, and damaging generators."],
            ["Agitation", "Allows The Trapper to move faster and cover longer distances while carrying Survivors. Carrying Survivors also increases your Terror Radius."]
        ]),
        voicelines: "Hier bitte mp3 einfügen"
    }
];