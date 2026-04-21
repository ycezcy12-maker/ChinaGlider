import introImage from '../assets/generation-958ad02a-2d62-4767-afd0-411bae492b96.png';
import shanghaiAutumnImage from '../assets/上海秋日街景_1822x1024_完整版.jpg';
import beijingImage from '../assets/generation-05921bae-3256-4616-9d0f-197191b4f940.png';
import sichuanImage from '../assets/generation-c22b3672-4ea8-46f1-8289-b375d1ac0a93.png';

export const slides = [
  {
    id: 1,
    type: "intro",
    tagline: "Your Journey Starts Here",
    title: "Discover Your Travel Persona",
    subtitle: "and Customized Dive-In Itinerary",
    description: "Experience the city through a journey tailored to your unique travel personality. From modern skyline to ancient cultural heritage.",
    cta: { label: "Start Your Journey", path: "/quiz" },
    imageUrl: introImage
  },
  {
    id: 2,
    type: "destination",
    tagline: "Shanghai",
    title: "From the Historic French Concession to the Modern Skyline",
    subtitle: "",
    description: "Citywalk through the most delicate streets and shops. Discover jazz bars, art deco architecture and world-class cuisine along the Bund.",
    cta: { label: "Discover Recommended Spots", path: "/poi-selection" },
    imageUrl: shanghaiAutumnImage
  },
  {
    id: 3,
    type: "destination",
    tagline: "Beijing",
    title: "Imperial Grandeur Meets Living Culture",
    subtitle: "",
    description: "Walk the same stones as emperors. From the Forbidden City to hidden hutong alleyways, Beijing holds centuries of stories waiting to be told.",
    cta: { label: "Discover Recommended Spots", path: "/poi-selection" },
    imageUrl: beijingImage
  },
  {
    id: 4,
    type: "destination",
    tagline: "Western Sichuan",
    title: "High Plateau, Sacred Peaks and Highland Soul",
    subtitle: "",
    description: "Journey through dramatic highlands, turquoise lakes and ancient monasteries. A rare wilderness that feels like the edge of the world.",
    cta: { label: "View the Itinerary", path: "/trip-basics" },
    imageUrl: sichuanImage
  },
  {
    id: 5,
    type: "destination",
    tagline: "Guilin",
    title: "Karst Peaks Rising From Emerald Waters",
    subtitle: "",
    description: "Drift down the Li River past limestone towers and misty valleys. A landscape so surreal it has inspired Chinese ink painters for a thousand years.",
    cta: { label: "View the Itinerary", path: "/trip-basics" },
    imageUrl: "https://images.pexels.com/photos/3574523/pexels-photo-3574523.jpeg"
  },
  {
    id: 6,
    type: "destination",
    tagline: "Silk Road",
    title: "Desert Fortresses, Cave Murals and Ancient Trade Routes",
    subtitle: "",
    description: "Follow the ancient caravans from Xi'an through Dunhuang to Kashgar. Every oasis holds a civilization's worth of art, faith and memory.",
    cta: { label: "View the Itinerary", path: "/trip-basics" },
    imageUrl: "https://images.pexels.com/photos/3889742/pexels-photo-3889742.jpeg"
  }
];
