import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Share2, RotateCcw, Lightbulb, MapPin, ChevronDown, Check } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// PERSONA REGISTRY
// Maps result.name → full editorial metadata + hero image (Pexels)
// ─────────────────────────────────────────────────────────────────────────────

const PERSONAS = {
  'The Polar Originist': {
    id: 'SS_WA_EX_AR',
    motive: 'SS',
    code: 'SS · WA · EX · AR',
    spiritAnimal: 'Snow Leopard',
    heroImage: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Snow-covered mountain peak under a pale winter sky',
    destinations: ['Ngari, Tibet', 'Kanas in Winter', 'Gobi Desert, NW China'],
    tip: 'Book restricted-zone permits 3–6 months in advance. The golden hour at remote Yardang landforms lasts under twelve minutes — position yourself early and leave zero trace.',
  },
  'The Spiritual Nomad': {
    id: 'SS_WA_EX_FW',
    motive: 'SS',
    code: 'SS · WA · EX · FW',
    spiritAnimal: 'Tibetan Antelope',
    heroImage: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Vast grassland under a warm sunset, endless horizon',
    destinations: ['Hulunbuir Grasslands', 'Hengduan Mountains', 'Sanjiangyuan Reserve'],
    tip: 'Pack light and welcome detours without guilt. Download offline maps before you leave — the signal fades precisely when the landscape becomes extraordinary.',
  },
  'The Silent Sage': {
    id: 'SS_WA_CK_AR',
    motive: 'SS',
    code: 'SS · WA · CK · AR',
    spiritAnimal: 'Wise Owl',
    heroImage: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Ancient stone bridge in morning mist, deep forest tones',
    destinations: ['Suzhou Classical Gardens', 'Dunhuang Mogao Caves', 'Jiuzhaigou Off-Season'],
    tip: 'Arrive at Suzhou gardens before 8 AM for an almost private experience. Pre-book timed entry slots — early weekday mornings are your most powerful tool.',
  },
  'The Vagabond Poet': {
    id: 'SS_WA_CK_FW',
    motive: 'SS',
    code: 'SS · WA · CK · FW',
    spiritAnimal: 'Vagabond Cat',
    heroImage: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Old village lane with moss-covered stone walls, nostalgic light',
    destinations: ['Jiangnan Ancient Villages', 'Fenghuang Old Town', 'Shaoxing Canal Towns'],
    tip: 'Leave one full day completely unplanned. The alleys you stumble upon by accident will outlast every landmark on your original list.',
  },
  'The Spacetime Curator': {
    id: 'SS_CO_EX_AR',
    motive: 'SS',
    code: 'SS · CO · EX · AR',
    spiritAnimal: 'Red Fox',
    heroImage: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Ancient city walls at dusk, amber and stone grey',
    destinations: ['Quanzhou UNESCO Trail', 'Chaozhou Old City', 'Dali Ancient Quarter'],
    tip: 'Bring a notebook. The best stories come from conversations with shopkeepers, not from reading plaques. Ask for a local heritage guide to unlock lesser-known sites.',
  },
  'The Dreamwalker': {
    id: 'SS_CO_EX_FW',
    motive: 'SS',
    code: 'SS · CO · EX · FW',
    spiritAnimal: 'Dolphin',
    heroImage: 'https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Neon-lit urban harbor at night, cyan and magenta reflections',
    destinations: ['Chongqing Night Layers', 'Lijiang Old Town', 'Xiamen Kulangsu'],
    tip: "Say yes to the wrong staircase. Chongqing's vertical city reveals itself only to those willing to get briefly lost on purpose.",
  },
  'The Urban Inhabitant': {
    id: 'SS_CO_CK_AR',
    motive: 'SS',
    code: 'SS · CO · CK · AR',
    spiritAnimal: 'Golden Retriever',
    heroImage: 'https://images.pexels.com/photos/2224861/pexels-photo-2224861.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Elegant tree-lined city boulevard on a sunny morning',
    destinations: ['Shanghai Wukang Road', 'Beijing Hutong Quarters', 'Tianjin Five Avenues'],
    tip: 'Stay in a heritage guesthouse over a chain hotel — the neighborhood becomes part of the experience itself. Book Sinan Mansions evening talks weeks in advance.',
  },
  'The Mindful Slow-liver': {
    id: 'SS_CO_CK_FW',
    motive: 'SS',
    code: 'SS · CO · CK · FW',
    spiritAnimal: 'Zen Panda',
    heroImage: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Quiet bamboo grove, soft sage green and dappled morning light',
    destinations: ['Chengdu Kuanzhai Alley', 'Xiamen Gulangyu', 'Hangzhou West Lake Villages'],
    tip: 'Put your phone face-down for at least two hours every morning. Order whatever the table next to yours is eating — even if you cannot read a single character on the menu.',
  },
  'The Urban Explorer': {
    id: 'PS_CO_EX_AR',
    motive: 'PS',
    code: 'PS · CO · EX · AR',
    spiritAnimal: 'Cheetah',
    heroImage: 'https://images.pexels.com/photos/1460838/pexels-photo-1460838.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Vibrant neon street at night, electric urban energy',
    destinations: ['Changsha Taojin District', 'Bangkok RCA & Silom', 'Shanghai M50 + Xintiandi'],
    tip: 'Build a hit list with three backup options for every venue — the best spots fill by 9 PM on weekends. Research opening hours the night before and arrive thirty minutes early.',
  },
  'The Ethereal Chaser': {
    id: 'PS_CO_EX_FW',
    motive: 'PS',
    code: 'PS · CO · EX · FW',
    spiritAnimal: 'Butterfly',
    heroImage: 'https://images.pexels.com/photos/2253821/pexels-photo-2253821.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Night market glowing with warm lanterns, blurred amber bokeh',
    destinations: ['Guangzhou Dongshankou', "Chengdu Yulin Road", 'Tokyo Shimokitazawa'],
    tip: 'Keep every afternoon completely unscheduled. The most memorable finds arrive when you are following an aroma, not a saved map pin. Carry cash for impulse street food.',
  },
  'The Boutique Voyagist': {
    id: 'PS_CO_CK_AR',
    motive: 'PS',
    code: 'PS · CO · CK · AR',
    spiritAnimal: 'Swan',
    heroImage: 'https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Mirror-calm lake reflecting a luxury boutique hotel, ivory tones',
    destinations: ['Aranya Seaside Resort', 'Anji Bamboo Retreats', 'Xiamen Design Hotels'],
    tip: 'Pre-book the sunset dinner and the premium spa slot on the first day — both sell out. A perfect trip is 20% discovery and 80% flawlessly executed research.',
  },
  'The Street-life Epicure': {
    id: 'PS_CO_CK_FW',
    motive: 'PS',
    code: 'PS · CO · CK · FW',
    spiritAnimal: 'Raccoon',
    heroImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Busy street food stall glowing under warm lights, steam rising',
    destinations: ["Xi'an Muslim Quarter", 'Shunde Food Villages', 'Chengdu Kuanzhai Night Market'],
    tip: 'Follow the queue, not the review score. If the plastic stools are packed and the sign is hand-painted, you have found exactly the right place.',
  },
  'The Primal Observer': {
    id: 'PS_WA_EX_AR',
    motive: 'PS',
    code: 'PS · WA · EX · AR',
    spiritAnimal: 'Eagle',
    heroImage: 'https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Eagle-eye view from a cliff edge overlooking a grand canyon, crystal light',
    destinations: ['Changbai Heaven Lake', 'Zhangye Danxia Geopark', 'Qinghai Chaka Salt Lake'],
    tip: 'Check the weather 48 hours ahead and prepare a contingency plan. Perfect light at altitude lasts eight to twelve minutes — position yourself twenty minutes early.',
  },
  'The Wilderness Wanderer': {
    id: 'PS_WA_EX_FW',
    motive: 'PS',
    code: 'PS · WA · EX · FW',
    spiritAnimal: 'Grey Wolf',
    heroImage: 'https://images.pexels.com/photos/1612461/pexels-photo-1612461.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Lone figure under a vast starry sky in deep wilderness, navy and silver',
    destinations: ['Wanning Surfing Coast', 'Western Sichuan Campgrounds', 'Hainan Backcountry'],
    tip: 'Tell someone your rough route before you head out. The best wild spots have no signal — freedom is addictive, and preparation is what makes it safe.',
  },
  'The Hidden Luxury Collector': {
    id: 'PS_WA_CK_AR',
    motive: 'PS',
    code: 'PS · WA · CK · AR',
    spiritAnimal: 'Black Panther',
    heroImage: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Private resort balcony at dusk, obsidian tones and gold light',
    destinations: ['Meili Snow Mountain Lodges', 'Shangri-La Retreat Hotels', 'Qinghai Lake Private Camps'],
    tip: 'Book premium remote properties 2–3 months ahead. Ask the property for their private sunrise schedule — the most extraordinary views occur before breakfast.',
  },
  'The Serene Sojourner': {
    id: 'PS_WA_CK_FW',
    motive: 'PS',
    code: 'PS · WA · CK · FW',
    spiritAnimal: 'Koala',
    heroImage: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1400',
    heroAlt: 'Dappled sunlight through eucalyptus, soft pastel greens, peaceful countryside',
    destinations: ['Wuyuan Country Lanes', 'Sanya Quiet Beaches', 'Taihu Lake Villages'],
    tip: 'Resist the urge to fill every hour. One long, purposeless walk is worth three packed itineraries. Switch your phone to silent from the moment you arrive.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// THEME SYSTEM
// SS → Midnight & Mist  |  PS → Golden Hour
// ─────────────────────────────────────────────────────────────────────────────

const THEMES = {
  SS: {
    pageBg: '#0F172A',
    bodyBg: 'linear-gradient(175deg, #0F172A 0%, #162032 40%, #111827 100%)',
    heroOverlay: 'linear-gradient(to bottom, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.6) 60%, rgba(15,23,42,0.97) 100%)',
    glassCard: 'rgba(255,255,255,0.05)',
    glassBorder: 'rgba(255,255,255,0.10)',
    glassShadow: '0 8px 48px rgba(0,0,0,0.5)',
    accent: '#93C5FD',        // sky-300
    accentDim: 'rgba(147,197,253,0.18)',
    accentBorder: 'rgba(147,197,253,0.28)',
    accentBtn: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    accentBtnShadow: 'rgba(59,130,246,0.4)',
    headingColor: '#F1F5F9',
    bodyText: 'rgba(226,232,240,0.82)',
    mutedText: 'rgba(148,163,184,0.7)',
    codeBadgeBg: 'rgba(147,197,253,0.10)',
    codeBadgeBorder: 'rgba(147,197,253,0.25)',
    codeText: '#BAE6FD',
    barA: '#60A5FA',
    barB: '#475569',
    destCardBg: 'rgba(255,255,255,0.04)',
    destCardBorder: 'rgba(147,197,253,0.15)',
    tipBg: 'rgba(147,197,253,0.07)',
    tipBorder: 'rgba(147,197,253,0.2)',
    divider: 'rgba(255,255,255,0.08)',
    sectionLabelColor: '#7DD3FC',
    quoteColor: '#93C5FD',
    spectrumWinnerColor: '#60A5FA',
    shareBtnBg: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    exploreBtnBorder: '#3B82F6',
    exploreBtnText: '#93C5FD',
    retakeColor: 'rgba(148,163,184,0.5)',
  },
  PS: {
    pageBg: '#FFFDF5',
    bodyBg: 'linear-gradient(175deg, #FFFDF5 0%, #FFF8E7 50%, #FEF3C7 100%)',
    heroOverlay: 'linear-gradient(to bottom, rgba(254,243,199,0.1) 0%, rgba(120,53,15,0.45) 60%, rgba(92,40,5,0.92) 100%)',
    glassCard: 'rgba(255,255,255,0.72)',
    glassBorder: 'rgba(255,255,255,0.9)',
    glassShadow: '0 8px 48px rgba(0,0,0,0.10)',
    accent: '#F59E0B',        // amber-400
    accentDim: 'rgba(245,158,11,0.12)',
    accentBorder: 'rgba(245,158,11,0.28)',
    accentBtn: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    accentBtnShadow: 'rgba(245,158,11,0.35)',
    headingColor: '#1C0A00',
    bodyText: '#44291A',
    mutedText: '#92735C',
    codeBadgeBg: 'rgba(245,158,11,0.10)',
    codeBadgeBorder: 'rgba(245,158,11,0.30)',
    codeText: '#B45309',
    barA: '#FBBF24',
    barB: '#D1D5DB',
    destCardBg: 'rgba(255,248,230,0.9)',
    destCardBorder: 'rgba(245,158,11,0.18)',
    tipBg: 'rgba(254,243,199,0.6)',
    tipBorder: 'rgba(245,158,11,0.25)',
    divider: 'rgba(0,0,0,0.08)',
    sectionLabelColor: '#D97706',
    quoteColor: '#F59E0B',
    spectrumWinnerColor: '#D97706',
    shareBtnBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    exploreBtnBorder: '#D97706',
    exploreBtnText: '#92400E',
    retakeColor: '#B5967C',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GRAIN OVERLAY — subtle paper texture via SVG turbulence
// ─────────────────────────────────────────────────────────────────────────────

const GrainOverlay = () => (
  <div style={{
    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
    opacity: 0.028,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '300px',
  }} />
);

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED SPECTRUM BAR
// ─────────────────────────────────────────────────────────────────────────────

const SpectrumBar = ({ pct, colorA, colorB, delay = 0 }) => {
  const ref = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setGo(true), delay * 1000); obs.disconnect(); } },
      { rootMargin: '-60px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: 'rgba(255,255,255,0.08)', flex: 1 }}>
      <div style={{ height: '100%', width: go ? `${pct}%` : '0%', background: colorA, borderRadius: '3px 0 0 3px', transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)' }} />
      <div style={{ height: '100%', width: go ? `${100 - pct}%` : '0%', background: colorB, borderRadius: '0 3px 3px 0', transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)', opacity: 0.45 }} />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION EYEBROW LABEL
// ─────────────────────────────────────────────────────────────────────────────

const Eyebrow = ({ children, color }) => (
  <p style={{
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color,
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }}>
    <span style={{ display: 'block', width: 20, height: 1, background: color, opacity: 0.6 }} />
    {children}
  </p>
);

// ─────────────────────────────────────────────────────────────────────────────
// PERSONA PREVIEW DROPDOWN
// ─────────────────────────────────────────────────────────────────────────────

const PersonaDropdown = ({ current, onSelect, theme }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const names = Object.keys(PERSONAS);

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 100 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: theme.codeBadgeBg,
          border: `1px solid ${theme.codeBadgeBorder}`,
          borderRadius: 40,
          padding: '7px 16px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: theme.codeText,
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.2s',
        }}
      >
        Preview Persona
        <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: 280,
              background: 'rgba(15,23,42,0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16,
              boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
              overflow: 'hidden',
              maxHeight: 360,
              overflowY: 'auto',
            }}
          >
            {names.map(name => {
              const p = PERSONAS[name];
              const isCurrent = name === current;
              return (
                <button
                  key={name}
                  onClick={() => { onSelect(name); setOpen(false); }}
                  style={{
                    width: '100%', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '11px 16px',
                    background: isCurrent ? 'rgba(255,255,255,0.08)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={e => !isCurrent && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={e => !isCurrent && (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{
                    fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: p.motive === 'SS' ? '#7DD3FC' : '#FCD34D',
                    minWidth: 32,
                  }}>
                    {p.motive}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#E2E8F0', fontWeight: isCurrent ? 600 : 400, flex: 1 }}>{name}</span>
                  {isCurrent && <Check size={12} color="#60A5FA" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN RESULT COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Result = () => {
  const location = useLocation();
  const { result: quizResult, scores, winners } = location.state || {};

  // Allow preview override — defaults to quiz result or first persona
  const defaultName = quizResult?.name || Object.keys(PERSONAS)[0];
  const [previewName, setPreviewName] = useState(defaultName);

  // If no quiz data and no valid name, redirect
  if (!quizResult && !PERSONAS[defaultName]) return <Navigate to="/quiz" replace />;

  const persona = PERSONAS[previewName] || PERSONAS[defaultName];
  // Pull description/quote/vibe from quizResult if available and matching, otherwise use persona data
  const isLiveResult = quizResult && quizResult.name === previewName;

  const theme = THEMES[persona.motive];

  // Score percentages (from real quiz data or neutral 50/50)
  const pct = (a, b) => {
    if (!scores || !isLiveResult) return 50;
    const va = scores[a] || 0, vb = scores[b] || 0;
    const tot = va + vb; if (!tot) return 50;
    return Math.round((va / tot) * 100);
  };

  const dims = [
    { label: 'Self-Expansion',  sideA: 'Soul Seeker',    sideB: 'Pleasure Seeker', p: pct('soulSeeker','pleasureSeeker'), winner: isLiveResult ? (winners?.selfExpansion==='soulSeeker' ? 'Soul Seeker' : 'Pleasure Seeker') : (persona.motive==='SS' ? 'Soul Seeker' : 'Pleasure Seeker') },
    { label: 'Place Resonance', sideA: 'Connector',       sideB: 'Wanderer',        p: pct('connector','wanderer'),        winner: isLiveResult ? (winners?.placeResonance==='connector' ? 'Connector' : 'Wanderer') : (persona.id.includes('CO') ? 'Connector' : 'Wanderer') },
    { label: 'Openness',        sideA: 'Explorer',        sideB: 'Comfort Keeper',  p: pct('explorer','comfortKeeper'),    winner: isLiveResult ? (winners?.openness==='explorer' ? 'Explorer' : 'Comfort Keeper') : (persona.id.includes('EX') ? 'Explorer' : 'Comfort Keeper') },
    { label: 'Structuration',   sideA: 'Architect',       sideB: 'Flow Walker',     p: pct('architect','flowWalker'),      winner: isLiveResult ? (winners?.structuration==='architect' ? 'Architect' : 'Flow Walker') : (persona.id.includes('AR') ? 'Architect' : 'Flow Walker') },
  ];

  // The description / quote / vibe to display
  const displayVibe = isLiveResult ? quizResult.vibe : persona.spiritAnimal + ' — ' + (persona.motive === 'SS' ? 'Soul Seeker' : 'Pleasure Seeker');
  const displayQuote = isLiveResult ? quizResult.quote : 'Every journey is a conversation with the self.';
  const displayDesc = isLiveResult ? quizResult.description : `As ${previewName}, your travel spirit is defined by the code ${persona.code}. Complete the assessment to unlock your full portrait.`;

  // Framer stagger
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25,0.1,0.25,1] } } };

  return (
    <div style={{ minHeight: '100vh', background: theme.bodyBg, fontFamily: 'Inter, sans-serif', position: 'relative' }}>
      <GrainOverlay />

      {/* ── FLOATING PREVIEW TOGGLE ── */}
      <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 200 }}>
        <PersonaDropdown current={previewName} onSelect={setPreviewName} theme={theme} />
      </div>

      {/* ═══════════════════════════════════════════════
          HERO — full-bleed image, 4:5 on mobile / 60vh on desktop
      ═══════════════════════════════════════════════ */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', maxHeight: '90vh', overflow: 'hidden' }}>
        {/* Hero image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={persona.heroImage}
            src={persona.heroImage}
            alt={persona.heroAlt}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: theme.heroOverlay, pointerEvents: 'none' }} />

        {/* Hero text — bottom-anchored, glassmorphism panel */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(24px, 6vw, 56px)' }}>
          <motion.div
            variants={container} initial="hidden" animate="show"
            style={{ maxWidth: 640 }}
          >
            {/* Eyebrow */}
            <motion.p variants={item} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
              Travel Persona Spectrum
            </motion.p>

            {/* Code badge */}
            <motion.div variants={item} style={{ marginBottom: 18 }}>
              <span style={{
                display: 'inline-block',
                background: theme.codeBadgeBg,
                border: `1px solid ${theme.codeBadgeBorder}`,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 40,
                padding: '5px 16px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: theme.codeText,
              }}>
                {persona.code}
              </span>
            </motion.div>

            {/* Persona name */}
            <motion.h1 variants={item} style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(2.4rem, 8vw, 5.2rem)',
              fontWeight: 500,
              color: '#FFFFFF',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: 18,
              textShadow: '0 2px 40px rgba(0,0,0,0.4)',
            }}>
              {previewName}
            </motion.h1>

            {/* Spirit animal / vibe */}
            <motion.p variants={item} style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.62)',
              letterSpacing: '0.02em',
              lineHeight: 1.6,
              marginBottom: 24,
            }}>
              Spirit Animal: <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{persona.spiritAnimal}</span>
            </motion.p>

            {/* Quote — glassmorphism pill */}
            <motion.div variants={item} style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: 'clamp(16px,3vw,24px) clamp(20px,4vw,32px)',
            }}>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                "{displayQuote}"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BODY
      ═══════════════════════════════════════════════ */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(32px,6vw,72px) clamp(20px,5vw,40px) 120px', position: 'relative', zIndex: 1 }}>

        {/* ── SPECTRUM BREAKDOWN ── */}
        <motion.section
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.25,0.1,0.25,1] }}
          style={{ ...glassCard(theme), marginBottom: 20 }}
        >
          <Eyebrow color={theme.sectionLabelColor}>Personality Spectrum</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            {dims.map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: theme.mutedText }}>
                    {d.label}
                  </span>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.78rem', fontWeight: 700, color: theme.spectrumWinnerColor }}>
                    {d.winner}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '0.68rem', color: theme.mutedText, minWidth: 72, lineHeight: 1.3 }}>{d.sideA}</span>
                  <SpectrumBar pct={d.p} colorA={theme.barA} colorB={theme.barB} delay={0.08 * i} />
                  <span style={{ fontFamily: 'Inter', fontSize: '0.68rem', color: theme.mutedText, minWidth: 72, textAlign: 'right', lineHeight: 1.3 }}>{d.sideB}</span>
                </div>
                <div style={{ textAlign: 'right', fontFamily: 'Inter', fontSize: '0.65rem', color: theme.mutedText, opacity: 0.7 }}>
                  {d.p}% · {100 - d.p}%
                </div>
                {i < dims.length - 1 && <div style={{ height: 1, background: theme.divider, marginTop: 20 }} />}
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── SOUL PORTRAIT ── */}
        <motion.section
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.06, ease: [0.25,0.1,0.25,1] }}
          style={{ ...glassCard(theme), marginBottom: 20 }}
        >
          <Eyebrow color={theme.sectionLabelColor}>Soul Portrait</Eyebrow>
          <p style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: theme.headingColor,
            lineHeight: 1.88,
            margin: 0,
            borderLeft: `2px solid ${theme.accent}`,
            paddingLeft: 'clamp(16px, 3vw, 24px)',
          }}>
            {displayDesc}
          </p>
        </motion.section>

        {/* ── IDEAL DESTINATIONS ── */}
        <motion.section
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.08, ease: [0.25,0.1,0.25,1] }}
          style={{ ...glassCard(theme), marginBottom: 20 }}
        >
          <Eyebrow color={theme.sectionLabelColor}>Ideal Destinations</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {persona.destinations.map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                style={{
                  background: theme.destCardBg,
                  border: `1px solid ${theme.destCardBorder}`,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: 14,
                  padding: '20px 18px',
                  display: 'flex', flexDirection: 'column', gap: 10,
                }}
              >
                <MapPin size={15} color={theme.accent} />
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 500, color: theme.headingColor, lineHeight: 1.3 }}>
                  {dest}
                </span>
                <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: theme.mutedText }}>
                  Top Destination {i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── EXPERT TIPS ── */}
        <motion.section
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, delay: 0.08, ease: [0.25,0.1,0.25,1] }}
          style={{ ...glassCard(theme), marginBottom: 48 }}
        >
          <Eyebrow color={theme.sectionLabelColor}>Expert Tips</Eyebrow>
          <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <div style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: 12,
              background: theme.accentDim, border: `1px solid ${theme.accentBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Lightbulb size={19} color={theme.accent} />
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(0.9rem, 2vw, 1rem)', color: theme.bodyText, lineHeight: 1.82, margin: 0 }}>
              {persona.tip}
            </p>
          </div>
        </motion.section>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.8, delay: 0.06 }}
          style={{ textAlign: 'center' }}
        >
          {/* Share */}
          <button
            onClick={() => {
              const text = `I am ${previewName} (${persona.code}) on the Travel Persona Spectrum.\n\n"${displayQuote}"`;
              if (navigator.share) {
                navigator.share({ title: previewName, text, url: window.location.href }).catch(() => {});
              } else {
                navigator.clipboard?.writeText(text).then(() => alert('Copied to clipboard!')).catch(() => {});
              }
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: theme.shareBtnBg,
              color: '#fff',
              padding: 'clamp(14px,3vw,18px) clamp(28px,5vw,48px)',
              borderRadius: 50,
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.88rem, 2vw, 1rem)',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 8px 32px ${theme.accentBtnShadow}`,
              letterSpacing: '0.03em',
              marginBottom: 16,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Share2 size={16} />
            Generate My Travel Card
          </button>

          {/* Explore pool — only shown for real quiz results */}
          {isLiveResult && (
            <>
              <br />
              <Link
                to="/poi-selection"
                state={{ result: quizResult, scores }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  marginTop: 12,
                  background: 'transparent',
                  border: `1.5px solid ${theme.exploreBtnBorder}`,
                  color: theme.exploreBtnText,
                  padding: 'clamp(12px,2.5vw,15px) clamp(24px,4vw,36px)',
                  borderRadius: 50,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = theme.exploreBtnBorder; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.exploreBtnText; }}
              >
                Explore Your Experience Pool
                <ArrowRight size={15} />
              </Link>
            </>
          )}

          <br />
          <Link
            to="/quiz"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 24,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: theme.retakeColor,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = theme.accent}
            onMouseLeave={e => e.currentTarget.style.color = theme.retakeColor}
          >
            <RotateCcw size={12} />
            Retake the Assessment
          </Link>
        </motion.div>
      </div>

      {/* Mobile responsive: force portrait image height on small screens */}
      <style>{`
        @media (max-width: 640px) {
          div[style*="aspectRatio"] {
            aspect-ratio: 4/5 !important;
            max-height: none !important;
          }
        }
        @media (min-width: 1024px) {
          div[style*="aspectRatio"] {
            aspect-ratio: unset !important;
            height: min(90vh, 680px) !important;
          }
        }
        /* Thin scrollbar for dropdown */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
      `}</style>
    </div>
  );
};

// Glass card helper
const glassCard = (theme) => ({
  background: theme.glassCard,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: `1px solid ${theme.glassBorder}`,
  borderRadius: 20,
  padding: 'clamp(24px, 4vw, 40px)',
  boxShadow: theme.glassShadow,
});

export default Result;
