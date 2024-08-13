function toggleSection() {
    const content = document.getElementById('collapsibleContent');
    content.style.display = (content.style.display === 'none') ? 'block' : 'none';
}

function toggleDetails(imgElement) {
    closeAndDeleteAllDetails();
    let details = imgElement.nextElementSibling;

    if (details && details.classList.contains('details') && details.style.display === 'block') {
        details.style.display = 'none';
    } else {

        if (!details || !details.classList.contains('details')) {
            const killer = killerDetails.find(k => k.name === imgElement.alt);

            if (killer) {
               setAllKillerDetails(imgElement, killer);
            }
        }

        if (details) {
            details.style.display = 'block';
        }
    }
}

function setAllKillerDetails(imgElement, killer) {
    details = document.createElement('div');
    details.className = 'details';

    details.innerHTML = `
    <h3>${killer.name}</h3>
    <p><strong>Description:</strong> ${killer.description}</p>
    <p><strong>Difficulty:</strong> ${killer.difficulty}</p>
    <p><strong>Power:</strong> ${killer.power}</p>
    <p><strong>Power Description:</strong> ${killer.powerDescription}</p>
    <p><strong>Teachable Perks:</strong> ${killer.teachablePerks.join(', ')}</p>
    <p><strong>Mori:</strong> <a href="${killer.mori}" target="_blank">View Mori</a></p>
    <p><strong>Voicelines:</strong> <audio controls>
        <source src="${killer.Voicelines}" type="audio/mp3">
        Your browser does not support the audio element.
    </audio></p>
    <div class="killer-images">
        ${killer.images.map((img, index) => `
            <div class="killer-image-item">
                <img src="${img.src}" alt="${img.alt}">
                <p><strong>${img.alt}:</strong> ${killer.imagesDescription[index]}</p>
            </div>
        `).join('')}
    </div>
`;

    imgElement.parentNode.insertBefore(details, imgElement.nextSibling);
}

function closeAndDeleteAllDetails() {
    const allDetails = document.querySelectorAll('.details');
    allDetails.forEach(detail => {
        detail.style.display = 'none';
    });
}

function showKillers() {
    const content = document.getElementById('collapsibleContent');
    if (content.style.display === 'none' || content.style.display === '') {
        toggleSection();
    }
}

const killerDetails = [
    {
        name: "The Trapper",
        description: "Armed with a bag of Bear Traps, The Trapper specializes in catching unsuspecting Survivors. By placing traps in high-traffic areas and thick patches of grass, he creates a deadly area that forces Survivors to move with caution. When dealing with The Trapper, a simple misstep can prove fatal.",
        difficulty: "Easy",
        power: "Bear Trap",
        powerDescription: "Begin a trial with 2 Bear Traps, with 6 additional Bear Traps randomly spawning throughout the map. The Trapper can only carry 2 Bear Traps at a time. Survivors can be caught in a Bear Trap and attempt to escape or be freed by a teammate. If a Survivor is healthy, being caught in a Bear Trap will put them in the injured state.",
        teachablePerks: ["Unnerving Presence", "Brutal Strength", "Agitation"],
        mori: "Hier bitte ein Video einfügen",
        Voicelines: "Hier bitte mp3 einfügen",
        images: [
            { src: "trapper_teachable1.jpg", alt: "Unnerving Presence" },
            { src: "trapper_teachable2.jpg", alt: "Brutal Strength" },
            { src: "trapper_teachable3.jpg", alt: "Agitation" }
        ],
        imagesDescription: [
            "Survivors within your Terror Radius will be faced with difficult skill checks while repairing and healing.",
            "Speed up the process of breaking pallets, destroying breakable walls, and damaging generators.",
            "Allows The Trapper to move faster and cover longer distances while carrying Survivors. Carrying Survivors also increases your Terror Radius."
        ]
    }, 
    {
        name: "The Wraith",
        description: "Using his Wailing Bell to render himself invisible, The Wraith tracks his prey and strikes with little warning. Upon hearing the Bell’s fateful chime, Survivors must think fast or suffer the consequences. A hit-and-run specialist, The Wraith is adept at keeping everybody injured.",
        difficulty: "Easy",
        power: "Wailing Bell",
        powerDescription:"Ring the Wailing Bell to cloak, becoming invisible and losing the Terror Radius. Though The Wraith cannot attack while invisible, uncloaking grants a deadly lunge capable of injuring unsuspecting Survivors. Remember – The Wraith becomes slightly easier to spot at close distance, and his Wailing Bell rings out loudly while uncloaking and cloaking.",
        teachablePerks: ["Predator", "Bloodhound", "Wraith Teachable Perk 3"],
        mori: "Test",
        Voicelines: "Test",
        images: [
            { src: "../killer/src/killerPerks/wraith_teachable1.jpg", alt: "Predator" },
            { src: "wraith_teachable2.jpg", alt: "Bloodhound" },
            { src: "wraith_teachable3.jpg", alt: "Wraith Teachable Perk 3" }
        ],
        imagesDescription: [
            "Scratch marks left by Survivors spawn closer together, allowing for efficient tracking.",
            "Pools of blood left by injured Survivors shine bright on the ground, making it easier to pick up a trail.",
            "Expand your field of view for increased visibility, which helps with tracking elusive Survivors."
        ]
    },
    {
        name: "The Hillibilly",
        description: "Blablabla",
        difficulty: "Easy",
        teachablePerks: ["Perk1", "Perk2", "Perk3"],
        mori: "Test",
        releaseDate: "Test",
        Voicelines: "Test",
        images: [
            { src: "hillibilly_teachable1.jpg", alt: "Hillibilly Teachable Perk 1" },
            { src: "hillibilly_teachable2.jpg", alt: "Hillibilly Teachable Perk 2" },
            { src: "hillibilly_teachable3.jpg", alt: "Hillibilly Teachable Perk 3" }
        ]
    },
    {
        name: "The Nurse",
        description: "Blablabla",
        difficulty: "Easy",
        teachablePerks: ["Perk1", "Perk2", "Perk3"],
        mori: "Test",
        releaseDate: "Test",
        Voicelines: "Test",
        images: [
            { src: "nurse_teachable1.jpg", alt: "Nurse Teachable Perk 1" },
            { src: "nurse_teachable2.jpg", alt: "Nurse Teachable Perk 2" },
            { src: "nurse_teachable3.jpg", alt: "Nurse Teachable Perk 3" }
        ]
    }
];