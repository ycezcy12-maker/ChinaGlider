import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { destinations } from '../data/destinationData';

const DestinationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const current = destinations[currentIndex];

  return (
    <section className="destination-carousel-section">
      <div className="carousel-wrapper">
        <div className="carousel-main">
          <img src={current.artworkUrl} alt={current.name} className="carousel-image" />
          <div className="carousel-overlay">
            <div className="carousel-content">
              <h3 className="carousel-tagline">{current.tagline}</h3>
              <h2 className="carousel-title">{current.name}</h2>
              <p className="carousel-description">{current.description}</p>
              <div className="carousel-characteristics">
                {current.characteristics.map((char, idx) => (
                  <span key={idx} className="characteristic-tag">{char}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-controls">
          <button className="carousel-btn prev" onClick={goToPrevious} aria-label="Previous">
            <ChevronLeft size={24} />
          </button>
          <div className="carousel-indicators">
            {destinations.map((_, idx) => (
              <div
                key={idx}
                className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setIsAutoPlay(false);
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </div>
          <button className="carousel-btn next" onClick={goToNext} aria-label="Next">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .destination-carousel-section {
          padding: 60px 0 80px;
          background-color: #fff;
        }

        .carousel-wrapper {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .carousel-main {
          position: relative;
          border-radius: var(--border-radius-xl);
          overflow: hidden;
          aspect-ratio: 16 / 9;
          height: 500px;
          box-shadow: var(--shadow-medium);
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease-out;
        }

        .carousel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(74, 59, 50, 0.7) 0%, rgba(192, 108, 84, 0.5) 50%, transparent 100%);
          display: flex;
          align-items: flex-end;
          padding: 60px 50px;
          z-index: 2;
        }

        .carousel-content {
          color: white;
          animation: slideUpFade 0.6s ease-out;
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .carousel-tagline {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-accent-gold);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .carousel-title {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .carousel-description {
          font-size: 1.1rem;
          font-weight: 300;
          margin-bottom: 20px;
          line-height: 1.6;
          max-width: 600px;
        }

        .carousel-characteristics {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .characteristic-tag {
          background-color: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .carousel-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
          padding: 0 20px;
        }

        .carousel-btn {
          background: none;
          border: none;
          padding: 12px;
          cursor: pointer;
          color: var(--color-accent-terracotta);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          background-color: rgba(192, 108, 84, 0.1);
        }

        .carousel-btn:hover {
          background-color: rgba(192, 108, 84, 0.2);
          transform: scale(1.1);
        }

        .carousel-indicators {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex: 1;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(74, 59, 50, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .indicator.active {
          background-color: var(--color-accent-terracotta);
          width: 32px;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .carousel-main {
            height: 350px;
          }

          .carousel-overlay {
            padding: 40px 30px;
          }

          .carousel-title {
            font-size: 2.5rem;
          }

          .carousel-description {
            font-size: 1rem;
          }

          .carousel-controls {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default DestinationCarousel;
