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
    const description = createSurvivorDetailsParagraph(survivor.description, "killerDetailsColor");
    const voicelinesHeading = createSurvivorDetailsSubHeading("Voicelines");
    const voicelines = createSurvivorVoicelines(survivor.voicelines);
    const perksHeading = createSurvivorDetailsSubHeading("Teachable Perks");
    const teachablePerks = createSurvivorTeachablePerks(survivor.teachablePerks, survivor.perksDescriptions);

    return `
        ${detailsName}
        ${description}
        ${voicelinesHeading}
            ${voicelines}
        </div>
        ${perksHeading}
        <div class="survivor-perks">
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
    if(voicelinesUrl.length > 1) {
        return `
        <div class="killer-voicelines">
            <audio controls>
                <source src="${voicelinesUrl[0]}" type="audio/mp3">
                <source src="${voicelinesUrl[1]}" type="audio/ogg">
                <source src="${voicelinesUrl[2]}" type="audio/wav">
                Your browser does not support the audio element.
            </audio>
        </div>
    `;
    } else {
        return `<div class="killer-voicelines">
                     <p>Has No Voicelines</p>
                </div>`;
    }
}

function createSurvivorTeachablePerks(teachablePerks, perksDescriptions) {
    return Array.from(teachablePerks).map(([perk, img]) => `
        <div class="survivor-perk-item">
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
        description: "An unlikely leader forced to rise to the occasion, Dwight Fairfield’s reluctant bravery inspires those around him. Understanding the value of teamwork, Dwight is adept at locating and bolstering the efficiency of his teammates.",
        teachablePerks: new Map([
            ["Bond", { src: "../survivor/survivorPerks/dwight_teachable1.png", alt: "Bond" }],
            ["Prove Thyself", { src: "../survivor/survivorPerks/dwight_teachable2.png", alt: "Prove Thyself" }],
            ["Leader", { src: "../survivor/survivorPerks/dwight_teachable3.png", alt: "Leader" }]
        ]),
        perksDescriptions: new Map([
            ["Bond", "Reveal the auras of all nearby Survivors, allowing you to effectively plan your next move."],
            ["Prove Thyself", "Grant a repair speed boost to every Survivor -- yourself included -- actively repairing generators in your immediate vicinity."],
            ["Leader", "Provide nearby teammates with action speed boosts to healing, sabotaging, unhooking, cleansing, unlocking chests, and opening exit gates."]
        ]),
        voicelines: ""
    },

    {
        name: "Meg Thomas",
        description: "Driven by reckless courage, the athletic Meg Thomas has never been afraid to push her limits. Prone to stepping up in the clutch, Meg gets a thrill out of goading Killers into lengthy chases, buying essential time for her teammates.",
        teachablePerks: new Map([
            ["Quick & Quiet", { src: "../survivor/survivorPerks/meg_teachable1.png", alt: "Quick & Quiet" }],
            ["Sprint Burst", { src: "../survivor/survivorPerks/meg_teachable2.png", alt: "Sprint Burst" }],
            ["Adrenaline", { src: "../survivor/survivorPerks/meg_teachable3.png", alt: "Adrenaline" }]
        ]),
        perksDescriptions: new Map([
            ["Quick & Quiet", "The noise made when quickly vaulting obstacles and hiding in lockers is silenced entirely, disorienting a Killer mid-chase."],
            ["Sprint Burst", "The moment you begin running, break into a sprint and gain a burst of speed for a brief duration. Using Sprint Burst leaves you Exhausted, and thus, this perk cannot be triggered while Exhausted."],
            ["Adrenaline", "When the exit gates are powered, instantly heal one health state and gain a burst of speed. If hooked or carried by the Killer when Adrenaline activates, heal the moment you are freed. Causes the Exhausted status effect, though Adrenaline will still activate if Exhausted from a different perk."]
        ]),
        voicelines: ""
    },
    {
        name: "Claudette Morel",
        description: "Claudette understands the value of altruism, using her aptitude for botany to ensure her teammates are prepared for the challenges ahead. An expert healer to herself and others, Claudette’s supportive presence is always welcome.",
        teachablePerks: new Map([
            ["Empathy", { src: "../survivor/survivorPerks/claudette_teachable1.png", alt: "Empathy" }],
            ["Botany Knowledge", { src: "../survivor/survivorPerks/claudette_teachable2.png", alt: "Botany Knowledge" }],
            ["Self-Care", { src: "../survivor/survivorPerks/claudette_teachable3.png", alt: "Self-Care" }]
        ]),
        perksDescriptions: new Map([
            ["Empathy", "Reveal the auras of all injured and dying Survivors in your vicinity, allowing you to efficiently heal teammates in need."],
            ["Botany Knowledge", "Increase healing speed and healing item efficiency, saving precious time."],
            ["Self-Care", "Unlock the ability to self-heal without a healing item, albeit at a reduced speed. Increases the efficiency of healing items while self-healing."]
        ]),
        voicelines: ""
    },
    {
        name: "Jake Park",
        description: "A solitary specialist, Jake Park’s time in the wilderness has sharpened his survival instincts. Stealthy and resourceful, the only sign of his presence are the Sabotaged Hooks he leaves behind.",
        teachablePerks: new Map([
            ["Iron Will", { src: "../survivor/survivorPerks/jake_teachable1.png", alt: "Iron Will" }],
            ["Calm Spirit", { src: "../survivor/survivorPerks/jake_teachable2.png", alt: "Calm Spirit" }],
            ["Saboteur", { src: "../survivor/survivorPerks/jake_teachable3.png", alt: "Saboteur" }]
        ]),
        perksDescriptions: new Map([
            ["Iron Will", "Your grunts of pain are significantly reduced to varying degrees when injured, making you difficult to find and track."],
            ["Calm Spirit", "Significantly increase the chance that crows will not be alerted by your presence. In addition, your resilience always suppresses screams of pain and madness."],
            ["Saboteur", "When a Killer picks up a Survivor, the aura of every hook in their vicinity is revealed. Hooks can be now sabotaged without a toolbox, facilitating last-minute saves."]
        ]),
        voicelines: ""
    },
    {
        name: "William Bill Overbeck",
        description: "Hardened by years of experience, Bill Overbeck knows that survival rarely comes without sacrifice. No matter the cost, he’ll make sure his teammates live to fight another day. It wouldn’t be the first time he was left for dead.",
        teachablePerks: new Map([
            ["Left Behind", { src: "../survivor/survivorPerks/bill_teachable1.png", alt: "Left Behind" }],
            ["Borrowed Time", { src: "../survivor/survivorPerks/bill_teachable1.png", alt: "Borrowed Time" }],
            ["Unbreakable", { src: "../survivor/survivorPerks/bill_teachable1.png", alt: "Unbreakable" }]
        ]),
        perksDescriptions: new Map([
            ["Left Behind", "When you’re the last Survivor remaining in the trial, reveal the aura of the Hatch while in its vicinity."],
            ["Borrowed Time", "After rescuing a Survivor from the hook, that Survivor gains the Endurance status effect -- the ability to safely take a hit for a brief duration. Rather than being downed, that Survivor must instead take time to mend a Deep Wound."],
            ["Unbreakable", "Past battles have taught you a thing or two about survival. Once per trial, recover from being downed without aid from a teammate."]
        ]),
        voicelines: ""
    },
    {
        name: "Nea Karlsson",
        description: "Years of evading authorities and navigating the streets of Sweden have kept the elusive Nea Karlsson one step ahead. Capable of escaping in a pinch, her catlike agility has gotten her out of trouble time and again.",
        teachablePerks: new Map([
            ["Balanced Landing", { src: "../survivor/survivorPerks/nea_teachable1.png", alt: "Balanced Landing" }],
            ["Urban Evasion", { src: "../survivor/survivorPerks/nea_teachable2.png", alt: "Urban Evasion" }],
            ["Streetwise", { src: "../survivor/survivorPerks/nea_teachable3.png", alt: "Streetwise" }]
        ]),
        perksDescriptions: new Map([
            ["Balanced Landing", "Your agility and catlike reflexes are incomparable. Break into a sprint after falling from a great height, granting massive distance from the Killer. Using Balanced Landing causes Exhaustion, and thus cannot be triggered while Exhausted."],
            ["Urban Evasion", "Years of evading the cops taught you a thing or two about stealth. Move significantly faster while crouching."],
            ["Streetwise", "Long nights out taught you to do a lot with what you have got. Items used by yourself and Survivors in your vicinity will deplete at a slower rate."]
        ]),
        voicelines: ""
    },
    {
        name: "David King",
        description: "Some say misunderstood, others say arrogant – though never to his face. A rough and tumble scrapper with a penchant for debauchery and ruckus, it’s always better to have David King on your side.",
        teachablePerks: new Map([
            ["We're Gonna Live Forever", { src: "../survivor/survivorPerks/david_teachable1.png", alt: "We're Gonna Live Forever" }],
            ["Dead Hard", { src: "../survivor/survivorPerks/david_teachable2.png", alt: "Dead Hard" }],
            ["No Mither", { src: "../survivor/survivorPerks/david_teachable3.png", alt: "No Mither" }]
        ]),
        perksDescriptions: new Map([
            ["We're Gonna Live Forever", "Your few friends deserve the best protection. Heal dying teammates at twice the speed, allowing for clutch saves. In addition, gain tokens for heroic actions – Safe Hook Rescues, protection hits, and rescuing a carried Survivor – to receive bonus Bloodpoints."],
            ["Dead Hard", "When injured, use an action to gain a short burst of speed that actively dodges a Killer's swing. Causes the Exhausted Status Effect and cannot be used while Exhausted."],
            ["No Mither", "Not for the faint of heart. Remain perpetually injured throughout the Trial but gain several benefits. You no longer leave behind pools of blood, your grunts of pain are reduced, and you gain the ability to always recover from the dying state, giving you another chance to join the fight."]
        ]),
        voicelines: ""
    },
    {
        name: "Laurie Strode",
        description: "The epitome of a Survivor, Laurie Strode exemplifies determination in the face of pure evil. Even while being relentlessly pursued, she’s able to muster the strength to fight back against all odds.",
        teachablePerks: new Map([
            ["Sole Survivor", { src: "../survivor/survivorPerks/laurie_teachable1.png", alt: "Sole Survivor" }],
            ["Object of Obsession", { src: "../survivor/survivorPerks/laurie_teachable2.png", alt: "Object of Obsession" }],
            ["Decisive Strike", { src: "../survivor/survivorPerks/laurie_teachable3.png", alt: "Decisive Strike" }]
        ]),
        perksDescriptions: new Map([
            ["Sole Survivor", "Gain a token whenever one of your teammates is sacrificed or killed. Each token widens the range at which your aura can be read by the Killer."],
            ["Object of Obsession", "A supernatural bond links you to the Killer. Whenever the Killer reads your aura, their aura is revealed to you -- during this time, gain an action speed boost. If you are the Obsession, your aura is briefly revealed to the Killer every 30 seconds."],
            ["Decisive Strike", "If grabbed or picked up shortly after being unhooked, succeed a difficult skill check to free yourself from the Killer’s grasp. Decisive Strike deactivates upon succeeding or failing that skill check. It also deactivates when repairing a generator, healing yourself or others, cleansing or blessing a Totem, sabotaging a hook, or unhooking a Survivor."]
        ]),
        voicelines: ""
    },
    {
        name: "Quentin Smith",
        description: "As resolute as he is sleep-deprived, Quentin Smith knows all about the value of cooperation. Even when trapped within an endless nightmare, he’s able to remain grounded, providing aid and guidance through his comforting presence.",
        teachablePerks: new Map([
            ["Wake Up!", { src: "../survivor/survivorPerks/quentin_teachable1.png", alt: "Wake Up!" }],
            ["Pharmacy", { src: "../survivor/survivorPerks/quentin_teachable2.png", alt: "Pharmacy" }],
            ["Agitation", { src: "../survivor/survivorPerks/quentin_teachable3.png", alt: "Agitation" }]
        ]),
        perksDescriptions: new Map([
            ["Wake Up!", "Once all generators are completely repaired, the auras of both exit gates are revealed to you. When opening an exit gate, your action speed is increased and your aura is revealed to Survivors within an extended range."],
            ["Pharmacy", "You have a knack for finding medicine. Unlock chests at a high speed, with the first Chest guaranteeing a powerful Med-kit."],
            ["Vigil", "You look over your friends even in dire situations. Increases your recovery rate from all negative status effects – Blindness, Broken, Exhausted, Exposed, Hemorrhage, Hindered, and Oblivious. This effect also applies to all Survivors in your immediate vicinity."]
        ]),
        voicelines: ""
    },
    {
        name: "Detective David Tapp",
        description: "Haunted by the failures of his past, Detective David Tapp has resolved to make a difference this time around. With years of experience at his disposal and a penchant for astute hunches, not even the most concealed clue will slip under his radar.",
        teachablePerks: new Map([
            ["Tenacity", { src: "../survivor/survivorPerks/tapp_teachable1.png", alt: "Tenacity" }],
            ["Detective's Hunch", { src: "../survivor/survivorPerks/tapp_teachable2.png", alt: "Detective's Hunch" }],
            ["Stake Out", { src: "../survivor/survivorPerks/tapp_teachable3.png", alt: "Stake Out" }]
        ]),
        perksDescriptions: new Map([
            ["Tenacity", "There is nothing stopping you. When downed in the dying state, crawl faster while simultaneously recovering."],
            ["Detective's Hunch", "Whenever a generator is completed, reveal the auras of generators, Totems, and chests in your vicinity for a brief duration."],
            ["Stake Out", "For every 15 seconds spent within the Killer’s Terror Radius while not in a chase, gain a token up to a maximum of 4. Each token converts a good Skill Check into a great Skill Check, as well as granting a small bonus to generator repair progress."]
        ]),
        voicelines: ""
    },
    {
        name: "Nancy Wheeler",
        description: "Rebellious and resourceful, Nancy Wheeler is a stubborn investigator with an instinct for a good story. Determined to uncover the truth no matter the cost, her fearless drive to delve into the darkest corners has proven invaluable in The Fog.",
        teachablePerks: new Map([
            ["Better Together", { src: "../survivor/survivorPerks/nancy_teachable1.png", alt: "Better Together" }],
            ["Fixated", { src: "../survivor/survivorPerks/nancy_teachable2.png", alt: "Fixated" }],
            ["Inner Strength", { src: "../survivor/survivorPerks/nancy_teachable3.png", alt: "Inner Strength" }]
        ]),
        perksDescriptions: new Map([
            ["Better Together", "When you’re Repairing a Generator, its Aura is revealed to all nearby Survivors. If a Killer downs a Survivor while you’re Repairing a Generator, you’ll briefly see the Auras of all other Survivors."],
            ["Fixated", "Your Walking speed is increased, and your Scratch Marks are visible to you. "],
            ["Inner Strength", "When you Cleanse a Totem, Inner Healing Activates. While Injured, hide inside a locker for a brief duration to fully heal 1 Health State. This will not work if you are Broken."]
        ]),
        voicelines: ""
    },
    {
        name: "Steve Harrington",
        description: "Brave, loyal, and a natural leader, Steve Harrington has faced untold danger and lived to tell the tale. Whether you’re selling ice cream, babysitting the local youths, or facing alien horrors from the depths of the Upside Down, you always want Harrington in your corner.",
        teachablePerks: new Map([
            ["Babysitter", { src: "../survivor/survivorPerks/steve_teachable1.png", alt: "Babysitter" }],
            ["Camaraderie", { src: "../survivor/survivorPerks/steve_teachable2.png", alt: "Camaraderie" }],
            ["Second Wind", { src: "../survivor/survivorPerks/steve_teachable3.png", alt: "Second Wind" }]
        ]),
        perksDescriptions: new Map([
            ["Babysitter", "When you Unhook a Survivor, the Rescued Survivor gains the Haste Status Effect, and briefly has their Scratch Marks and Pools of Blood suppressed. During this time, Babysitter also reveals the Killer’s Aura for a brief duration."],
            ["Camaraderie", "While you are on the Hook in the Struggle Phase, Camaraderie is active. If another Survivor is near the Hook during this time, the Struggle Phase timer is paused for a duration."],
            ["Second Wind", "After Healing a Survivor, the next time you are Unhooked, you gain the Broken Status Effect Broken. If you survive for a duration, you will automatically heal 1 Health State. The Perk deactivates if you are successfully healed by Second Wind or if you’re put into the Dying State."]
        ]),
        voicelines: ""
    },
    {
        name: "Cheryl Mason",
        description: "No stranger to indescribable terror, Cheryl Mason has grown emboldened by the looming presence of evil. Drawing strength from the horrors of her past, she has learned to manipulate powers from beyond to achieve her noble goal.",
        teachablePerks: new Map([
            ["Soul Guard", { src: "../survivor/survivorPerks/cheryl_teachable1.png", alt: "Soul Guard" }],
            ["Blood Pact", { src: "../survivor/survivorPerks/cheryl_teachable2.png", alt: "Blood Pact" }],
            ["Repressed Alliance", { src: "../survivor/survivorPerks/cheryl_teachable3.png", alt: "Repressed Alliance" }]
        ]),
        perksDescriptions: new Map([
            ["Soul Guard", "After being healed or recovering from the dying state, briefly gain Endurance to safely take a hit. If cursed by a Hex Totem, you can recover completely from the dying state."],
            ["Blood Pact", "When you or the Obsession are injured, see each other’s auras. After healing or being healed by the Obsession, move at an increased speed while in each other’s vicinity."],
            ["Repressed Alliance", "After repairing generators for an extended duration, you can call upon The Entity to block the generator you’re working on, preventing an approaching Killer from regressing its progress."]
        ]),
        voicelines: ""
    },
    {
        name: "Jill Valentine",
        description: "Bravery comes natural to Jill Valentine, whose heroism proved invaluable during her harrowing time in Raccoon City. Even with a lethal pursuer on her trail, Jill’s survival instincts provide her and her teammates with a few crucial advantages. Don’t expect her to go down without a fight.",
        teachablePerks: new Map([
            ["Counterforce", { src: "../survivor/survivorPerks/jill_teachable1.png", alt: "Counterforce" }],
            ["Resurgence", { src: "../survivor/survivorPerks/jill_teachable2.png", alt: "Resurgence" }],
            ["Blast Mine", { src: "../survivor/survivorPerks/jill_teachable3.png", alt: "Blast Mine" }]
        ]),
        perksDescriptions: new Map([
            ["Counterforce", "Cleanse Totems faster, gaining a cleansing speed bonus for every Totem cleansed. After cleansing a Totem, the aura of the furthest Totem is revealed."],
            ["Resurgence", "After being unhooked, instantly gain a significant burst of healing progress, shortening the distance to a full heal."],
            ["Blast Mine", "After achieving a considerable amount of repair progress on generators, a Blast Mine becomes available. Place an explosive trap beneath a generator for a moderate duration, which detonates when that generator is damaged by the Killer, blinding and stunning them. The trap is deactivated once it explodes."]
        ]),
        voicelines: ""
    },
    {
        name: "Leon S. Kennedy",
        description: "Leon Kennedy might be a Rookie, but during that one fateful night, he faced an entire lifetime of horror and brutality. At once resilient and resourceful, Leon is adaptable above all, whether crafting makeshift weaponry or retracing his steps through labyrinthine hallways.",
        teachablePerks: new Map([
            ["Bite the Bullet", { src: "../survivor/survivorPerks/leon_teachable1.png", alt: "Bite the Bullet" }],
            ["Flashbang", { src: "../survivor/survivorPerks/leon_teachable2.png", alt: "Flashbang" }],
            ["Rookie Spirit", { src: "../survivor/survivorPerks/leon_teachable3.png", alt: "Rookie Spirit" }]
        ]),
        perksDescriptions: new Map([
            ["Bite the Bullet", "When healing, you and the Survivor you’re healing don’t make any noise. Failed Skill Checks do not trigger a loud noise notification."],
            ["Flashbang", "After making significant repair progress on a generator, gain the ability to craft a flash grenade by entering a locker empty-handed. Flash grenades can be used to distract and blind a Killer."],
            ["Rookie Spirit", "When repairing generators, successfully complete a number of Skill Checks to activate Rookie Spirit. Once active, reveal the auras of all regressing generators."]
        ]),
        voicelines: ""
    },
    {
        name: "Ada Wong",
        description: "Sometimes it’s safer to keep people guessing, and no one knows this better than Ada Wong. Dexterous and enigmatic, Ada’s survival skills make her a valuable ally, provided interests remain aligned.",
        teachablePerks: new Map([
            ["Wiretap", { src: "../survivor/survivorPerks/ada_teachable1.png", alt: "Wiretap" }],
            ["Reactive Healing", { src: "../survivor/survivorPerks/ada_teachable2.png", alt: "Reactive Healing" }],
            ["Low Profile", { src: "../survivor/survivorPerks/ada_teachable3.png", alt: "Low Profile" }]
        ]),
        perksDescriptions: new Map([
            ["Wiretap", "After some Generator repair progress, gain the ability to install a Spy Trap that remains active for a duration. If the Killer enters the vicinity of a trapped Generator, their aura will be revealed to all Survivors."],
            ["Reactive Healing", "When injured, gain an instant surge of Healing progress if the Killer injures another Survivor in your vicinity."],
            ["Low Profile", "The moment you become the last Survivor standing, your Scratch Marks, Pools of Blood and grunts of pain are temporarily suppressed."]
        ]),
        voicelines: ""
    },
    {
        name: "Nicolas Cage",
        description: "A cinematic icon with over one hundred films under his belt, legendary actor Nicolas Cage brings boundless creativity to any project – but nothing could have prepared him for his deadliest role yet.",
        teachablePerks: new Map([
            ["Dramaturgy", { src: "../survivor/survivorPerks/cage_teachable1.png", alt: "Dramaturgy" }],
            ["Scene Partner", { src: "../survivor/survivorPerks/cage_teachable2.png", alt: "Scene Partner" }],
            ["Plot Twist", { src: "../survivor/survivorPerks/cage_teachable3.png", alt: "Plot Twist" }]
        ]),
        perksDescriptions: new Map([
            ["Dramaturgy", "When healthy, press the active ability button to activate Dramaturgy while running to gain a brief vaulting speed boost. Immediately afterward, one of 4 random effects will occur: Briefly become Exposed, move slightly faster for a few seconds, let out a scream, or drop your Item to gain a Firecracker. This Perk causes the Exhaustion status effect and cannot be used while Exhausted."],
            ["Scene Partner", "When in the Killer’s Terror Radius, look in the Killer’s direction to scream and receive a brief view of their Aura. Be warned, however – there is a slight chance you’ll scream once more."],
            ["Plot Twist", "When injured, press the active ability button while crouched to willingly enter the Dying State. During this time, you will remain silent and leave no Blood Pools. From there, you can recover on your own to become Broken for a brief duration, and then fully healed."]
        ]),
        voicelines: ""
    },
    {
        name: "Sable Ward",
        description: "While some fear the darkness, Sable Ward embraces it. Fascinated by horror and drawn to all things wicked, Sable was among the few Survivors to willingly step into The Fog in search of her best friend Mikaela.",
        teachablePerks: new Map([
            ["Invocation: Weaving Spiders", { src: "../survivor/survivorPerks/sable_teachable1.png", alt: "Invocation: Weaving Spiders" }],
            ["Strength In Shadows", { src: "../survivor/survivorPerks/sable_teachable2.png", alt: "Strength In Shadows" }],
            ["Wicked", { src: "../survivor/survivorPerks/sable_teachable3.png", alt: "Wicked" }]
        ]),
        perksDescriptions: new Map([
            ["Invocation: Weaving Spiders", "This Invocation can only be performed in the Basement and takes a considerable duration of time to complete. Survivors can see your Aura during the process and can join you, increasing the Invocation’s speed. Once complete, all Survivors will gain a boost of Repair progress. On the other hand, you’ll be Injured and Broken for the remainder of the Trial."],
            ["Strength In Shadows", "When in the basement, you can quickly heal without a Med-Kit. Afterward, the Killer’s Aura is briefly revealed."],
            ["Wicked", "Gain the ability to successfully unhook yourself from Basement Hooks. When you successfully do so, the Killer’s Aura is briefly revealed. "]
        ]),
        voicelines: ""
    },
    {
        name: "Lara Croft",
        description: "Memories of branches tearing through her flesh. Of rushing water flooding her lungs. Of brushes with death, and so many more to come. Whether facing the perils of the supernatural or the extremes of nature, Lara Croft epitomizes survival instinct.",
        teachablePerks: new Map([
            ["Finesse", { src: "../survivor/survivorPerks/lara_teachable1.png", alt: "Finesse" }],
            ["Hardened", { src: "../survivor/survivorPerks/lara_teachable2.png", alt: "Hardened" }],
            ["Specialist", { src: "../survivor/survivorPerks/lara_teachable3.png", alt: "Specialist" }]
        ]),
        perksDescriptions: new Map([
            ["Finesse", "Your fast vaults are faster when healthy, with a cooldown after a successful use."],
            ["Hardened", "When you open a Chest and cleanse or bless a Totem, Hardened activates for the duration of the Trial. From that point, every time you scream, you’ll instead reveal the Killer’s Aura."],
            ["Specialist", "When you open or rummage through a Chest, gain 1 Token (up to 3). When you do a Great Skill Check, consume a Token to reduce the max required Generator progress."]
        ]),
        voicelines: ["../survivor/survivorAudios/lara.mp3", "../survivor/survivorAudios/lara.ogg", "../survivor/survivorAudios/lara.wav"]
    }
];