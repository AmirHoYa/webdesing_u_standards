function toggleKillerDetails(imgElement) {
    let details = imgElement.nextElementSibling;
    
    if (details && details.classList.contains('details') && details.style.display === 'block') {
        details.style.display = 'none';
        return;
    }
    
    closeKillerDetails();

    if (!details || !details.classList.contains('details')) {
        const killer = killerDetails.find(k => k.name === imgElement.alt);

        if (killer) {
            setAllKillerDetails(imgElement, killer);
        }

        details = imgElement.nextElementSibling;
    }

    if (details) {
        details.style.display = 'block';
        details.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
}

function setAllKillerDetails(imgElement, killer) {
    const details = createKillerDetailsContainer();
    details.innerHTML = createKillerDetailsHTML(killer);
    imgElement.parentNode.insertBefore(details, imgElement.nextSibling);
}

function createKillerDetailsContainer() {
    const details = document.createElement('div');
    details.className = 'details';
    return details;
}

function createKillerDetailsHTML(killer) {
    const detailsName = createKillerDetailsHeading(killer.name, "detailsName");
    const description = createKillerDetailsParagraph(killer.description, "detailsColor");
    const powerVoicelinesHeading = createKillerDetailsSubHeading("Power & Voicelines");
    const powerDetails = createPowerDetails(killer.power.key, killer.power.value, killer.difficulty, killer.powerDescription);
    const voicelines = createKillerVoicelines(killer.voicelines);
    const perksHeading = createKillerDetailsSubHeading("Teachable Perks");
    const teachablePerks = createKillerTeachablePerks(killer.teachablePerks, killer.perksDescriptions);
    const moriSection = createMoriSection(killer.mori);

    return `
        ${detailsName}
        ${description}
        ${powerVoicelinesHeading}
        <div class="killer-info">
            ${powerDetails}
            ${voicelines}
        </div>
        ${perksHeading}
        <div class="killer-perks">
            ${teachablePerks}
        </div>
        ${createKillerDetailsSubHeading("Mori:")}
        ${moriSection}
    `;
}

function createKillerDetailsHeading(text, className) {
    return `<h2 class="${className}">${text}</h2>`;
}

function createKillerDetailsSubHeading(text) {
    return `<h3>${text}</h3>`;
}

function createKillerDetailsParagraph(text, className) {
    return `<p class="${className}">${text}</p>`;
}

function createPowerDetails(key, imageUrl, difficulty, description) {
    return `
        <div class="killer-power">
            <p class="detailsSubHeadingColor"><strong>${key}</strong></p>
            <img src="${imageUrl}" alt="${key}">
            <p class="detailsColor"><b class="detailsSubHeadingColor">Difficulty:</b> ${difficulty}</p>
            <div class="detailsColor">${description}</div>
        </div>
    `;
}

function createKillerVoicelines(voicelinesUrl) {
    if(voicelinesUrl.length > 1) {
        return `
        <div class="voicelines">
            <p><strong>Voicelines:</strong></p>
            <audio controls>
                <source src="${voicelinesUrl[0]}" type="audio/mp3">
                <source src="${voicelinesUrl[1]}" type="audio/ogg">
                <source src="${voicelinesUrl[2]}" type="audio/wav">
                Your browser does not support the audio element.
            </audio>
        </div>
    `;
    } else {
        return `<div class="voicelines">
                     <p>Has No Voicelines</p>
                </div>`;
    }
}

function createKillerTeachablePerks(teachablePerks, perksDescriptions) {
    return Array.from(teachablePerks).map(([perk, img]) => `
        <div class="killer-perk-item">
            <img src="${img.src}" alt="${img.alt}">
            <p class="detailsSubHeadingColor"><strong>${perk}:</strong></p> 
            <p class="detailsColor">${perksDescriptions.get(perk)}</p>
        </div>
    `).join('');
}

function createMoriSection(moriSrc) {
    if (moriSrc.length > 1) {
        return `
            <div class="mori-container" id="moriSection">
                <video width="560" height="315" controls>
                    <source src="${moriSrc[0]}" type="video/mp4">
                    <source src="${moriSrc[1]}" type="video/ogg">
                    <source src="${moriSrc[2]}" type="video/webm">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
    } else {
        return `
            <div class="mori-container" id="moriSection">
                <iframe width="560" height="315" src="${moriSrc[0]}" 
                        title="YouTube video player" frameborder="0" 
                        allow="accelerometer; autoplay;">
                </iframe>
            </div>
        `;
    }
}

function closeKillerDetails() {
    const allDetails = document.querySelectorAll('.details');
    allDetails.forEach(detail => {
        detail.style.display = 'none';
    });
}

const killerDetails = [
    {
        name: "The Trapper",
        description: "Armed with a bag of Bear Traps, The Trapper specializes in catching unsuspecting Survivors. By placing traps in high-traffic areas and thick patches of grass, he creates a deadly area that forces Survivors to move with caution. When dealing with The Trapper, a simple misstep can prove fatal.",
        difficulty: "Easy",
        power: {key: "Bear Trap", value:"killer/killerPower/power_trapper.png"},
        powerDescription: "Begin a trial with 2 Bear Traps, with 6 additional Bear Traps randomly spawning throughout the map. The Trapper can only carry 2 Bear Traps at a time. Survivors can be caught in a Bear Trap and attempt to escape or be freed by a teammate. If a Survivor is healthy, being caught in a Bear Trap will put them in the injured state.",
        teachablePerks: new Map([
            ["Unnerving Presence", { src: "killer/killerPerks/trapper_teachable1.png", alt: "Unnerving Presence" }],
            ["Brutal Strength", { src: "killer/killerPerks/trapper_teachable2.png", alt: "Brutal Strength" }],
            ["Agitation", { src: "killer/killerPerks/trapper_teachable3.png", alt: "Agitation" }]
        ]),
        perksDescriptions: new Map([
            ["Unnerving Presence", "Survivors within your Terror Radius will be faced with difficult skill checks while repairing and healing."],
            ["Brutal Strength", "Speed up the process of breaking pallets, destroying breakable walls, and damaging generators."],
            ["Agitation", "Allows The Trapper to move faster and cover longer distances while carrying Survivors. Carrying Survivors also increases your Terror Radius."]
        ]),
        mori: ["https://www.youtube.com/embed/tFKA2yD-J84"],
        voicelines: ""
    }, 
    {
        name: "The Wraith",
        description: "Using his Wailing Bell to render himself invisible, The Wraith tracks his prey and strikes with little warning. Upon hearing the Bell’s fateful chime, Survivors must think fast or suffer the consequences. A hit-and-run specialist, The Wraith is adept at keeping everybody injured.",
        difficulty: "Easy",
        power: {key: "Wailing Bell", value:"killer/killerPower/power_wraith.png"},
        powerDescription:"Ring the Wailing Bell to cloak, becoming invisible and losing the Terror Radius. Though The Wraith cannot attack while invisible, uncloaking grants a deadly lunge capable of injuring unsuspecting Survivors. Remember – The Wraith becomes slightly easier to spot at close distance, and his Wailing Bell rings out loudly while uncloaking and cloaking.",
        teachablePerks: new Map([
            ["Predator", { src: "killer/killerPerks/wraith_teachable1.png", alt: "Predator" }],
            ["Bloodhound", { src: "killer/killerPerks/wraith_teachable2.png", alt: "Bloodhound" }],
            ["Shadowborn", { src: "killer/killerPerks/wraith_teachable3.png", alt: "Shadowborn" }]
        ]),
        perksDescriptions: new Map([
            ["Predator", "Scratch marks left by Survivors spawn closer together, allowing for efficient tracking."],
            ["Bloodhound", "Pools of blood left by injured Survivors shine bright on the ground, making it easier to pick up a trail."],
            ["Shadowborn", "Expand your field of view for increased visibility, which helps with tracking elusive Survivors."]
        ]),
        mori: ["https://www.youtube.com/embed/PGXPvHJ_hJM"],
        voicelines: ""
    },
    {
        name: "The Hillbilly",
        description: "The sound of a revving motor, followed by a bloodthirsty scream of rage. The Hillbilly isn’t exactly subtle, but he makes up for it in brutal efficiency. Capable of traversing great distances at a rapid pace, those in his path will be rudely introduced to one-hundred gnashing chainsaw blades.",
        difficulty: "Medium",
        power: {key: "The Chainsaw", value:"killer/killerPower/power_hillibilly.png"},
        powerDescription:"Rev the Chainsaw to begin a Chainsaw Sprint and travel great distances at blistering speed. Hit a Survivor with the Chainsaw Sprint for an instant down, but be careful -- careless revving will cause the Chainsaw to overheat.",
        teachablePerks: new Map([
            ["Enduring", { src: "killer/killerPerks/hillibilly_teachable1.png", alt: "Enduring" }],
            ["Lightborn", { src: "killer/killerPerks/hillibilly_teachable2.png", alt: "Lightborn" }],
            ["Tinkerer", { src: "killer/killerPerks/hillibilly_teachable3.png", alt: "Tinkerer" }]
        ]),
        perksDescriptions: new Map([
            ["Enduring", "Become resilient to pain. Quickly recover from pallet stuns, allowing you to sustain pressure during a chase."],
            ["Lightborn", "Become completely immune to the blinding effect of Flashlights, Blast Mines, and flashbangs. Perfect for catching flashlight-wielding Survivors off-guard."],
            ["Tinkerer", "Become notified whenever a generator reaches a point of near-completion. Once Tinkerer activates, Terror Radius and Red Stain are disabled for a period, allowing you to approach unsuspecting Survivors."]
        ]),
        mori: ["https://www.youtube.com/embed/v6dQjIovZas"],
        voicelines: ""
    },
    {
        name: "The Nurse",
        description: "Using her Blink ability, The Nurse can teleport great distances in moments, predicting and cutting off Survivor routes. A powerful process best honed by experience, careless Blinks are punished with a wave of fatigue. The epitome of high risk, high reward, The Nurse can end chases with surgical precision.",
        difficulty: "Very Hard",
        power: {key: "Spencer’s Last Breath", value:"killer/killerPower/power_nurse.png"},
        powerDescription:"Charge a Blink to teleport a great distance, quickly gaining the ability to charge a second Blink. Once all charged Blinks are expended, The Nurse may elect to attack before she is briefly struck with fatigue.",
        teachablePerks: new Map([
            ["Stridor", { src: "killer/killerPerks/nurse_teachable1.png", alt: "Stridor" }],
            ["Thanatophobia", { src: "killer/killerPerks/nurse_teachable2.png", alt: "Thanatophobia" }],
            ["A Nurse's Calling", { src: "killer/killerPerks/nurse_teachable3.png", alt: "A Nurse's Calling" }]
        ]),
        perksDescriptions: new Map([
            ["Stridor", "Hear Survivors breathing and grunts of pain louder than ever."],
            ["Thanatophobia", "Each injured Survivor inflicts a penalty to repairing, cleansing, and sabotaging speeds to all Survivors."],
            ["A Nurse's Calling", "Reveal the auras of all healing Survivors within your vicinity."]
        ]),
        mori: ["https://www.youtube.com/embed/M_epf2mmOOI"],
        voicelines: ""
    },
    {
        name: "The Huntress",
        description: "Armed with throwable hatchets, The Huntress is a constant threat to Survivors, even those at a great distance. With patience and precision, chases can end as quickly as they begin. Predict Survivor movement and let your hatchet fly – there's nothing quite like the rewarding sound of a target struck.",
        difficulty: "Medium",
        power: {key: "Hunting Hatchets", value:"killer/killerPower/power_huntress.png"},
        powerDescription:"Begin the trial with 5 Hunting Hatchets, which can be wound up and thrown with deadly precision. Hatchets can be refilled at lockers.",
        teachablePerks: new Map([
            ["Beast of Prey", { src: "killer/killerPerks/huntress_teachable1.png", alt: "Beast of Prey" }],
            ["Territorial Imperative", { src: "killer/killerPerks/huntress_teachable2.png", alt: "Territorial Imperative" }],
            ["Hex: Huntress Lullaby", { src: "killer/killerPerks/huntress_teachable3.png", alt: "Hex: Huntress Lullaby" }]
        ]),
        perksDescriptions: new Map([
            ["Beast of Prey", "Lose your Terror Radius and Red Stain upon entering Bloodlust, making you difficult to predict while in a chase."],
            ["Territorial Imperative", "When at a distance, view the aura of any Survivor entering the basement, making an already dangerous place even deadlier."],
            ["Hex: Huntress Lullaby", "Spawn a Hex Totem. Receive 1 token upon hooking a Survivor, with a max of 5. Each token increases the difficulty of skill checks for Survivors, with 5 completely removing the audio cue. Failed skill checks cause a severe regression penalty. All effects end when the Totem is cleansed."]
        ]),
        mori: ["https://www.youtube.com/embed/0dpM0521G3M"],
        voicelines: ""
    },
    {
        name: "The Shape - Michael Myers",
        description: "The Shape lurks in the distance, patiently biding his time. His evil builds while stalking Survivors, fueling him with malevolent power. As the trial progresses, The Shape evolves from a quiet menace to an unstoppable juggernaut capable of shredding through even the most resilient teams.",
        difficulty: "Medium",
        power: {key: "Evil Within", value:"killer/killerPower/power_shape.png"},
        powerDescription:"The Shape has three tiers of Evil Within, built by stalking Survivors. In Tier 1, The Shape has no Terror Radius and a reduced speed and lunge. In Tier 2, he has a reduced Terror Radius, returning to his normal speed and lunge. In Tier 3, he can instantly down Survivors with a lethal increased lunge for an extended duration before returning to Tier 2.",
        teachablePerks: new Map([
            ["Save the Best for Last", { src: "killer/killerPerks/shape_teachable1.png", alt: "Save the Best for Last" }],
            ["Play with your Food", { src: "killer/killerPerks/shape_teachable2.png", alt: "Play with your Food" }],
            ["Dying Light", { src: "killer/killerPerks/shape_teachable3.png", alt: "Dying Light" }]
        ]),
        perksDescriptions: new Map([
            ["Save the Best for Last", "Become obsessed with one Survivor. Receive tokens for hitting Survivors other than the Obsession with a basic attack, up to a total of 8. Lose tokens for hitting the Obsession. More tokens lead to a faster cooldown on successful weapon attacks."],
            ["Play with your Food", "Become obsessed with one Survivor. Every time you chase your Obsession and let them escape, gain a token up to a maximum of 3. Each token increases movement speed. Lose a token upon attacking."],
            ["Dying Light", "Become obsessed with one Survivor. Gain tokens for hooking non-Obsession Survivors. Each token decreases repair, healing, and sabotage speed for non-Obsession Survivors. The Obsession is not penalized, instead gaining an action speed bonus to unhooking and healing."]
        ]),
        mori: ["https://www.youtube.com/embed/KKFC03pFMxI"],
        voicelines: ""
    },
    {
        name: "The Cannibal - Leatherface",
        description: "Leatherface knows a thing or two about chainsaw massacres. Any Survivor in his path will be instantly cut down, and his presence alone is enough to instill sheer panic. Capable of hitting multiple targets with a single swing, Leatherface is an unstoppable force with an insatiable appetite.",
        difficulty: "Medium",
        power: {key: "Bubba's Chainsaw", value:"killer/killerPower/power_cannibal.png"},
        powerDescription:"Charge your Chainsaw and unleash a devastating sweep attack, instantly downing any Survivor caught in your path. The Chainsaw can use up to 3 charges for an extended sweep, recharging whenever it's not in use.",
        teachablePerks: new Map([
            ["Knock Out", { src: "killer/killerPerks/cannibal_teachable1.png", alt: "Knock Out" }],
            ["Barbecue & Chili", { src: "killer/killerPerks/cannibal_teachable2.png", alt: "Barbecue & Chili" }],
            ["Franklin's Demise", { src: "killer/killerPerks/cannibal_teachable3.png", alt: "Franklin's Demise" }]
        ]),
        perksDescriptions: new Map([
            ["Knock Out", "When putting Survivors into the dying state, their aura is no longer viewable to Survivors at a distance. Ideal when leaving Survivors on the ground for a quick detour."],
            ["Barbecue & Chili", "Whenever a Survivor is hooked, reveal the aura of all distant Survivors, helpful information for planning your next move. Hooking a Survivor also grants a 25% increase to all Bloodpoints earned, with all 4 leading to a 100% increase."],
            ["Franklin's Demise", "Knock Survivor items right out of their hands with a vicious attack. Nearby dropped items are visible with a white aura. A dropped item depletes charges over time, and its aura becomes red when empty."]
        ]),
        mori: ["https://www.youtube.com/embed/wLtyd2NwZdY"],
        voicelines: ""
    },
    {
        name: "The Nightmare - Freddy Krueger",
        description: "Over time, The Nightmare forces Survivors into the Dream World. Once inside, Survivors will quickly realize the absence of a Terror Radius. With the ability to slow Survivors with Dream Snares, deceive with fake Dream Pallets, and pressure the map by teleporting directly to generators, The Nightmare lives up to his name.",
        difficulty: "Medium",
        power: {key: "Dream Demon", value:"killer/killerPower/power_nightmare.png"},
        powerDescription:"The Nightmare spends each trial in the Dream World and can send Survivors to the Dream World with an attack. Use Dream Projection to teleport to an unfinished generator, allowing for oppressive map control. Use Dream Snares to slow sleeping Survivors down in a chase, or Dream Pallets to lure them into unsafe areas. To escape the Dream World, Survivors must find an Alarm Clock and wake up.",
        teachablePerks: new Map([
            ["Fire Up", { src: "killer/killerPerks/nightmare_teachable1.png", alt: "Fire Up" }],
            ["Remember Me", { src: "killer/killerPerks/nightmare_teachable2.png", alt: "Remember Me" }],
            ["Blood Warden", { src: "killer/killerPerks/nightmare_teachable3.png", alt: "Blood Warden" }]
        ]),
        perksDescriptions: new Map([
            ["Fire Up", "Whenever a generator is completed, The Nightmare gains a stackable action speed bonus when picking up and dropping Survivors, breaking pallets and walls, damaging generators, and vaulting."],
            ["Remember Me", "Become obsessed with one Survivor. Each time your Obsession loses a health state, increase the time it takes to open the exit gates by 4 seconds, up to a maximum of 16 seconds. The Obsession is not affected by the slowdown penalty."],
            ["Blood Warden", "When an exit gate is opened, reveal the auras of all Survivors inside the exit gate area. If you hook a Survivor while the gate is opened, The Entity prevents escape for all Survivors for a lengthy duration."]
        ]),
        mori: ["https://www.youtube.com/embed/r2VrTFXcpiY"],
        voicelines: ""
    },
    {
        name: "The Pig - Amanda Young",
        description: "Creep up and ambush Survivors with The Pig, the stealthy successor to the legendary Jigsaw. But simply hooking them isn’t enough. Survivors can first be punished with a Reverse Bear Trap, which they must race to remove at Jigsaw Boxes across the map. Suddenly, repairing generators isn’t quite so pressing...",
        difficulty: "Hard",
        power: {key: "Jigsaw's Baptism", value:"killer/killerPower/power_pig.png"},
        powerDescription:"Begin a trial with 4 Reverse Bear Traps, which can be placed on downed Survivors. Once a generator is completed, a Death timer begins. Survivors must attempt to escape the Trap at one of the Jigsaw Boxes around the map. The Pig can also crouch, moving at reduced speed with no Red Stain or Terror Radius. While crouching, she can attack with an Ambush Dash, quickly covering a great distance with a chilling roar.",
        teachablePerks: new Map([
            ["Hangman's Trick", { src: "killer/killerPerks/pig_teachable1.png", alt: "Hangman's Trick" }],
            ["Surveillance", { src: "killer/killerPerks/pig_teachable2.png", alt: "Surveillance" }],
            ["Make Your Choice", { src: "killer/killerPerks/pig_teachable3.png", alt: "Make Your Choice" }]
        ]),
        perksDescriptions: new Map([
            ["Hangman's Trick", "Become notified when Survivors begin to Sabotage a Hook. While carrying a Survivor, see the aura of all Survivors in the immediate vicinity of any Hook."],
            ["Surveillance", "The auras of all regressing generators become white. Once regression stops, the aura changes to yellow. The sound of generator repairs is also audible from a wider range. Ideal for monitoring repair progression and targeting Survivors accordingly."],
            ["Make Your Choice", "Hook a Survivor and leave the area. When the hooked Survivor is rescued, the rescuer becomes Exposed, able to be downed in a single hit."]
        ]),
        mori: ["https://www.youtube.com/embed/Fhxq3cEWv0Y"],
        voicelines: ""
    },
    {
        name: "The Ghost Face",
        description: "A stealth-focused Killer capable of approaching unseen, The Ghost Face is adept at stalking his prey. Keep tabs on each individual Survivor, patiently marking them for death – provided you can remain hidden. Lie in wait until the perfect time to strike, and down Survivors before they know what hit them.",
        difficulty: "Hard",
        power: {key: "Night Shroud", value:"killer/killerPower/power_ghost_face.png"},
        powerDescription:"Become Undetectable, losing both Terror Radius and Red Stain. In this state, stalk individual Survivors to Mark them, leaving them Exposed and vulnerable to a one-hit down. Time your stalking process strategically to attack Survivors at opportune moments. A word of warning – Survivors can break the Night Shroud by catching extended sight of The Ghost Face.",
        teachablePerks: new Map([
            ["I’m All Ears", { src: "killer/killerPerks/ghost_face_teachable1.png", alt: "I’m All Ears" }],
            ["Thrilling Tremors", { src: "killer/killerPerks/ghost_face_teachable2.png", alt: "Thrilling Tremors" }],
            ["Furtive Chase", { src: "killer/killerPerks/ghost_face_teachable3.png", alt: "Furtive Chase" }]
        ]),
        perksDescriptions: new Map([
            ["I’m All Ears", "After a Survivor quickly vaults a window or pallet, see their aura for a brief duration and intercept them accordingly."],
            ["Thrilling Tremors", "After picking up a Survivor, The Entity blocks every generator that isn’t being actively repaired, highlighting them in a white aura."],
            ["Furtive Chase", "You become obsessed with one Survivor. Gain a token when hooking your Obsession, with each token further reducing your Terror Radius in a chase. Each time a Survivor rescues the Obsession from a hook, they become the Obsession."]
        ]),
        mori: ["https://www.youtube.com/embed/atbUJeiW5Nk"],
        voicelines: ""
    },
    {
        name: "The Demogorgon",
        description: "There’s no reasoning with The Demogorgon, a vicious predator from the depths of The Upside Down. Capable of traversing the Map through a series of Portals, it chases down prey with ferocious intensity, finishing them off with a ferocious lunging strike.",
        difficulty: "Hard",
        power: {key: "Of the Abyss", value:"killer/killerPower/power_demogorgon.png"},
        powerDescription:"Press the Power button to charge and activate Of The Abyss. During this time, Survivors near an Activated Portal will be revealed through Killer Instinct. <p><b>Special Ability: Shred:</b> While charging or holding Of The Abyss, press the Attack button to unleash a lunging attack. If you use this on a Pallet or Breakable Wall, it will be destroyed.</p> <p><b>Special Ability: Portals:</b> The Demogorgon can traverse between Portals, granting it map-wide mobility. Press the Active Ability button to place an inactive Portal on the ground. Stand on a Portal and highlight the Portal you wish to emerge from. After, press the Active Ability to travel through The Upside Down and emerge from the highlighted Portal, briefly becoming Undetectable for a duration.</p><p>Portals become Activated the first time you traverse through them. When a Survivor walks over or attempts to seal an Activated Portal, they become Oblivious.</p>",
        teachablePerks: new Map([
            ["Surge", { src: "killer/killerPerks/demogorgon_teachable1.png", alt: "Surge" }],
            ["Cruel Limits", { src: "killer/killerPerks/demogorgon_teachable2.png", alt: "Cruel Limits" }],
            ["Mindbreaker", { src: "killer/killerPerks/demogorgon_teachable3.png", alt: "Mindbreaker" }]
        ]),
        perksDescriptions: new Map([
            ["Surge", "When you put a Survivor into the Dying State with a Basic Attack, all Generators in your vicinity will Explode, lose a chunk of Repair progress, and begin Regressing."],
            ["Cruel Limits", "When a Generator is completed, every Window and Vault location in the Map is blocked for a duration. During this time, Auras of blocked Vault locations are revealed."],
            ["Mindbreaker", "When Survivors are Repairing a Generator, they become Blinded and Exhausted. If a Survivor is already Exhausted before Mindbreaker activates, the Status Effect timer will pause, and not recover for the Duration of the Repair action. This effect lingers shortly after the Survivor leaves the Generator."]
        ]),
        mori: ["https://www.youtube.com/embed/s_ejKcD9Kuk"],
        voicelines: ""
    },
    {
        name: "The Executioner - Pyramid Head",
        description: "Merciless and unforgiving, The Executioner brings his own form of twisted justice to The Fog, tormenting Survivors with hazards around the map. Hooks are an effective tool, but nothing punishes quite like a Cage of Torment. All hope will swiftly fade the moment Pyramid Head raises his mighty blade to deliver the Final Judgment.",
        difficulty: "Very Hard",
        power: {key: "Rites of Judgement", value:"killer/killerPower/power_executioner.png"},
        powerDescription:"Carve a trail into the ground, inflicting Torment on any Survivor that crosses it. Pyramid Head can also fire a ranged attack – the Punishment of the Damned – while Rites of Judgment is active.",
        teachablePerks: new Map([
            ["Forced Penance", { src: "killer/killerPerks/executioner_teachable1.png", alt: "Forced Penance" }],
            ["Trail Of Torment", { src: "killer/killerPerks/executioner_teachable2.png", alt: "Trail Of Torment" }],
            ["Deathbound", { src: "killer/killerPerks/executioner_teachable3.png", alt: "Deathbound" }]
        ]),
        perksDescriptions: new Map([
            ["Forced Penance", "Any Survivor taking a Protection Hit will become Broken for an extended duration, rendering them incapable of healing."],
            ["Trail Of Torment", "After kicking a generator, lose your Terror Radius and Red Stain until a Survivor is injured or downed, or the generator stops regressing."],
            ["Deathbound", "When a Survivor heals another while at a moderate distance from you, the healer will scream and reveal their location. For a certain duration, they will be unable to hear your Terror Radius or see your Red Stain whenever they move away from the Survivor they healed."]
        ]),
        mori: ["https://www.youtube.com/embed/4pJEHKu2Nrs"],
        voicelines: ""
    },
    {
        name: "The Nemesis",
        description: "An unstoppable force relentless in his pursuit, nothing can stop The Nemesis from achieving his goal. His sweeping Tentacle infects Survivors with the T-Virus, further enhancing his destructive power in the process. Easily smash through pallets and breakable walls while two A.I-controlled Zombies patrol the map, applying additional pressure.",
        difficulty: "Hard",
        power: {key: "T-Virus", value:"killer/killerPower/power_nemesis.png"},
        powerDescription:"Hitting Survivors with a Tentacle Strike Contaminates them and powers up your Mutation Rate meter. When Mutation Rate reaches Level 2, Tentacle Strike can instantly break pallets and breakable walls. At Level 3, Tentacle Strike gains a boost to range and movement speed while charging.<p>The Nemesis also spawns 2 A.I.-controlled Zombies that can Contaminate Survivors, pressure them off generators, and block key escape routes. If a Zombie attacks a Contaminated Survivor, they lose a health state.</p>",
        teachablePerks: new Map([
            ["Lethal Pursuer", { src: "killer/killerPerks/nemesis_teachable1.png", alt: "Lethal Pursuer" }],
            ["Hysteria", { src: "killer/killerPerks/nemesis_teachable2.png", alt: "Hysteria" }],
            ["Eruption", { src: "killer/killerPerks/nemesis_teachable3.png", alt: "Eruption" }]
        ]),
        perksDescriptions: new Map([
            ["Lethal Pursuer", "At the start of a trial, the auras of all Survivors are revealed to you for a brief duration."],
            ["Hysteria", "When a healthy Survivor becomes injured, every other injured Survivor can no longer hear the Terror Radius of The Nemesis for up to thirty-seconds."],
            ["Eruption", "Damage a generator to highlight it with a yellow aura. Upon downing a Survivor, every generator affected by Eruption will explode, lose progress, and begin regressing. Any Survivor repairing an affected generator will scream and become briefly Incapacitated from several actions."]
        ]),
        mori: ["https://www.youtube.com/embed/yn1oDjC2Qz4"],
        voicelines: ""
    },
    {
        name: "The Cenobite - Pinhead",
        description: "The Cenobite, also known as Pinhead, specializes in inflicting map-wide suffering. Survivors must find the Lament Configuration lest a Chain Hunt begin, debilitating their movement with a relentless barrage of otherworldly shackles. The Cenobite can also summon a chain to bind Survivors, allowing him to gain ground and inflict punishment.",
        difficulty: "Very Hard",
        power: {key: "Summons of Pain", value:"killer/killerPower/power_cenobite.png"},
        powerDescription:"Summon and control a Possessed Chain to bind a Survivor. Should the Chain connect, the Survivor will be unable to sprint as they’re further slowed by additional Chains.<p>Pinhead also applies passive pressure. Survivors will see the aura of the Lament Configuration and must seek it out before a Chain Hunt begins. During a Chain Hunt, Survivors will be continuously barraged with Chains until the Lament Configuratrion is solved.</p><p>When a Survivor does attempt to solve the Lament Configuration, Pinhead can teleport directly to its location. Should Pinhead find the Lament Configuration first, he can instantly activate a Chain Hunt.</p>",
        teachablePerks: new Map([
            ["Deadlock", { src: "killer/killerPerks/cenobite_teachable1.png", alt: "Deadlock" }],
            ["Hex: Plaything", { src: "killer/killerPerks/cenobite_teachable2.png", alt: "Hex: Plaything" }],
            ["Scourge Hook: Gift of Pain", { src: "killer/killerPerks/cenobite_teachable3.png", alt: "Scourge Hook: Gift of Pain" }]
        ]),
        perksDescriptions: new Map([
            ["Deadlock", "Whenever a generator is completed, The Entity blocks the generator with the most progress for a significant duration, while it also becomes highlighted in white. Ideal for preventing momentum from shifting in Survivor favour."],
            ["Hex: Plaything", "When a Survivor is hooked for the first time, Hex: Plaything activates on a random Dull Totem. Until that Survivor cleanses their Hex: Plaything Totem, they will be unable to hear your Terror Radius or see your Red Stain. Unfortunately for them, they may have to lift the curse on their own, since The Entity will be blocking their Hex: Plaything Totem from all other Survivors for an extended duration."],
            ["Scourge Hook: Gift of Pain", "Each Trial, 4 random Hooks become Scourge Hooks. Any Survivor rescued from a Scourge Hook will bleed freely and suffer a healing speed penalty. Once healed, that Survivor will suffer an additional penalty to repairing and healing until being injured again."]
        ]),
        mori: ["killer/killerMori/cenobite.mp4", "killer/src/killerMori/cenobite.ogv", "killer/killerMori/cenobite.webm"],
        voicelines: ["killer/killerAudios/cenobite.mp3", "killer/src/killerAudios/cenobite.ogg", "killer/src/killerAudios/cenobite.wav"]
    },
    {
        name: "The Xenomorph",
        description: "A perfect organism, born of violence, designed to kill, the Xenomorph is a relentless and cunning specimen. It stalks prey through subterranean tunnels, emerging without hesitation, striking with its razor-sharp tail, and eliminating prey one by one.",
        difficulty: "Medium",
        power: {key: "Hidden Pursuit", value:"killer/killerPower/power_xenomorph.png"},
        powerDescription:"The Xenomorph can navigate a subterranean network of tunnels, allowing for rapid traversal across the Map and detecting nearby Survivor movement. Once inside, the Xenomorph can emerge at one of several Control Stations, covering great distances in a matter of seconds. If a Survivor is near a Control Station when the Xenomorph exits, their presence will be revealed through Killer Instinct.<p><b>Special Ability:</b> The Xenomorph can move on all fours, significantly reducing its Terror Radius and allowing for stealthier mobility. While in this state, the Xenomorph can strike Survivors with a Tail Attack that can hit through Windows, over dropped Pallets, and more.</p> <b>Special Item – Remote Flame Turret:</b> When playing as the Xenomorph, Survivors will gain the ability to interact with Turrets. Turrets can be found at Control Stations and picked up and moved by Survivors. They can use Turrets to warn when you are nearby and place them at locations of their choosing. If you approach one, it will fire at you and temporarily disable your Power. Attack a Turret to destroy it.",
        teachablePerks: new Map([
            ["Ultimate Weapon", { src: "killer/killerPerks/xenomorph_teachable1.png", alt: "Ultimate Weapon" }],
            ["Rapid Brutality", { src: "killer/killerPerks/xenomorph_teachable2.png", alt: "Rapid Brutality" }],
            ["Alien Instinct", { src: "killer/killerPerks/xenomorph_teachable3.png", alt: "Alien Instinct" }]
        ]),
        perksDescriptions: new Map([
            ["Ultimate Weapon", "When you search a Locker, all Survivors entering your vicinity will scream, reveal their Aura, and gain Blindness for a brief duration."],
            ["Rapid Brutality", "You can no longer gain Bloodlust. Instead, gain a temporary boost of speed every time you hit a Survivor with a Basic Attack."],
            ["Alien Instinct", "When you Hook a Survivor, the Aura of the furthest Survivor will be revealed to you for a brief duration. While their Aura is revealed, that Survivor receives the Oblivious Status Effect."]
        ]),
        mori: ["https://www.youtube.com/embed/tjj_LJG3HX0"],
        voicelines: ""
    },
    {
        name: "The Good Guy - Chucky",
        description: "Viciously cruel with a cutting sense of humor, Chucky is a brutally effective killing machine. Using his diminutive frame to his advantage, he’ll pop up when Survivors least expect it, chasing them down and introducing them to his trusty weapons.",
        difficulty: "Medium",
        power: {key: "Playtime's Over", value:"killer/killerPower/power_good_guy.png"},
        powerDescription:"The Good Guy is the first Killer in Dead by Daylight to feature a third-person camera. <p><b>Special Ability – Hidey-Ho Mode: </b> When Chucky enters Hidey-Ho Mode, he becomes Undetectable and generates Map-wide footfalls, disorienting Survivors. Though Hidey-Ho mode can be entered at any time, it does have a cooldown. </p><p><b>Special Ability – Scamper:</b> While in Hidey-Ho Mode, Chucky can Scamper under a downed Pallet or through a Window, allowing him to quickly gain ground.</p><p><b>Special Ability – Slice & Dice:</b> While in Hidey-Ho Mode, Chucky can sprint and lunge forward to Slice & Dice Survivors. This attack can be held, but Chucky will be unable to do anything else during this time. If a Survivor tries to Vault a Window or Pallet while you’re charging a Slice & Dice attack, Chucky can quickly chain into a Scamper.</p>",
        teachablePerks: new Map([
            ["Friends ‘Til the End", { src: "killer/killerPerks/good_guy_teachable1.png", alt: "Friends ‘Til the End" }],
            ["Hex: Two Can Play", { src: "killer/killerPerks/good_guy_teachable2.png", alt: "Hex: Two Can Play" }],
            ["Batteries Included", { src: "killer/killerPerks/good_guy_teachable3.png", alt: "Batteries Included" }]
        ]),
        perksDescriptions: new Map([
            ["Friends ‘Til the End", "You become Obsessed with one Survivor. When you Hook a Survivor that is not the Obsession, the Obsession becomes Exposed and reveals their Aura for a brief duration. If you Hook the Obsession, a random Survivor will scream, reveal their position, and become the Obsession. "],
            ["Hex: Two Can Play", "When a Survivor Stuns or Blinds you a number of times, a Dull Totem becomes a Hex Totem. When that Hex is active, Survivors who stun or blind you are Blinded for 4 seconds. The Hex effects persist as long as the related Hex Totem is standing. "],
            ["Batteries Included", "When within the vicinity of a completed Generator, gain Haste. The movement speed boost lingers for a brief duration after you leave the Generator’s vicinity."]
        ]),
        mori: ["https://www.youtube.com/embed/wgIP-c5YkXc"],
        voicelines: ""
    },
];
