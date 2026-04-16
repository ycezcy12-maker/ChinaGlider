import React, { useState } from 'react';
import { X, MapPin, Compass } from 'lucide-react';
import { solarTerms, seasonColors } from '../data/solarTermsData';

const seasons = [
  { key: "spring", label: "Spring" },
  { key: "summer", label: "Summer" },
  { key: "autumn", label: "Autumn" },
  { key: "winter", label: "Winter" }
];

const SeasonalRecommendations = () => {
  const [activeSeason, setActiveSeason] = useState("spring");
  const [selectedTerm, setSelectedTerm] = useState(null);

  const filtered = solarTerms.filter(t => t.season === activeSeason);
  const colors = seasonColors[activeSeason];

  return (
    <section className="solar-section">
      <div className="container">
        <div className="solar-header">
          <h2 className="solar-title">Travel by Solar Term</h2>
          <p className="solar-subtitle">China's ancient 24-node calendar reveals the perfect moment to visit each destination — matched to nature's own rhythm.</p>

          <div className="season-tabs">
            {seasons.map(s => (
              <button
                key={s.key}
                className={`season-tab ${activeSeason === s.key ? 'tab-active' : ''}`}
                style={activeSeason === s.key ? {
                  backgroundColor: seasonColors[s.key].accent,
                  color: '#fff',
                  borderColor: seasonColors[s.key].accent
                } : {}}
                onClick={() => setActiveSeason(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="terms-grid">
          {filtered.map(term => (
            <div
              key={term.id}
              className="term-card"
              style={{ '--card-accent': colors.accent }}
              onClick={() => setSelectedTerm(term)}
            >
              <div className="term-image-wrap">
                <img src={term.imageUrl} alt={term.name} className="term-image" />
                <div className="term-image-overlay" />
                <div className="term-badge">
                  <span className="term-date">{term.date}</span>
                </div>
              </div>
              <div className="term-body">
                <div className="term-name-row">
                  <h3 className="term-meaning">{term.meaning}</h3>
                  <span className="term-chinese">{term.name}</span>
                </div>
                <p className="term-pinyin-sub">{term.pinyin}</p>
                <div className="term-tags">
                  {term.tags && term.tags.map((tag, i) => (
                    <span key={i} className="term-tag">{tag}</span>
                  ))}
                </div>
                {term.travelClue && (
                  <p className="term-clue">
                    <Compass size={12} style={{ marginRight: 5, verticalAlign: 'middle', flexShrink: 0 }} />
                    {term.travelClue}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTerm && (
        <div className="modal-backdrop" onClick={() => setSelectedTerm(null)}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTerm(null)}>
              <X size={20} />
            </button>

            <div className="modal-hero">
              <img src={selectedTerm.imageUrl} alt={selectedTerm.name} className="modal-hero-img" />
              <div className="modal-hero-overlay" />
              <div className="modal-hero-text">
                <p className="modal-date">{selectedTerm.date}</p>
                <h2 className="modal-term-name">{selectedTerm.meaning}</h2>
                <p className="modal-term-pinyin">{selectedTerm.name} · {selectedTerm.pinyin}</p>
              </div>
            </div>

            <div className="modal-body">
              <h3 className="modal-recs-title">Recommended Destinations</h3>
              <div className="modal-dest-list">
                {selectedTerm.destinations.map((dest, idx) => (
                  <div key={idx} className="modal-dest-item">
                    <div className="dest-header">
                      <span className="dest-name">{dest.name}</span>
                      <span className="dest-city">
                        <MapPin size={13} style={{ marginRight: 3 }} />{dest.city}
                      </span>
                    </div>
                    <p className="dest-reason">{dest.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .solar-section {
          padding: 90px 0 100px;
          background: var(--color-bg-paper);
        }

        .solar-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .solar-title {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          color: var(--color-text-primary);
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .solar-subtitle {
          color: var(--color-text-secondary);
          font-size: 1rem;
          margin-bottom: 36px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        .season-tabs {
          display: inline-flex;
          gap: 10px;
          background: #fff;
          padding: 6px;
          border-radius: 50px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .season-tab {
          padding: 10px 28px;
          border-radius: 50px;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: transparent;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .season-tab:hover {
          border-color: rgba(0,0,0,0.25);
          color: var(--color-text-primary);
        }

        .terms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }

        .term-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }

        .term-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }

        .term-image-wrap {
          position: relative;
          height: 160px;
          overflow: hidden;
        }

        .term-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .term-card:hover .term-image {
          transform: scale(1.06);
        }

        .term-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45) 100%);
        }

        .term-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .term-date {
          color: #fff;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .term-body {
          padding: 18px 18px 20px;
        }

        .term-name-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 2px;
        }

        .term-meaning {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.2;
          flex: 1;
        }

        .term-chinese {
          font-size: 1.1rem;
          color: var(--color-accent-teal);
          font-weight: 700;
          flex-shrink: 0;
          letter-spacing: 0.05em;
        }

        .term-pinyin-sub {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          font-style: italic;
          margin-bottom: 10px;
        }

        .term-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 10px;
        }

        .term-tag {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.3px;
          color: var(--card-accent, #5D9B6B);
          background: color-mix(in srgb, var(--card-accent, #5D9B6B) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--card-accent, #5D9B6B) 25%, transparent);
          padding: 3px 8px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .term-clue {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin: 0;
          display: flex;
          align-items: flex-start;
          gap: 2px;
          font-style: italic;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: backdropIn 0.25s ease;
        }

        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .modal-panel {
          background: #fff;
          border-radius: 20px;
          max-width: 560px;
          width: 100%;
          max-height: 88vh;
          overflow-y: auto;
          position: relative;
          animation: panelIn 0.3s ease;
          box-shadow: 0 30px 80px rgba(0,0,0,0.25);
        }

        @keyframes panelIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0,0,0,0.35);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }

        .modal-close:hover {
          background: rgba(0,0,0,0.6);
        }

        .modal-hero {
          position: relative;
          height: 220px;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }

        .modal-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%);
        }

        .modal-hero-text {
          position: absolute;
          bottom: 24px;
          left: 28px;
          color: #fff;
        }

        .modal-date {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: var(--color-accent-gold);
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .modal-term-name {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          line-height: 1.1;
          margin-bottom: 6px;
          color: #fff;
        }

        .modal-term-pinyin {
          font-size: 0.88rem;
          color: rgba(255,255,255,0.8);
        }

        .modal-body {
          padding: 28px 28px 32px;
        }

        .modal-recs-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          color: var(--color-text-primary);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }

        .modal-dest-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .modal-dest-item {
          padding: 18px 20px;
          background: var(--color-bg-paper);
          border-radius: 12px;
          border-left: 3px solid var(--color-accent-terracotta);
        }

        .dest-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 12px;
        }

        .dest-name {
          font-weight: 700;
          color: var(--color-text-primary);
          font-size: 1rem;
        }

        .dest-city {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          white-space: nowrap;
        }

        .dest-reason {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 768px) {
          .terms-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .season-tabs {
            flex-wrap: wrap;
            justify-content: center;
          }

          .season-tab {
            padding: 8px 18px;
            font-size: 0.82rem;
          }

          .solar-title {
            font-size: 2.2rem;
          }

          .modal-panel {
            max-height: 92vh;
          }

          .modal-term-name {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 480px) {
          .terms-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default SeasonalRecommendations;
