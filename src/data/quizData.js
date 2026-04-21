// Each question has a spectrum: left pole → right pole
// 4 slider positions: Strongly Left (0), Lean Left (1), Lean Right (2), Strongly Right (3)
// Scoring multipliers: [1.0, 0.5, 0.5, 1.0] for [strongLeft, leanLeft, leanRight, strongRight]

export const questions = [
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
    dimension: 'placeResonance',
    text: "Walking through foreign streets, what kind of scenes do you prefer to capture?",
    leftLabel: "Vibrant life moments: neighbors chatting, bustling markets, or smiling faces.",
    rightLabel: "Quiet, solitary details: light on old walls, empty alleys, or traces of time.",
    leftImpact: { connector: 1 },
    rightImpact: { wanderer: 1 }
  },
  {
    id: 3,
    phase: 1,
    weight: 1.0,
    dimension: 'openness',
    text: "When looking for a place to eat, which option appeals more to you?",
    leftLabel: "A reliable classic or a well-regarded local chain with proven quality.",
    rightLabel: "An anonymous street stall you've never heard of, but is packed with locals.",
    leftImpact: { comfortKeeper: 1 },
    rightImpact: { explorer: 1 }
  },
  {
    id: 4,
    phase: 1,
    weight: 1.0,
    dimension: 'selfExpansion',
    text: "After this trip ends, what do you most hope to keep in your memories?",
    leftLabel: "A sense of pure physical relaxation and sensory satisfaction (e.g., a great meal or sleep).",
    rightLabel: "A touching moment that offers clarity about yourself or a new realization about life.",
    leftImpact: { pleasureSeeker: 1 },
    rightImpact: { soulSeeker: 1 }
  },
  {
    id: 5,
    phase: 2,
    weight: 1.5,
    dimension: 'structuration',
    text: 'Regarding "survival logistics" like transport and stay, your strategy is:',
    leftLabel: "Locking everything in advance to avoid wasting energy on logistics while on the move.",
    rightLabel: "Having a rough idea only; figuring out transport and future stays as you go.",
    leftImpact: { architect: 1 },
    rightImpact: { flowWalker: 1 }
  },
  {
    id: 6,
    phase: 2,
    weight: 1.5,
    dimension: 'openness',
    text: 'Regarding viral "photo spots" or "must-visit" landmarks:',
    leftLabel: "They are famous for a reason; I don't want to miss out on these proven classics.",
    rightLabel: "I'd rather discover off-the-beaten-path spots that only a few people know about.",
    leftImpact: { comfortKeeper: 1 },
    rightImpact: { explorer: 1 }
  },
  {
    id: 7,
    phase: 2,
    weight: 1.5,
    dimension: 'placeResonance',
    text: "If you were to pick a background sound for this trip, you would choose:",
    leftLabel: "Friendly street sounds, casual chats, or upbeat local radio music.",
    rightLabel: "The sound of wind, rain, train tracks, or a cool, natural ambient noise.",
    leftImpact: { connector: 1 },
    rightImpact: { wanderer: 1 }
  },
  {
    id: 8,
    phase: 2,
    weight: 1.5,
    dimension: 'selfExpansion',
    text: 'After a long day of intense exploration, how do you most like to "recharge"?',
    leftLabel: "Finding a comfortable way to lounge, having snacks, and letting your senses rest.",
    rightLabel: "Writing down your feelings or listening to music alone to sort through your thoughts.",
    leftImpact: { pleasureSeeker: 1 },
    rightImpact: { soulSeeker: 1 }
  },
  {
    id: 9,
    phase: 3,
    weight: 2.0,
    dimension: 'structuration',
    text: "If weather or unexpected events ruin your original plans:",
    leftLabel: "I feel annoyed and immediately look for alternatives to avoid wasting time.",
    rightLabel: "I take it as a sign, find a spot to hide from the rain, and wait to see what happens.",
    leftImpact: { architect: 1 },
    rightImpact: { flowWalker: 1 }
  },
  {
    id: 10,
    phase: 3,
    weight: 1.5,
    dimension: 'openness',
    text: "Which travel philosophy do you resonate with more?",
    leftLabel: "Travel is about finding a familiar sense of security and certain beauty in a foreign world.",
    rightLabel: "Travel is about breaking daily inertia and colliding with unpredictable experiences.",
    leftImpact: { comfortKeeper: 1 },
    rightImpact: { explorer: 1 }
  },
  {
    id: 11,
    phase: 3,
    weight: 1.5,
    dimension: 'selfExpansion',
    text: "When packing to head home, what do you feel most reluctant to leave behind?",
    leftLabel: "The addictive rhythm of life here and the comfortable vibe missing at home.",
    rightLabel: "The unique mindset gained and the version of yourself that shifted during the trip.",
    leftImpact: { pleasureSeeker: 1 },
    rightImpact: { soulSeeker: 1 }
  },
  {
    id: 12,
    phase: 3,
    weight: 1.0,
    dimension: 'placeResonance',
    text: "Which social state do you prefer during your travels?",
    leftLabel: "Observing people and interacting with locals to feel the human energy.",
    rightLabel: "Moving through like an invisible person, enjoying the detachment of being alone in a crowd.",
    leftImpact: { connector: 1 },
    rightImpact: { wanderer: 1 }
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
