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

// Key format: selfExpansion-placeResonance-openness-structuration
// SS=high, PS=low | CO=high, WA=low | EX=high, CK=low | AR=high, FW=low
export const personalityTypes = {
  // SS+WA+EX+AR → high-low-high-high
  "high-low-high-high": {
    name: "The Polar Originist",
    vibe: "A precision architect of the wild.",
    quote: "You seek life's essence through controlled isolation, turning raw, uncharted terrains into a rigorous landscape for inner clarity.",
    description: "You are a precision deconstructor of the wild. In the Gobi deserts or the no-man's-lands of Western Sichuan, you shun cheap clamor in favor of challenging geographical boundaries under a rigorous plan. You calculate the golden hour with precision, ensuring you reach an undeveloped Yardang landform just before sunset. You relish this extreme, hardcore solitude; it is only in these desolate spaces—where high-level control is a necessity—that you can strip away the trivialities of daily life and conduct a serious deduction of life's origin."
  },
  // SS+WA+EX+FW → high-low-high-low
  "high-low-high-low": {
    name: "The Spiritual Nomad",
    vibe: "A pilgrim of serendipity.",
    quote: "You drift toward sudden realizations in nature's vastness, letting the wind of chance guide you through raw, spiritual landscapes.",
    description: "You are a wanderer of the wilderness with no preset destination. On the Hulunbuir grasslands or during a deep-mountain trek, you have no need for a fixed route. You might stop simply for a peculiarly shaped tree and sit in silence for an entire afternoon in a forest without a signal. You don't chase landmarks; you chase those sudden, spiritual \"Aha!\" moments. The world is a fluid revelation to you, and your soul is always already there."
  },
  // SS+WA+CK+AR → high-low-low-high
  "high-low-low-high": {
    name: "The Silent Sage",
    vibe: "A thinker within stone-walled grace.",
    quote: "You seek self-restoration through the precise orchestration of time-proven silence and classical aesthetics.",
    description: "You find peace at the intersection of classics and order. You are the one pre-booking early morning slots at top-tier art galleries or visiting Suzhou gardens during the off-season. You prefer beauty that has been proven by time, seeking self-restoration in environments that are orderly, secure, and quiet. You don't need adrenaline; you need a logically clear space with historical depth where you can engage in a profound dialogue across time."
  },
  // SS+WA+CK+FW → high-low-low-low
  "high-low-low-low": {
    name: "The Vagabond Poet",
    vibe: "A dreamer in nostalgia.",
    quote: "You drift through familiar beauty, finding poetic resonance in the slow, quiet decay of time and the gentle rhythm of solitude.",
    description: "You are a gentle daydreamer in the cracks of old times. You belong in the ancient villages of Jiangnan or the slow-paced small towns of the North, watching moss in corners or the afternoon sun. Efficiency is irrelevant to your journey; you might simply sit on a weathered doorstep, letting your thoughts drift like distant clouds. For you, the best travel is not about reaching a destination, but about completely losing yourself in a moving, nostalgic emotion."
  },
  // SS+CO+EX+AR → high-high-high-high
  "high-high-high-high": {
    name: "The Spacetime Curator",
    vibe: "An archivist of human memory.",
    quote: "You precisely navigate vibrant cultures to assemble deep, logical narratives of our shared history amidst the urban pulse.",
    description: "You are a restorer of history, salvaging collective memories through rigorous exploration. In ancient cities with deep cultural roots like Quanzhou or Chaozhou, you follow a plan to walk every old street. By observing the details of local life, you precisely assemble a mirror image of civilization's past. You aren't just traveling; you are curating. Every location is a vital piece of your cognitive map."
  },
  // SS+CO+EX+FW → high-high-high-low
  "high-high-high-low": {
    name: "The Dreamwalker",
    vibe: "A gatherer of strangers' dreams.",
    quote: "You roam through urban spontaneity to find fleeting yet profound human connections that heal and inspire.",
    description: "You capture fragments of dreams amidst the urban hustle; the world is your flowing therapy room. You love weaving through the layered, \"magic\" streets of cities like Chongqing, spontaneously joining a conversation at a local food stall. These chance emotional impacts make you feel that every stranger's life fragment completes a puzzle within you. You seek the resonance of \"the world as home,\" feeling the warmest and most fantastical wavelengths of life."
  },
  // SS+CO+CK+AR → high-high-low-high
  "high-high-low-high": {
    name: "The Urban Inhabitant",
    vibe: "A seeker of urban elegance.",
    quote: "You find inner peace within the sophisticated order and collective memory of the world's most iconic and classic cityscapes.",
    description: "You seek a sense of civilizational belonging within the mature textures of a city. You might book an old villa on Shanghai's Wukang Road or a boutique courtyard in a Beijing Hutong, savoring the refined culture through a precise itinerary. You enjoy observing pedestrians from a park bench, finding stability wrapped in collective memory within the classic urban pulse. For you, travel is not an escape from civilization, but a search for inner peace within a high-quality social connection."
  },
  // SS+CO+CK+FW → high-high-low-low
  "high-high-low-low": {
    name: "The Mindful Slow-liver",
    vibe: "A meditator in the marketplace.",
    quote: "You find Zen in the ordinary, drifting through local life with a heart full of gentle awareness and quiet connection.",
    description: "You are a meditator in the marketplace, practicing mindfulness through the rhythm of the everyday. Near a wet market in a slow-paced city like Xiamen or Chengdu, you might grab a local snack and watch the vendors call out, unhurried by any tourist agenda. You enjoy this plain human warmth, living in the moment. You believe true healing isn't at the ends of the earth, but in every smile filled with the breath of life."
  },
  // PS+CO+EX+AR → low-high-high-high
  "low-high-high-high": {
    name: "The Urban Explorer",
    vibe: "A hunter of neon thrills.",
    quote: "You move with high-speed precision through the world's most vibrant crowds to feast on sensory novelty and sheer excitement.",
    description: "The city's shadows and neon are your hunting grounds; you seek ultimate sensory thrills and efficient socializing. In the late nights of Changsha or Bangkok, you precisely navigate the hottest pop-up shops or underground bars, feeling the adrenaline surge in the roar of the crowd. You love high-frequency vibrancy and novelty, enjoying the \"conquest\" of every coordinate in the bustling throng. The world is a grand feast, and you are the taster moving at full speed."
  },
  // PS+CO+EX+FW → low-high-high-low
  "low-high-high-low": {
    name: "The Ethereal Chaser",
    vibe: "A seeker of fleeting brilliance.",
    quote: "You drift towards sensory joy, embracing spontaneous delights wherever the city's electric pulse leads you.",
    description: "You chase fleeting brilliance and passion; freedom is your sensory switch. In Guangzhou's Dongshankou or Chengdu's Yulin Road, you might stop your walk because of a sudden aroma or an intriguing boutique, spending the entire afternoon on a whim. You love anything that stirs the senses. Since the world is constantly changing, you choose to dance with the wind, capturing the brightest joys in the most unexpected moments."
  },
  // PS+CO+CK+AR → low-high-low-high
  "low-high-low-high": {
    name: "The Boutique Voyagist",
    vibe: "A curator of refined pleasure.",
    quote: "You seek elegance within a pre-planned frame, celebrating life's finest, most classical joys with impeccable taste.",
    description: "You are the guardian of quality living, seeking a dignified and elegant pleasure. At a seaside resort in Aranya or a top-tier retreat, you plan every sunset dinner in advance. You are drawn to classical aesthetics and ordered socializing, relishing the texture of life within proven beauty. For you, travel is a precise practice of aesthetics; every Michelin-standard meal and every carefully selected photo spot is a refined tribute to a life without compromise."
  },
  // PS+CO+CK+FW → low-high-low-low
  "low-high-low-low": {
    name: "The Street-life Epicure",
    vibe: "A joyful soul in the buzz.",
    quote: "You drift toward the warmth of street light and shared laughter, finding your heaven in a perfect local bite.",
    description: "You are the molecule of joy in the alleys. You don't need deep meaning, just a full stomach and a settled heart. In the old streets of Xi'an or Shunde, you wander spontaneously, eating wherever the crowd is thickest. Being healed by a bite of authentic local food is the entirety of your trip. You seek happiness and freedom in the most vibrant atmospheres, content to be a lo-fi dreamer in the most grounded of joys."
  },
  // PS+WA+EX+AR → low-low-high-high
  "low-low-high-high": {
    name: "The Primal Observer",
    vibe: "A voyeur of the sublime.",
    quote: "You use logic and precision to witness nature's wildest spectacles from a position of absolute secure observation.",
    description: "You are like a rational hunter, scrutinizing nature's wildness from the safety of order. At the edge of Heaven Lake in Changbai Mountain or in a national geological park, you check the weather forecast to choose the perfect time to reach the top, solely to capture a shocking visual spectacle. You crave the sight of the unseen and the magnificent, but always under absolute control. You prefer being an observer, efficiently collecting nature's ultimate sensory rewards from behind a safety line."
  },
  // PS+WA+EX+FW → low-low-high-low
  "low-low-high-low": {
    name: "The Wilderness Wanderer",
    vibe: "A ranger of the senses.",
    quote: "You roam the wild with no map, seeking the raw, physical ecstasy of being lost in nature's unscripted vastness.",
    description: "You are a ranger of nature, senses wide open to the plains, seeking pure physical ecstasy. Whether surfing in Wanning or camping in Western Sichuan, you might drive toward the horizon and stop wherever the view is best. You enjoy unconstrained solitude; you need no plan, only the pure joy of wind on your skin and the sun in your eyes in the vast unknown. For you, civilization is a heavy shell; only in the wild roam can you hear the true cheers of your own body."
  },
  // PS+WA+CK+AR → low-low-low-high
  "low-low-low-high": {
    name: "The Hidden Luxury Collector",
    vibe: "A connoisseur of silent beauty.",
    quote: "You seek undisturbed comfort within nature's grandest classics, all according to a flawless, private plan.",
    description: "You collect ultimate beauty in silence; solitude is your luxury. You might pre-book a secluded luxury hotel at the foot of Meili Snow Mountain, facing the peaks alone with afternoon tea on a precise schedule. You prefer classic landscapes that stand the test of time, enjoying an undisturbed sense of sensory prestige under highly private and ordered arrangements. The highest form of travel is not about how many places you go, but quietly owning a piece of the primitive world under the protection of high civilization."
  },
  // PS+WA+CK+FW → low-low-low-low
  "low-low-low-low": {
    name: "The Serene Sojourner",
    vibe: "A drifter in quietude.",
    quote: "You seek easy-going rest within familiar nature, letting the world's noise fade into a serene and restorative background.",
    description: "You are a wanderer of seclusion, seeking a total release of body and mind. Along the country lanes of Wuyuan or on a quiet beach in Sanya, you wander slowly and spontaneously. You seek neither deep meaning nor novelty; you just want to let your brain switch off in the familiar green of nature or the sound of waves. You believe in \"not asking about the distance, only if the moment is quiet enough,\" letting your senses rest to regain your inner lightness."
  }
};
