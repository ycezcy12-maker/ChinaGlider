import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ArrowRight, Share2, RotateCcw, Lightbulb, MapPin, Compass } from 'lucide-react';

// ── Archetype metadata ─────────────────────────────────────────────────────────

const archetypeData = {
  'The Polar Originist':       { zh: '极地溯源者', code: 'SS · WA · EX · AR', animal: '❄️', destinations: ['Ngari, Tibet', 'Kanas in Winter', 'Gobi Desert NW'], tip: 'Book permits 3–6 months ahead for restricted zones. Golden hour at remote Yardangs is non-negotiable — carry a headlamp and leave zero trace.' },
  'The Spiritual Nomad':       { zh: '灵魂浪游者', code: 'SS · WA · EX · FW', animal: '🦅', destinations: ['Hulunbuir Grasslands', 'Hengduan Mountains', 'Sanjiangyuan Reserve'], tip: 'Pack light and embrace detours. Download offline maps — signal disappears exactly when the best landscapes begin.' },
  'The Silent Sage':           { zh: '静默智者',   code: 'SS · WA · CK · AR', animal: '🦉', destinations: ['Suzhou Classical Gardens', 'Dunhuang Mogao Caves', 'Jiuzhaigou Off-Season'], tip: 'Visit Suzhou gardens before 8 AM for an almost private experience. Pre-book timed slots — weekday mornings are your secret weapon.' },
  'The Vagabond Poet':         { zh: '游吟诗人',   code: 'SS · WA · CK · FW', animal: '🌿', destinations: ['Jiangnan Ancient Villages', 'Fenghuang Old Town', 'Shaoxing Canal Towns'], tip: 'Leave one full day with no plans at all. The alleys you find by accident will outlast every landmark on your list.' },
  'The Spacetime Curator':     { zh: '时空策展人', code: 'SS · CO · EX · AR', animal: '🏛️', destinations: ['Quanzhou UNESCO Trail', 'Chaozhou Old City', 'Dali Ancient Quarter'], tip: 'Bring a notebook. The best stories come from chatting with shopkeepers, not reading plaques. Request a local heritage guide for lesser-known sites.' },
  'The Dreamwalker':           { zh: '梦境漫游者', code: 'SS · CO · EX · FW', animal: '🌙', destinations: ['Chongqing Night Layers', 'Lijiang Old Town', 'Xiamen Kulangsu'], tip: 'Say yes to side streets. Chongqing\'s vertical city reveals itself only to those willing to take the wrong staircase on purpose.' },
  'The Urban Inhabitant':      { zh: '城市栖居者', code: 'SS · CO · CK · AR', animal: '🌆', destinations: ['Shanghai Wukang Road', 'Beijing Hutong Quarters', 'Tianjin Five Avenues'], tip: 'Stay in a heritage guesthouse rather than a chain hotel — the neighborhood becomes part of the experience. Book Sinan Mansions talks in advance.' },
  'The Mindful Slow-liver':    { zh: '慢活冥想者', code: 'SS · CO · CK · FW', animal: '🍵', destinations: ['Chengdu Kuanzhai Alley', 'Xiamen Gulangyu', 'Hangzhou West Lake Villages'], tip: 'Put the phone away for at least two hours each morning. Order whatever the locals are eating, even if you can\'t read the menu.' },
  'The Urban Explorer':        { zh: '都市猎人',   code: 'PS · CO · EX · AR', animal: '⚡', destinations: ['Changsha Taojin District', 'Bangkok RCA / Silom', 'Shanghai M50 + Xintiandi'], tip: 'Create a "hit list" with backup options — top spots fill fast on weekends. Research opening times the night before and arrive 30 min early.' },
  'The Ethereal Chaser':       { zh: '流光追逐者', code: 'PS · CO · EX · FW', animal: '🦋', destinations: ["Guangzhou Dongshankou", "Chengdu Yulin Road", 'Tokyo Shimokitazawa'], tip: 'Keep your afternoon completely free. The best finds happen when you\'re following a smell, not a map pin. Carry cash for spontaneous street food.' },
  'The Boutique Voyagist':     { zh: '精品旅行家', code: 'PS · CO · CK · AR', animal: '🥂', destinations: ['Aranya Seaside Resort', 'Anji Bamboo Retreats', 'Xiamen Design Hotels'], tip: 'Pre-book the sunset dinner and the best spa slot — they sell out. A great trip is 20% discovery, 80% execution of well-researched pleasures.' },
  'The Street-life Epicure':   { zh: '街头美食家', code: 'PS · CO · CK · FW', animal: '🍜', destinations: ["Xi'an Muslim Quarter", 'Shunde Food Villages', 'Chengdu Kuanzhai Night Market'], tip: 'Follow the queues, not the reviews. If the plastic stools are full and the sign is hand-painted, you\'ve found the right place.' },
  'The Primal Observer':       { zh: '原始观察者', code: 'PS · WA · EX · AR', animal: '🦁', destinations: ['Changbai Heaven Lake', 'Zhangye Danxia Geopark', 'Qinghai Chaka Salt Lake'], tip: 'Check the weather 48 hours ahead and have a contingency plan. Perfect light lasts 8–12 minutes. Position yourself 20 minutes early.' },
  'The Wilderness Wanderer':   { zh: '荒野漫步者', code: 'PS · WA · EX · FW', animal: '🏄', destinations: ['Wanning Surfing Coast', 'Western Sichuan Campgrounds', 'Hainan Backcountry'], tip: 'Tell someone your rough route before you head out. The best wild spots have no signal — freedom is addictive, preparation makes it safe.' },
  'The Hidden Luxury Collector':{ zh: '隐奢收藏家', code: 'PS · WA · CK · AR', animal: '🐆', destinations: ['Meili Snow Mountain Lodges', 'Shangri-La Retreat Hotels', 'Qinghai Lake Private Camps'], tip: 'Book 2–3 months ahead for premium remote properties. Ask the property for a private sunrise schedule — the best views are before breakfast.' },
  'The Serene Sojourner':      { zh: '静谧旅居者', code: 'PS · WA · CK · FW', animal: '🌾', destinations: ['Wuyuan Country Lanes', 'Sanya Quiet Beaches', 'Taihu Lake Villages'], tip: 'Resist the urge to fill every hour. One long walk with no destination is worth three packed itineraries. Switch your phone to silent on day one.' },
};

// ── Theme config ───────────────────────────────────────────────────────────────

const ssTheme = {
  heroBg: 'linear-gradient(145deg, #0f1923 0%, #1a2a3a 50%, #0d2030 100%)',
  heroGlow: 'radial-gradient(ellipse at 65% 35%, rgba(96,165,250,0.15) 0%, rgba(148,163,184,0.08) 40%, transparent 70%)',
  accent: '#7dd3fc',
  accentDeep: '#0ea5e9',
  accentRgb: '125,211,252',
  codeColor: '#93c5fd',
  badgeBg: 'rgba(125,211,252,0.12)',
  badgeBorder: 'rgba(125,211,252,0.3)',
  barA: '#7dd3fc',
  barB: '#94a3b8',
  bodyBg: 'linear-gradient(160deg, #f0f4f8 0%, #e8edf5 100%)',
  cardBg: '#ffffff',
  sectionAccent: '#0ea5e9',
  btnBg: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  btnShadow: 'rgba(14,165,233,0.35)',
  monologueBg: 'linear-gradient(135deg, #f0f8ff 0%, #e8f4fd 100%)',
  monologueBorder: 'rgba(125,211,252,0.35)',
  destCardBg: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
  destAccent: '#7dd3fc',
  tipBg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  tipBorder: '#bae6fd',
  tipIcon: '#0ea5e9',
};

const psTheme = {
  heroBg: 'linear-gradient(145deg, #1a0a00 0%, #2d1200 50%, #1f1000 100%)',
  heroGlow: 'radial-gradient(ellipse at 65% 35%, rgba(251,146,60,0.2) 0%, rgba(234,179,8,0.1) 40%, transparent 70%)',
  accent: '#fb923c',
  accentDeep: '#ea580c',
  accentRgb: '251,146,60',
  codeColor: '#fbbf24',
  badgeBg: 'rgba(251,146,60,0.12)',
  badgeBorder: 'rgba(251,146,60,0.3)',
  barA: '#fb923c',
  barB: '#4ade80',
  bodyBg: 'linear-gradient(160deg, #fdf8f0 0%, #fef3e2 100%)',
  cardBg: '#ffffff',
  sectionAccent: '#ea580c',
  btnBg: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  btnShadow: 'rgba(249,115,22,0.35)',
  monologueBg: 'linear-gradient(135deg, #fffbf0 0%, #fef9ec 100%)',
  monologueBorder: 'rgba(251,146,60,0.35)',
  destCardBg: 'linear-gradient(135deg, #3d1a00 0%, #2a1200 100%)',
  destAccent: '#fbbf24',
  tipBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
  tipBorder: '#fde68a',
  tipIcon: '#d97706',
};

// ── Animated bar ───────────────────────────────────────────────────────────────

const AnimatedBar = ({ percent, colorA, colorB, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setFilled(true), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <div ref={ref} style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: 'rgba(0,0,0,0.06)', flex: 1 }}>
      <div style={{
        height: '100%',
        width: filled ? `${percent}%` : '0%',
        background: colorA,
        borderRadius: '4px 0 0 4px',
        transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)',
      }} />
      <div style={{
        height: '100%',
        width: filled ? `${100 - percent}%` : '0%',
        background: colorB,
        borderRadius: '0 4px 4px 0',
        transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)',
        opacity: 0.5,
      }} />
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────────

const Result = () => {
  const location = useLocation();
  const { result, scores, winners } = location.state || {};

  if (!result) return <Navigate to="/quiz" replace />;

  const isSS = winners?.selfExpansion === 'soulSeeker';
  const theme = isSS ? ssTheme : psTheme;

  const meta = archetypeData[result.name] || {
    zh: '旅行者', code: '—', animal: '🌍',
    destinations: ['Destination A', 'Destination B', 'Destination C'],
    tip: 'Stay curious and travel at your own pace.',
  };

  const calculatePercent = (sideA, sideB) => {
    if (!scores) return 50;
    const a = scores[sideA] || 0;
    const b = scores[sideB] || 0;
    const total = a + b;
    if (total === 0) return 50;
    return Math.round((a / total) * 100);
  };

  const dimensions = [
    { label: 'Self-Expansion', sideA: 'Soul Seeker', sideB: 'Pleasure Seeker', pct: calculatePercent('soulSeeker', 'pleasureSeeker'), winner: winners?.selfExpansion === 'soulSeeker' ? 'Soul Seeker' : 'Pleasure Seeker' },
    { label: 'Place Resonance', sideA: 'Connector',   sideB: 'Wanderer',        pct: calculatePercent('connector', 'wanderer'),         winner: winners?.placeResonance === 'connector' ? 'Connector' : 'Wanderer' },
    { label: 'Openness',        sideA: 'Explorer',    sideB: 'Comfort Keeper',  pct: calculatePercent('explorer', 'comfortKeeper'),      winner: winners?.openness === 'explorer' ? 'Explorer' : 'Comfort Keeper' },
    { label: 'Structuration',   sideA: 'Architect',   sideB: 'Flow Walker',     pct: calculatePercent('architect', 'flowWalker'),        winner: winners?.structuration === 'architect' ? 'Architect' : 'Flow Walker' },
  ];

  const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
  const stagger = { show: { transition: { staggerChildren: 0.12 } } };

  return (
    <div style={{ minHeight: '100vh', background: theme.bodyBg, fontFamily: 'Lato, sans-serif' }}>

      {/* ── HERO ── */}
      <div style={{ background: theme.heroBg, position: 'relative', overflow: 'hidden', paddingTop: 96 }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', inset: 0, background: theme.heroGlow, pointerEvents: 'none' }} />
        {/* Noise grain texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px', pointerEvents: 'none' }} />

        <motion.div
          initial="hidden" animate="show" variants={stagger}
          style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 80px', textAlign: 'center', position: 'relative', zIndex: 1 }}
        >
          {/* Pre-label */}
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>
            Travel Persona Spectrum
          </motion.p>

          {/* Spirit animal */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} style={{ fontSize: 72, marginBottom: 24, filter: 'drop-shadow(0 0 32px rgba(255,255,255,0.15))' }}>
            {meta.animal}
          </motion.div>

          {/* Personality code badge */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: theme.badgeBg, border: `1px solid ${theme.badgeBorder}`,
              borderRadius: 40, padding: '8px 22px', marginBottom: 28,
              backdropFilter: 'blur(8px)',
            }}>
              <Compass size={13} color={theme.codeColor} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.18em', color: theme.codeColor, textTransform: 'uppercase' }}>
                {meta.code}
              </span>
            </div>
          </motion.div>

          {/* Chinese name */}
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.15 }} style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: `rgba(${theme.accentRgb}, 0.7)`, letterSpacing: '0.22em', marginBottom: 10, fontFamily: 'serif' }}>
            {meta.zh}
          </motion.p>

          {/* English name */}
          <motion.h1 variants={fadeUp} transition={{ duration: 0.7, delay: 0.2 }} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.6rem, 8vw, 5.2rem)', color: '#ffffff', lineHeight: 1.0, marginBottom: 28, letterSpacing: '-0.01em' }}>
            {result.name}
          </motion.h1>

          {/* Vibe tagline */}
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.25 }} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 36, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            {result.vibe}
          </motion.p>

          {/* Quote */}
          <motion.blockquote variants={fadeUp} transition={{ duration: 0.7, delay: 0.3 }} style={{
            fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
            fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', color: theme.accent,
            lineHeight: 1.45, maxWidth: 600, margin: '0 auto',
            padding: '28px 32px',
            borderTop: `1px solid rgba(${theme.accentRgb}, 0.18)`,
            borderBottom: `1px solid rgba(${theme.accentRgb}, 0.18)`,
          }}>
            "{result.quote}"
          </motion.blockquote>
        </motion.div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: `linear-gradient(to bottom, transparent, ${theme.bodyBg.includes('f0f4') ? '#f0f4f8' : '#fdf8f0'})`, pointerEvents: 'none' }} />
      </div>

      {/* ── BODY ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px 100px' }}>

        {/* ── SPECTRUM SECTION ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7 }}
          style={{ ...cardStyle, marginTop: -24, position: 'relative', zIndex: 2 }}
          className="result-card"
        >
          <SectionLabel text="Personality Spectrum" accent={theme.sectionAccent} icon={<Compass size={13} />} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {dimensions.map((dim, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af' }}>{dim.label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: theme.sectionAccent }}>{dim.winner}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af', minWidth: 76, lineHeight: 1.3 }}>{dim.sideA}</span>
                  <AnimatedBar percent={dim.pct} colorA={theme.barA} colorB={theme.barB} delay={0.1 + i * 0.15} />
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af', minWidth: 76, textAlign: 'right', lineHeight: 1.3 }}>{dim.sideB}</span>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.7rem', color: '#c4c4c4', marginTop: 4 }}>
                  {dim.pct}% · {100 - dim.pct}%
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── SOUL MONOLOGUE ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ ...cardStyle, marginTop: 20 }}
          className="result-card"
        >
          <SectionLabel text="Soul Monologue" accent={theme.sectionAccent} icon={<span style={{ fontSize: 13 }}>✦</span>} />
          <div style={{
            background: theme.monologueBg,
            border: `1px solid ${theme.monologueBorder}`,
            borderRadius: 14,
            padding: '28px 32px',
          }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', color: '#374151', lineHeight: 1.85, margin: 0 }}>
              {result.description}
            </p>
          </div>
        </motion.section>

        {/* ── IDEAL DESTINATIONS ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ ...cardStyle, marginTop: 20 }}
          className="result-card"
        >
          <SectionLabel text="Ideal Destinations" accent={theme.sectionAccent} icon={<MapPin size={13} />} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
            {meta.destinations.map((dest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: theme.destCardBg,
                  borderRadius: 14,
                  padding: '24px 18px',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
                  border: `1px solid rgba(${theme.accentRgb}, 0.15)`,
                  cursor: 'default',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                whileHover={{ y: -4, boxShadow: `0 12px 40px rgba(${theme.accentRgb}, 0.2)` }}
              >
                <MapPin size={16} color={theme.destAccent} />
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{dest}</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: `rgba(${theme.accentRgb}, 0.6)` }}>Top Pick #{i + 1}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── PRO TIPS ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ ...cardStyle, marginTop: 20 }}
          className="result-card"
        >
          <SectionLabel text="Expert Tips" accent={theme.sectionAccent} icon={<Lightbulb size={13} />} />
          <div style={{
            background: theme.tipBg,
            border: `1px solid ${theme.tipBorder}`,
            borderRadius: 14,
            padding: '24px 28px',
            display: 'flex', gap: 18, alignItems: 'flex-start',
          }}>
            <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: theme.tipBorder, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lightbulb size={18} color={theme.tipIcon} />
            </div>
            <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.75, margin: 0 }}>
              {meta.tip}
            </p>
          </div>
        </motion.section>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          {/* Share button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: `I'm ${result.name}`, text: result.vibe, url: window.location.href });
              } else {
                navigator.clipboard?.writeText(`I'm ${result.name} — ${meta.code}\n"${result.quote}"\n\nTake the Travel Persona Spectrum quiz!`);
              }
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: theme.btnBg,
              color: '#fff',
              padding: '18px 44px',
              borderRadius: 50,
              fontSize: '1.05rem',
              fontWeight: 700,
              fontFamily: 'Lato, sans-serif',
              border: 'none',
              cursor: 'pointer',
              boxShadow: `0 8px 32px ${theme.btnShadow}`,
              letterSpacing: '0.02em',
              transition: 'transform 0.2s, box-shadow 0.2s',
              marginBottom: 16,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 14px 40px ${theme.btnShadow}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 32px ${theme.btnShadow}`; }}
          >
            <Share2 size={18} />
            Generate My Travel Card
          </button>

          <br />

          {/* Explore CTA */}
          <Link
            to="/poi-selection"
            state={{ result, scores }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'transparent',
              border: `2px solid ${theme.accentDeep}`,
              color: theme.accentDeep,
              padding: '14px 36px',
              borderRadius: 50,
              fontSize: '0.95rem',
              fontWeight: 700,
              fontFamily: 'Lato, sans-serif',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'background 0.2s, color 0.2s',
              marginTop: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = theme.accentDeep; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.accentDeep; }}
          >
            Explore Your Experience Pool
            <ArrowRight size={16} />
          </Link>

          <br />

          <Link to="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 28, fontSize: '0.85rem', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = theme.accentDeep}
            onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
          >
            <RotateCcw size={13} />
            Retake the Assessment
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .result-card { padding: 24px 18px !important; }
        }
      `}</style>
    </div>
  );
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const cardStyle = {
  background: '#ffffff',
  borderRadius: 20,
  padding: '36px 40px',
  boxShadow: '0 4px 30px rgba(0,0,0,0.07)',
};

const SectionLabel = ({ text, accent, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
    <span style={{ color: accent }}>{icon}</span>
    <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: accent }}>
      {text}
    </span>
  </div>
);

export default Result;
