import React from 'react';
import { Leaf, Cloud, Sun, Snowflake } from 'lucide-react';

const SeasonalRecommendations = () => {
  const recommendations = [
    {
      id: 1,
      season: "Spring",
      icon: Leaf,
      color: "var(--color-accent-teal)",
      spots: [
        { name: "West Lake Plum Blossoms", city: "Hangzhou", rating: "4.8/5" },
        { name: "Cherry Blossom Festival", city: "Wuhan", rating: "4.7/5" },
        { name: "Peony Garden", city: "Luoyang", rating: "4.6/5" }
      ]
    },
    {
      id: 2,
      season: "Summer",
      icon: Sun,
      color: "var(--color-accent-gold)",
      spots: [
        { name: "Yellow Mountains Peak", city: "Anhui", rating: "4.9/5" },
        { name: "Li River Bamboo Rafting", city: "Guilin", rating: "4.8/5" },
        { name: "Zhangjiajie Glass Walkway", city: "Hunan", rating: "4.7/5" }
      ]
    },
    {
      id: 3,
      season: "Autumn",
      icon: Cloud,
      color: "var(--color-accent-terracotta)",
      spots: [
        { name: "Great Wall Golden Hour", city: "Beijing", rating: "4.9/5" },
        { name: "Jinshanling Trail", city: "Hebei", rating: "4.7/5" },
        { name: "Maple Grove", city: "Suzhou", rating: "4.6/5" }
      ]
    },
    {
      id: 4,
      season: "Winter",
      icon: Snowflake,
      color: "#8B9CC0",
      spots: [
        { name: "Harbin Ice Festival", city: "Harbin", rating: "4.8/5" },
        { name: "Hot Springs Valley", city: "Yangshuo", rating: "4.7/5" },
        { name: "Tiger Leaping Gorge", city: "Yunnan", rating: "4.8/5" }
      ]
    }
  ];

  return (
    <section className="seasonal-recommendations-section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Seasonal Recommendations</h2>
          <p>Discover the best tourism spots for each season across China</p>
        </div>

        <div className="seasonal-grid">
          {recommendations.map((season) => {
            const IconComponent = season.icon;
            return (
              <div key={season.id} className="seasonal-card">
                <div className="seasonal-icon" style={{ color: season.color }}>
                  <IconComponent size={40} />
                </div>
                <h3 className="seasonal-title">{season.season}</h3>

                <div className="spots-list">
                  {season.spots.map((spot, idx) => (
                    <div key={idx} className="spot-item">
                      <div className="spot-info">
                        <p className="spot-name">{spot.name}</p>
                        <p className="spot-city">{spot.city}</p>
                      </div>
                      <span className="spot-rating">{spot.rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .seasonal-recommendations-section {
          padding: 80px 0;
          background-color: #fff;
        }

        .section-header {
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 16px;
          color: var(--color-accent-teal);
        }

        .section-header p {
          color: var(--color-text-secondary);
          font-size: 1.1rem;
        }

        .seasonal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .seasonal-card {
          background: var(--color-bg-paper);
          border-radius: var(--border-radius-lg);
          padding: 40px 30px;
          box-shadow: none;
          border: 1px solid rgba(0, 0, 0, 0.03);
          transition: all 0.3s ease;
          position: relative;
        }

        .seasonal-card:hover {
          transform: translateY(-12px);
          box-shadow: var(--shadow-soft);
          background: #fff;
        }

        .seasonal-icon {
          width: 70px;
          height: 70px;
          background-color: rgba(0, 0, 0, 0.02);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .seasonal-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          margin-bottom: 24px;
          color: var(--color-text-primary);
        }

        .spots-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .spot-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .spot-item:last-child {
          border-bottom: none;
        }

        .spot-info {
          flex: 1;
        }

        .spot-name {
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 4px;
          font-size: 0.95rem;
        }

        .spot-city {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .spot-rating {
          font-weight: 700;
          color: var(--color-accent-gold);
          font-size: 0.9rem;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .seasonal-grid {
            grid-template-columns: 1fr;
          }

          .section-header h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SeasonalRecommendations;
