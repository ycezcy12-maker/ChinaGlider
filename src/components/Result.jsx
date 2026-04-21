import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const { result, scores, winners } = location.state || {};

  if (!result) return <Navigate to="/quiz" replace />;

  const calculatePercent = (sideA, sideB) => {
    if (!scores) return 50;
    const valA = scores[sideA] || 0;
    const valB = scores[sideB] || 0;
    const total = valA + valB;
    if (total === 0) return 50;
    return Math.round((valA / total) * 100);
  };

  const dimensions = [
    {
      label: 'Self-Expansion',
      sideA: 'Soul Seeker',
      sideB: 'Pleasure Seeker',
      percent: calculatePercent('soulSeeker', 'pleasureSeeker'),
      winner: winners?.selfExpansion === 'soulSeeker' ? 'Soul Seeker' : 'Pleasure Seeker'
    },
    {
      label: 'Place Resonance',
      sideA: 'Connector',
      sideB: 'Wanderer',
      percent: calculatePercent('connector', 'wanderer'),
      winner: winners?.placeResonance === 'connector' ? 'Connector' : 'Wanderer'
    },
    {
      label: 'Openness',
      sideA: 'Explorer',
      sideB: 'Comfort Keeper',
      percent: calculatePercent('explorer', 'comfortKeeper'),
      winner: winners?.openness === 'explorer' ? 'Explorer' : 'Comfort Keeper'
    },
    {
      label: 'Structuration',
      sideA: 'Architect',
      sideB: 'Flow Walker',
      percent: calculatePercent('architect', 'flowWalker'),
      winner: winners?.structuration === 'architect' ? 'Architect' : 'Flow Walker'
    }
  ];

  return (
    <div className="result-page">
      <div className="result-hero">
        <p className="pre-label">Travel Soul Spectrum</p>
        <h1 className="archetype-name">{result.name}</h1>
        <p className="archetype-title">{result.title}</p>
        <blockquote className="archetype-quote">"{result.quote}"</blockquote>
      </div>

      <div className="result-body">
        <div className="result-grid">

          {/* Description */}
          <div className="result-section result-description-card">
            <span className="section-label">Who You Are</span>
            <p className="description-text">{result.description}</p>
          </div>

          {/* Dimension breakdown */}
          <div className="result-section">
            <span className="section-label">Your Spectrum Breakdown</span>
            <div className="dimensions-list">
              {dimensions.map((dim, i) => (
                <div className="dimension-row" key={i}>
                  <div className="dim-meta">
                    <span className="dim-name">{dim.label}</span>
                    <span className="dim-winner">{dim.winner}</span>
                  </div>
                  <div className="dim-track">
                    <div className="dim-a-label">{dim.sideA}</div>
                    <div className="dim-bar-outer">
                      <div className="dim-bar-fill" style={{ width: `${dim.percent}%` }} />
                      <div className="dim-bar-fill-b" style={{ width: `${100 - dim.percent}%` }} />
                    </div>
                    <div className="dim-b-label">{dim.sideB}</div>
                  </div>
                  <div className="dim-pct">{dim.percent}% / {100 - dim.percent}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="result-section result-recommendation-card">
            <span className="section-label">Curated For You</span>
            <p className="recommendation-text">{result.recommendation}</p>
          </div>

        </div>

        <div className="result-cta">
          <p className="cta-hint">Ready to explore spots tailored to your travel soul?</p>
          <Link to="/poi-selection" state={{ result, scores }} className="cta-btn">
            Explore Your Experience Pool
            <ArrowRight size={18} style={{ marginLeft: '10px' }} />
          </Link>
          <Link to="/quiz" className="retake-link">Retake the Assessment</Link>
        </div>
      </div>

      <style>{`
        .result-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #faf8f5 0%, #f0ebe3 100%);
        }

        /* ── Hero ── */
        .result-hero {
          background: var(--color-text-primary);
          color: #fff;
          text-align: center;
          padding: 120px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        .result-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 60% 40%, rgba(192,108,84,0.18) 0%, transparent 65%);
          pointer-events: none;
        }

        .pre-label {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.55);
          margin-bottom: 20px;
        }

        .archetype-name {
          font-size: clamp(2.8rem, 7vw, 5rem);
          color: #fff;
          margin-bottom: 16px;
          line-height: 1.05;
        }

        .archetype-title {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 32px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }

        .archetype-quote {
          font-size: 1.5rem;
          font-style: italic;
          font-family: var(--font-heading);
          color: var(--color-accent-terracotta);
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.45;
          border: none;
          padding: 0;
        }

        /* ── Body ── */
        .result-body {
          max-width: 820px;
          margin: 0 auto;
          padding: 64px 24px 80px;
        }

        .result-grid {
          display: flex;
          flex-direction: column;
          gap: 28px;
          margin-bottom: 56px;
        }

        .result-section {
          background: #fff;
          border-radius: 16px;
          padding: 36px 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        .section-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-accent-terracotta);
          margin-bottom: 18px;
        }

        /* Description */
        .description-text {
          font-size: 1.1rem;
          color: var(--color-text-primary);
          line-height: 1.7;
          margin: 0;
        }

        /* Dimensions */
        .dimensions-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .dimension-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .dim-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .dim-name {
          font-size: 0.82rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-secondary);
        }

        .dim-winner {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-accent-terracotta);
        }

        .dim-track {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dim-a-label, .dim-b-label {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          white-space: nowrap;
          min-width: 88px;
        }

        .dim-b-label { text-align: right; }

        .dim-bar-outer {
          flex: 1;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          background: rgba(0,0,0,0.04);
        }

        .dim-bar-fill {
          height: 100%;
          background: var(--color-accent-terracotta);
          border-radius: 4px 0 0 4px;
          transition: width 0.8s ease;
        }

        .dim-bar-fill-b {
          height: 100%;
          background: var(--color-accent-teal);
          border-radius: 0 4px 4px 0;
          transition: width 0.8s ease;
        }

        .dim-pct {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          white-space: nowrap;
          min-width: 80px;
          text-align: right;
        }

        /* Recommendation */
        .result-recommendation-card {
          border-left: 4px solid var(--color-accent-terracotta);
          background: linear-gradient(135deg, #fff 0%, #fdf6f3 100%);
        }

        .recommendation-text {
          font-size: 1.05rem;
          color: var(--color-text-primary);
          line-height: 1.7;
          margin: 0;
        }

        /* CTA */
        .result-cta {
          text-align: center;
        }

        .cta-hint {
          font-size: 1rem;
          color: var(--color-text-secondary);
          margin-bottom: 20px;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          background: var(--color-accent-terracotta);
          color: #fff;
          padding: 16px 40px;
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 6px 24px rgba(192,108,84,0.28);
        }

        .cta-btn:hover {
          background: #b05840;
          box-shadow: 0 8px 32px rgba(192,108,84,0.38);
          transform: translateY(-2px);
        }

        .retake-link {
          display: block;
          margin-top: 20px;
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }

        .retake-link:hover { color: var(--color-accent-terracotta); }

        @media (max-width: 600px) {
          .result-hero { padding: 100px 20px 60px; }
          .result-section { padding: 28px 24px; }
          .dim-a-label, .dim-b-label { min-width: 64px; font-size: 0.68rem; }
          .dim-pct { min-width: 60px; font-size: 0.68rem; }
        }
      `}</style>
    </div>
  );
};

export default Result;
