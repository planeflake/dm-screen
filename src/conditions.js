import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlind, faHeartbeat, faDeaf, faGhost, faHandRock, faBan, faEyeSlash, faParachuteBox, faSkullCrossbones, faFrog, faBed, faAnchor, faDizzy, faProcedures, faTired } from '@fortawesome/free-solid-svg-icons';

const conditions = [
    {
      "index": "blinded",
      "name": "Blinded",
      "desc": [
        "- A blinded creature can't see and automatically fails any ability check that requires sight.",
        "- Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage."
      ],
      "url": "/api/conditions/blinded"
    },
    {
      "index": "charmed",
      "name": "Charmed",
      "desc": [
        "- A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects.",
        "- The charmer has advantage on any ability check to interact socially with the creature."
      ],
      "url": "/api/conditions/charmed"
    },
    {
      "index": "deafened",
      "name": "Deafened",
      "desc": [
        "- A deafened creature can't hear and automatically fails any ability check that requires hearing."
      ],
      "url": "/api/conditions/deafened"
    },
    {
      "index": "frightened",
      "name": "Frightened",
      "desc": [
        "- A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.",
        "- The creature can't willingly move closer to the source of its fear."
      ],
      "url": "/api/conditions/frightened"
    },
    {
      "index": "grappled",
      "name": "Grappled",
      "desc": [
        "- A grappled creature's speed becomes 0, and it can't benefit from any bonus to its speed.",
        "- The condition ends if the grappler is incapacitated (see the condition).",
        "- The condition also ends if an effect removes the grappled creature from the reach of the grappler or grappling effect, such as when a creature is hurled away by the thunderwave spell."
      ],
      "url": "/api/conditions/grappled"
    },
    {
      "index": "incapacitated",
      "name": "Incapacitated",
      "desc": ["- An incapacitated creature can't take actions or reactions."],
      "url": "/api/conditions/incapacitated"
    },
    {
      "index": "invisible",
      "name": "Invisible",
      "desc": [
        "- An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of hiding, the creature is heavily obscured. The creature's location can be detected by any noise it makes or any tracks it leaves.",
        "- Attack rolls against the creature have disadvantage, and the creature's attack rolls have advantage."
      ],
      "url": "/api/conditions/invisible"
    },
    {
      "index": "paralyzed",
      "name": "Paralyzed",
      "desc": [
        "- A paralyzed creature is incapacitated (see the condition) and can't move or speak.",
        "- The creature automatically fails Strength and Dexterity saving throws.",
        "- Attack rolls against the creature have advantage.",
        "- Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
      ],
      "url": "/api/conditions/paralyzed"
    },
    {
      "index": "petrified",
      "name": "Petrified",
      "desc": [
        "- A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.",
        "- The creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings.",
        "- Attack rolls against the creature have advantage.",
        "- The creature automatically fails Strength and Dexterity saving throws.",
        "- The creature has resistance to all damage.",
        "- The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized."
      ],
      "url": "/api/conditions/petrified"
    },
    {
      "index": "poisoned",
      "name": "Poisoned",
      "desc": [
        "- A poisoned creature has disadvantage on attack rolls and ability checks."
      ],
      "url": "/api/conditions/poisoned"
    },
    {
      "index": "prone",
      "name": "Prone",
      "desc": [
        "- A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.",
        "- The creature has disadvantage on attack rolls.",
        "- An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage."
      ],
      "url": "/api/conditions/prone"
    },
    {
      "index": "restrained",
      "name": "Restrained",
      "desc": [
        "- A restrained creature's speed becomes 0, and it can't benefit from any bonus to its speed.",
        "- Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage.",
        "- The creature has disadvantage on Dexterity saving throws."
      ],
      "url": "/api/conditions/restrained"
    },
    {
      "index": "stunned",
      "name": "Stunned",
      "desc": [
        "- A stunned creature is incapacitated (see the condition), can't move, and can speak only falteringly.",
        "- The creature automatically fails Strength and Dexterity saving throws.",
        "- Attack rolls against the creature have advantage."
      ],
      "url": "/api/conditions/stunned"
    },
    {
      "index": "unconscious",
      "name": "Unconscious",
      "desc": [
        "- An unconscious creature is incapacitated (see the condition), can't move or speak, and is unaware of its surroundings.",
        "- The creature drops whatever it's holding and falls prone.",
        "- The creature automatically fails Strength and Dexterity saving throws.",
        "- Attack rolls against the creature have advantage.",
        "- Any attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature."
      ],
      "url": "/api/conditions/unconscious"
    },
    {
      "index": "exhaustion",
      "name": "Exhaustion",
      "desc": [
        "Some special abilities and environmental hazards, such as starvation and the long-term effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. Exhaustion is measured in six levels. An effect can give a creature one or more levels of exhaustion, as specified in the effect's description.",
        "1 - Disadvantage on ability checks",
        "2 - Speed halved",
        "3 - Disadvantage on attack rolls and saving throws",
        "4 - Hit point maximum halved",
        "5 - Speed reduced to 0",
        "6 - Death",
        "If an already exhausted creature suffers another effect that causes exhaustion, its current level of exhaustion increases by the amount specified in the effect's description.",
        "A creature suffers the effect of its current level of exhaustion as well as all lower levels. For example, a creature suffering level 2 exhaustion has its speed halved and has disadvantage on ability checks.",
        "An effect that removes exhaustion reduces its level as specified in the effect's description, with all exhaustion effects ending if a creature's exhaustion level is reduced below 1.",
        "Finishing a long rest reduces a creature's exhaustion level by 1, provided that the creature has also ingested some food and drink."
      ],
      "url": "/api/conditions/exhaustion"
    },
    {
        "index": "concentration",
        "name": "Concentration",
        "desc": [
          "Some spells require you to maintain concentration in order to keep their magic active. If you lose concentration, such a spell ends.",
          "If a spell must be maintained with concentration, that fact appears in its Duration entry, and the spell specifies how long you can concentrate on it. You can end concentration at any time (no action required).",
          "Normal activity, such as moving and attacking, doesn’t interfere with concentration. The following factors can break concentration:",
          "- Casting another spell that requires concentration. You lose concentration on a spell if you cast another spell that requires concentration. You can’t concentrate on two spells at once.",
          "- Taking damage. Whenever you take damage while you are concentrating on a spell, you must make a Constitution saving throw to maintain your concentration. The DC equals 10 or half the damage you take, whichever number is higher. If you take damage from multiple sources, such as an arrow and a dragon’s breath, you make a separate saving throw for each source of damage.",
          "- Being incapacitated or killed. You lose concentration on a spell if you are incapacitated or if you die.",
          "The GM might also decide that certain environmental phenomena, such as a wave crashing over you while you’re on a storm-tossed ship, require you to succeed on a DC 10 Constitution saving throw to maintain concentration on a spell."
        ],
        "url": "/api/conditions/concentration"
      },
      {
          "index": "hasted",
          "name": "Hasted",
          "desc": ["Hasted"         
          ],
          "url": "/api/conditions/hasted"
        },
        {
            "index": "bleeding",
            "name": "Bleeding",
            "desc": ["Bleeding"         
            ],
            "url": "/api/conditions/bleeding"
          }
];

const iconMap = {
    "blinded": faBlind,
    "charmed": faHeartbeat,
    "deafened": faDeaf,
    "frightened": faGhost,
    "grappled": faHandRock,
    "incapacitated": faBan,
    "invisible": faEyeSlash,
    "paralyzed": faParachuteBox,
    "petrified": faSkullCrossbones,
    "poisoned": faFrog,
    "prone": faProcedures,
    "restrained": faAnchor,
    "stunned": faDizzy,
    "unconscious": faBed,
    "exhaustion": faTired
};

const getColor = (index) => {
    // Define color logic based on condition
    const colorMap = {
        "blinded": "gray",
        "charmed": "pink",
        "deafened": "darkblue",
        "frightened": "orange",
        "grappled": "brown",
        "incapacitated": "black",
        "invisible": "lightgray",
        "paralyzed": "purple",
        "petrified": "green",
        "poisoned": "green",
        "prone": "red",
        "restrained": "yellow",
        "stunned": "blue",
        "unconscious": "darkred",
        "exhaustion": "darkgray",
        "concentration":"lightblue"
    };
    return colorMap[index];
};

const Conditions = () => {
    const [selectedCondition, setSelectedCondition] = useState(null);
    const [player, setPlayer] = useState('');

    return (
        <div className="app-container" style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <div className="conditions-grid" style={{
                width: '50%', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', overflowY: 'auto', padding: '10px'
            }}>
                {conditions.map(condition => (
                    <button
                        key={condition.index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: getColor(condition.index),
                            color: 'white',
                            border: 'none',
                            padding: '10px',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedCondition(condition)}
                    >
                        <FontAwesomeIcon icon={iconMap[condition.index]} size="2x" />
                        <span>{condition.name}</span>
                    </button>
                ))}
            </div>
            <div className="condition-detail" style={{ width: '50%', padding: '10px' }}>
                {selectedCondition ? (
                    <>
                        <FontAwesomeIcon icon={iconMap[selectedCondition.index]} size="4x" style={{ color: getColor(selectedCondition.index) }} />
                        <div>
                            <h2>{selectedCondition.name}</h2>
                            {selectedCondition.desc.map((desc, index) => (
                                <p key={index}>{desc}</p>
                            ))}
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                <label style={{ marginRight: '10px' }}>Choose player to get {selectedCondition.name}:</label>
                                <select value={player} onChange={(e) => setPlayer(e.target.value)}>
                                    <option value="MageSmash">MageSmash</option>
                                    <option value="Liren">Liren</option>
                                </select>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Please select a condition to see more details.</p>
                )}
            </div>
        </div>
    );
};

export default Conditions;


