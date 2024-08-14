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
    <p><strong>Mori:</strong> 
        <iframe width="560" height="315" src= "${killer.mori}" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
    </p>    <p><strong>Voicelines:</strong> <audio controls>
        <source src="${killer.voicelines}" type="audio/mp3">
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
        mori: "https://www.youtube.com/embed/dwafDNDtgHA",
        voicelines: "Hier bitte mp3 einfügen",
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
        voicelines: "Test",
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
        name: "The Hillbilly",
        description: "The sound of a revving motor, followed by a bloodthirsty scream of rage. The Hillbilly isn’t exactly subtle, but he makes up for it in brutal efficiency. Capable of traversing great distances at a rapid pace, those in his path will be rudely introduced to one-hundred gnashing chainsaw blades.",
        difficulty: "Medium",
        power: "The Chainsaw",
        powerDescription: "Rev the Chainsaw to begin a Chainsaw Sprint and travel great distances at blistering speed. Hit a Survivor with the Chainsaw Sprint for an instant down, but be careful -- careless revving will cause the Chainsaw to overheat",
        teachablePerks: ["Enduring", "Lightborn", "Tinkerer"],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: ["Become resilient to pain. Quickly recover from pallet stuns, allowing you to sustain pressure during a chase.", "Become completely immune to the blinding effect of Flashlights, Blast Mines, and flashbangs. Perfect for catching flashlight-wielding Survivors off-guard.", "Become notified whenever a generator reaches a point of near-completion. Once Tinkerer activates, Terror Radius and Red Stain are disabled for a period, allowing you to approach unsuspecting Survivors."]
    },
    {
        name: "The Nurse",
        description: "Using her Blink ability, The Nurse can teleport great distances in moments, predicting and cutting off Survivor routes. A powerful process best honed by experience, careless Blinks are punished with a wave of fatigue. The epitome of high risk, high reward, The Nurse can end chases with surgical precision.",
        difficulty: "Very Hard",
        power: "Spencer’s Last Breath",
        powerDescription: "Charge a Blink to teleport a great distance, quickly gaining the ability to charge a second Blink. Once all charged Blinks are expended, The Nurse may elect to attack before she is briefly struck with fatigue.",
        teachablePerks: ["Stridor", "Thanatophobia", "A Nurse's Calling"],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: ["Hear Survivors breathing and grunts of pain louder than ever.", "Each injured Survivor inflicts a penalty to repairing, cleansing, and sabotaging speeds to all Survivors.", "Reveal the auras of all healing Survivors within your vicinity."]
    },
    {
        name: "The Huntress",
        description: "Armed with throwable hatchets, The Huntress is a constant threat to Survivors, even those at a great distance. With patience and precision, chases can end as quickly as they begin. Predict Survivor movement and let your hatchet fly – there's nothing quite like the rewarding sound of a target struck.",
        difficulty: "Medium",
        power: "Hunting Hatchets",
        powerDescription: "Begin the trial with 5 Hunting Hatchets, which can be wound up and thrown with deadly precision. Hatchets can be refilled at lockers.",
        teachablePerks: ["Beast of Prey", "Territorial Imperative", "Hex: Huntress Lullaby"],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: ["Lose your Terror Radius and Red Stain upon entering Bloodlust, making you difficult to predict while in a chase.", "When at a distance, view the aura of any Survivor entering the basement, making an already dangerous place even deadlier.", "Spawn a Hex Totem. Receive 1 token upon hooking a Survivor, with a max of 5. Each token increases the difficulty of skill checks for Survivors, with 5 completely removing the audio cue. Failed skill checks cause a severe regression penalty. All effects end when the Totem is cleansed."]
    },
    {
        name: "The Shape",
        description: "The Shape lurks in the distance, patiently biding his time. His evil builds while stalking Survivors, fueling him with malevolent power. As the trial progresses, The Shape evolves from a quiet menace to an unstoppable juggernaut capable of shredding through even the most resilient teams.",
        difficulty: "Medium",
        power: "Evil Within",
        powerDescription: "The Shape has three tiers of Evil Within, built by stalking Survivors. In Tier 1, The Shape has no Terror Radius and a reduced speed and lunge. In Tier 2, he has a reduced Terror Radius, returning to his normal speed and lunge. In Tier 3, he can instantly down Survivors with a lethal increased lunge for an extended duration before returning to Tier 2.",
        teachablePerks: ["Save the Best for Last", "Play with your Food", "Dying Light"],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: ["Become obsessed with one Survivor. Receive tokens for hitting Survivors other than the Obsession with a basic attack, up to a total of 8. Lose tokens for hitting the Obsession. More tokens lead to a faster cooldown on successful weapon attacks.", "Become obsessed with one Survivor. Every time you chase your Obsession and let them escape, gain a token up to a maximum of 3. Each token increases movement speed. Lose a token upon attacking.", "Become obsessed with one Survivor. Gain tokens for hooking non-Obsession Survivors. Each token decreases repair, healing, and sabotage speed for non-Obsession Survivors. The Obsession is not penalized, instead gaining an action speed bonus to unhooking and healing."]
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
    {
        name: "",
        description: "",
        difficulty: "",
        power: "",
        powerDescription: "",
        teachablePerks: [],
        mori: "",
        voicelines: "",
        images: [],
        imagesDescription: []
    },
];