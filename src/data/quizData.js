// Each question has a spectrum: left pole → right pole
// 4 slider positions: Strongly Left (0), Lean Left (1), Lean Right (2), Strongly Right (3)
// Scoring multipliers: [1.0, 0.5, 0.5, 1.0] for [strongLeft, leanLeft, leanRight, strongRight]

export const questions = [
  // Phase 1 · Rational Orientation
  {
    id: 1,
    phase: 1,
    weight: 1.0,
    dimension: 'structuration',
    text: 'After dropping your bags at the hotel, your typical "first move" is:',
    leftLabel: "Confirming routes or wait times first to have a clear plan in mind.",
    rightLabel: "Heading out immediately to wander and see what interesting things are happening nearby.",
    leftImpact: { architect: 1 },
    rightImpact: { flowWalker: 1 }
  },
  {
    id: 2,
    phase: 1,
    weight: 1.0,
    dimension: 'selfExpansion',
    text: "When you travel, what excites you most?",
    leftLabel: "Discovering a new side of myself and experiencing inner growth.",
    rightLabel: "Relaxing, enjoying good food, taking photos, and having fun.",
    leftImpact: { soulSeeker: 1 },
    rightImpact: { pleasureSeeker: 1 }
  },
  {
    id: 3,
    phase: 1,
    weight: 1.0,
    dimension: 'placeResonance',
    text: "When you think back on a trip, what do you remember more easily?",
    leftLabel: "People's stories, local smells, and the overall atmosphere.",
    rightLabel: "The places I visited and the itinerary I completed.",
    leftImpact: { connector: 1 },
    rightImpact: { wanderer: 1 }
  },
  {
    id: 4,
    phase: 1,
    weight: 1.0,
    dimension: 'openness',
    text: "If you had one free day in a city, you would choose to:",
    leftLabel: "Wander into unmarked alleys or visit a hidden, niche exhibition.",
    rightLabel: "Go to the most famous landmarks and must-try restaurants.",
    leftImpact: { explorer: 1 },
    rightImpact: { comfortKeeper: 1 }
  },

  // Phase 2 · Intuitive Projection
  {
    id: 5,
    phase: 2,
    weight: 1.5,
    dimension: 'selfExpansion',
    text: "Which scene feels more like your ideal travel moment?",
    leftLabel: "A person alone, quietly meditating or immersed in thought.",
    rightLabel: "Friends laughing together, raising glasses by the sea.",
    leftImpact: { soulSeeker: 1 },
    rightImpact: { pleasureSeeker: 1 }
  },
  {
    id: 6,
    phase: 2,
    weight: 1.5,
    dimension: 'placeResonance',
    text: "Which type of travel experience attracts you more?",
    leftLabel: "Chatting and interacting with local people.",
    rightLabel: "Standing alone at a high viewpoint, overlooking the city.",
    leftImpact: { connector: 1 },
    rightImpact: { wanderer: 1 }
  },
  {
    id: 7,
    phase: 2,
    weight: 1.5,
    dimension: 'openness',
    text: "Where would you rather spend an entire day?",
    leftLabel: "A remote or unconventional art installation / natural setting.",
    rightLabel: "A lively, iconic tourist attraction.",
    leftImpact: { explorer: 1 },
    rightImpact: { comfortKeeper: 1 }
  },
  {
    id: 8,
    phase: 2,
    weight: 1.5,
    dimension: 'structuration',
    text: "Which image makes you feel more at ease?",
    leftLabel: "A tightly planned itinerary filled with notes.",
    rightLabel: 'A blank map with the words "go with the flow".',
    leftImpact: { architect: 1 },
    rightImpact: { flowWalker: 1 }
  },

  // Phase 3 · Integrative & Situational
  {
    id: 9,
    phase: 3,
    weight: 2.0,
    dimension: 'mixed',
    text: "A friend invites you to an unknown island — leaving tomorrow. What do you do?",
    leftLabel: "Immediately check flights, safety, and logistics. I need a plan.",
    rightLabel: "Say yes right away and figure things out as you go.",
    leftImpact: { architect: 1 },
    rightImpact: { flowWalker: 0.5, explorer: 0.5 }
  },
  {
    id: 10,
    phase: 3,
    weight: 1.0,
    dimension: 'selfExpansion',
    text: "Think of the most memorable trip you have ever had. It made you feel:",
    leftLabel: "I understood myself better — it was meaningful and transformative.",
    rightLabel: "I felt relaxed and genuinely happy — it was pure enjoyment.",
    leftImpact: { soulSeeker: 1 },
    rightImpact: { pleasureSeeker: 1 }
  },
  {
    id: 11,
    phase: 3,
    weight: 1.0,
    dimension: 'placeResonance',
    text: "On a trip, which feeling matters more to you?",
    leftLabel: "A deep connection with the local people and their lives.",
    rightLabel: "A sense of freedom and solitude in the places I discover.",
    leftImpact: { connector: 1 },
    rightImpact: { wanderer: 1 }
  },
  {
    id: 12,
    phase: 3,
    weight: 0.5,
    dimension: 'mixed',
    text: "Which sound feels more calming and comforting to you?",
    leftLabel: "The noise of a busy night market — voices, laughter, life.",
    rightLabel: "The sound of wind in the forest and footsteps on a quiet path.",
    leftImpact: { connector: 1, pleasureSeeker: 1 },
    rightImpact: { wanderer: 1, soulSeeker: 1 }
  }
];

// Scoring multipliers for 4 cube positions
// Position 0 = Strongly Left, 1 = Lean Left, 2 = Lean Right, 3 = Strongly Right
export const positionMultipliers = [1.0, 0.5, 0.5, 1.0];
export const positionSides = ['left', 'left', 'right', 'right'];
export const positionLabels = ['Strongly Left', 'Lean Left', 'Lean Right', 'Strongly Right'];

export const personalityTypes = {
  "high-high-high-high": {
    name: "Soul Pilgrim",
    title: "Seeking meaning and self-understanding",
    quote: "Through travel, I reunite with myself.",
    description: "Prefers structured, in-depth journeys such as cultural rituals, volunteering, or healing itineraries. Feels fulfilled through spiritual growth and inner integration.",
    recommendation: "Chenghuang Temple cultural rituals → volunteering projects (old lane restoration) → evening reflection workshops at Jing'an Temple"
  },
  "high-high-high-low": {
    name: "Wandering Poet",
    title: "Pursues soulful encounters and moments of inspiration",
    quote: "My soul breathes best outside the plan.",
    description: "Spontaneous, improvisational, artistic, and symbolic. Finds insight and emotional awakening through unexpected encounters.",
    recommendation: "M50 Art District → Huangpu River night cruise → late-night writing and sharing in cafés"
  },
  "high-low-low-high": {
    name: "Inner Guardian",
    title: "Seeks inner organization through quiet, safe environments",
    quote: "In silence, I finally hear myself.",
    description: "Calm, introspective, inward-oriented, and ritualized. Achieves balance through ordered solitude and quiet reflection.",
    recommendation: "Chenshan Botanical Garden → Zen meditation sessions → writing in independent bookstores"
  },
  "high-low-high-low": {
    name: "Dream Walker",
    title: "Explores spiritual metaphors of the self",
    quote: "Every step I take is an interpretation of a dream.",
    description: "Fluid and symbolic, often documenting travel through images or stories. Feels connected to a larger self through movement and flow.",
    recommendation: "Wukang Road → Tank Shanghai Art Center → riverside sketching or photography"
  },
  "high-high-low-high": {
    name: "Silent Philosopher",
    title: "Uses reason and ritual to reflect on self and relationships",
    quote: "By connecting with others, I come to understand myself.",
    description: "Prefers orderly, reflective social and cultural experiences. Finds self-positioning through stable communities and tradition.",
    recommendation: "Talks at Sinan Mansions → community cultural participation → traditional tea ceremony experiences"
  },
  "high-high-low-low": {
    name: "Mindful Artisan",
    title: "Repairs the inner world through hands-on creation",
    quote: "I reshape my heart with my hands.",
    description: "Gentle, sensory, and improvisational. Finds calm and insight through making and doing.",
    recommendation: "Pottery classes → coffee hand-brewing workshops → leisurely walks in community botanical gardens"
  },
  "high-low-high-high": {
    name: "Insight Scholar",
    title: "Explores meaning through knowledge and rational understanding",
    quote: "Understanding the world is where self-understanding begins.",
    description: "Well-planned, research-driven, and theme-oriented cultural travel. Moves from understanding the world to understanding the self.",
    recommendation: "In-depth museum guided tours → Shanghai Urban Planning Exhibition Center → evening themed talks or discussions"
  },
  "high-low-low-low": {
    name: "Spirit Nomad",
    title: "Seeks gentle inner freedom, releasing control",
    quote: "I'm not searching for answers—I'm walking with the wind.",
    description: "Light, intuitive, often solo, yet not lonely. Finds peace through flow and emotional lightness.",
    recommendation: "Morning walks along Hengshan Road → bookstores → small, niche exhibitions"
  },
  "low-high-high-low": {
    name: "Festival Mover",
    title: "Seeks joy, social energy, and novelty",
    quote: "Joy itself is the destination.",
    description: "Energetic, crowd-loving, activity-driven. Gains energy through rhythm, people, and shared excitement.",
    recommendation: "Tianzifang → Bund night markets → music festivals or creative markets"
  },
  "low-high-high-high": {
    name: "Urban Adventurer",
    title: "Enjoys novelty while maintaining control and safety",
    quote: "I enjoy the new—but I trust what's certain.",
    description: "Outgoing, well-planned, and photo-oriented. Finds satisfaction in exploration within clear boundaries.",
    recommendation: "Shanghai Disneyland themed day → Global Harbor photo check-ins → refined dinner experiences"
  },
  "low-high-low-high": {
    name: "Heritage Keeper",
    title: "Reconnects with identity through tradition and history",
    quote: "By looking back, I understand where I stand.",
    description: "Structured cultural travel with a nostalgic tone. Finds belonging through revisiting the past.",
    recommendation: "Old lane (longtang) heritage walks → archive visits → recording family or personal stories"
  },
  "low-high-low-low": {
    name: "Serene Bonvivant",
    title: "Values comfort, aesthetics, and relaxation",
    quote: "When I slow down, life itself becomes the journey.",
    description: "Elegant, slow-paced, atmosphere-focused. Feels restored through ease, beauty, and human warmth.",
    recommendation: "Afternoons in Fuxing Park → trendy cafés → spa sessions or afternoon tea"
  },
  "low-low-high-high": {
    name: "Solo Observer",
    title: "Enjoys observing the world without deep engagement",
    quote: "The world is a book—I read it in silence.",
    description: "Independent, rational, and orderly. Finds pleasure in control and quiet discovery.",
    recommendation: "Shanghai Astronomy Museum → Pudong high-rise observation decks → urban photography"
  },
  "low-low-high-low": {
    name: "Gentle Drifter",
    title: "Enjoys the road, scenery, and freedom of movement",
    quote: "When the wind moves, I know I'm traveling.",
    description: "Relaxed, unhurried, and sensory-oriented. Feels content through flow and low-pressure travel.",
    recommendation: "Riverside promenades → riverside cafés → waterside music performances"
  },
  "low-low-low-low": {
    name: "Calm Drifter",
    title: "Seeks rest and recovery rather than novelty",
    quote: "Peace itself is my faraway place.",
    description: "Easy, familiar, and close-to-home journeys. Regains balance through calm repetition and comfort.",
    recommendation: "Historic villas along Hengshan Road → second-hand bookstores → traditional teahouses"
  },
  "low-low-low-high": {
    name: "Classic Planner",
    title: "Prefers safety, familiarity, and well-planned leisure",
    quote: "Order makes happiness last.",
    description: "Rational, refined, quality-focused. Finds happiness in the certainty of a perfectly executed trip.",
    recommendation: "Boutique hotel stays → high-end dining → evening concerts at music halls"
  }
};
