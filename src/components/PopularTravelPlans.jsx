import React from 'react';
import { MapPin, Clock, Users, TrendingUp } from 'lucide-react';

const PopularTravelPlans = () => {
  const plans = [
    {
      id: 1,
      title: "Shanghai City Walk",
      duration: "3 days",
      difficulty: "Easy",
      highlights: [
        "French Concession Stroll",
        "Bund Evening Walk",
        "Yu Garden & Tea House"
      ],
      travelers: "Urban Explorers",
      popularity: "4.8/5"
    },
    {
      id: 2,
      title: "Silk Road Adventure",
      duration: "14 days",
      difficulty: "Moderate",
      highlights: [
        "Xi'an Terracotta Army",
        "Dunhuang Mogao Caves",
        "Kashgar Desert Cities"
      ],
      travelers: "Adventure Seekers",
      popularity: "4.9/5"
    },
    {
      id: 3,
      title: "Tibet Spiritual Journey",
      duration: "10 days",
      difficulty: "Challenging",
      highlights: [
        "Lhasa Jokhang Temple",
        "Potala Palace",
        "Everest Base Camp"
      ],
      travelers: "Spiritual Wanderers",
      popularity: "4.8/5"
    },
    {
      id: 4,
      title: "Guilin Karst Escape",
      duration: "5 days",
      difficulty: "Easy",
      highlights: [
        "Li River Rafting",
        "Yangshuo Rock Climbing",
        "Cormorant Fishing"
      ],
      travelers: "Nature Lovers",
      popularity: "4.7/5"
    },
    {
      id: 5,
      title: "Beijing Imperial Tour",
      duration: "4 days",
      difficulty: "Easy",
      highlights: [
        "Great Wall Trek",
        "Forbidden City",
        "Summer Palace"
      ],
      travelers: "History Buffs",
      popularity: "4.8/5"
    },
    {
      id: 6,
      title: "Chengdu Panda Paradise",
      duration: "6 days",
      difficulty: "Easy",
      highlights: [
        "Giant Panda Base",
        "Leshan Buddha",
        "Kuanzhai Old Street"
      ],
      travelers: "Family Travelers",
      popularity: "4.9/5"
    }
  ];

  return (
    <section className="popular-plans-section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Popular Travel Plans</h2>
          <p>Pre-designed itineraries from experienced travelers</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <div className="plan-header">
                <h3 className="plan-title">{plan.title}</h3>
                <div className="plan-rating">
                  <TrendingUp size={16} />
                  <span>{plan.popularity}</span>
                </div>
              </div>

              <div className="plan-meta">
                <div className="meta-item">
                  <Clock size={18} />
                  <span>{plan.duration}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={18} />
                  <span>{plan.difficulty}</span>
                </div>
                <div className="meta-item">
                  <Users size={18} />
                  <span>{plan.travelers}</span>
                </div>
              </div>

              <div className="highlights-section">
                <p className="highlights-label">Highlights</p>
                <ul className="highlights-list">
                  {plan.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .popular-plans-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #f8f7f5 0%, #fff 100%);
        }

        .section-header {
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 16px;
          color: var(--color-accent-terracotta);
        }

        .section-header p {
          color: var(--color-text-secondary);
          font-size: 1.1rem;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .plan-card {
          background: #fff;
          border-radius: var(--border-radius-lg);
          padding: 32px;
          box-shadow: none;
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .plan-card:hover {
          transform: translateY(-12px);
          box-shadow: var(--shadow-soft);
          border-color: rgba(192, 108, 84, 0.2);
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          gap: 16px;
        }

        .plan-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          color: var(--color-text-primary);
          margin: 0;
        }

        .plan-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: rgba(219, 180, 105, 0.1);
          padding: 6px 12px;
          border-radius: 20px;
          color: var(--color-accent-gold);
          font-weight: 600;
          white-space: nowrap;
          font-size: 0.9rem;
        }

        .plan-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
        }

        .meta-item svg {
          color: var(--color-accent-teal);
        }

        .meta-item span {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          font-weight: 500;
        }

        .highlights-section {
          flex: 1;
        }

        .highlights-label {
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .highlights-list li {
          padding-left: 20px;
          position: relative;
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .highlights-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--color-accent-teal);
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .plans-grid {
            grid-template-columns: 1fr;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .plan-meta {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default PopularTravelPlans;
