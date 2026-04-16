import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { slides } from '../data/destinationData';

const DestinationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [animating, setAnimating] = useState(false);
  const autoPlayRef = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlayRef.current) {
        advance(1);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const advance = (dir) => {
    if (animating) return;
    setAnimating(true);
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + dir + slides.length) % slides.length);
    setTimeout(() => setAnimating(false), 700);
  };

  const goTo = (idx) => {
    if (animating || idx === currentIndex) return;
    autoPlayRef.current = false;
    setAnimating(true);
    setPrevIndex(currentIndex);
    setCurrentIndex(idx);
    setTimeout(() => setAnimating(false), 700);
  };

  const handleManual = (dir) => {
    autoPlayRef.current = false;
    advance(dir);
  };

  const current = slides[currentIndex];

  return (
    <section className="hero-carousel">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`hero-slide ${idx === currentIndex ? 'active' : ''} ${idx === prevIndex && animating ? 'exit' : ''}`}
          aria-hidden={idx !== currentIndex}
        >
          <img src={slide.imageUrl} alt={slide.tagline} className="slide-bg" />
          <div className={`slide-overlay ${slide.type === 'intro' ? 'overlay-intro' : 'overlay-dest'}`} />
        </div>
      ))}

      <div className="hero-carousel-content">
        <div key={currentIndex} className="slide-text-block fade-up">
          <p className="slide-tagline">{current.tagline}</p>
          <h1 className="slide-title">{current.title}</h1>
          {current.subtitle && (
            <h2 className="slide-subtitle">{current.subtitle}</h2>
          )}
          <p className="slide-description">{current.description}</p>
          <Link to={current.cta.path} className={`slide-cta ${current.type === 'intro' ? 'cta-primary' : 'cta-secondary'}`}>
            {current.cta.label} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </div>

      <button className="nav-btn nav-prev" onClick={() => handleManual(-1)} aria-label="Previous slide">
        <ChevronLeft size={28} />
      </button>
      <button className="nav-btn nav-next" onClick={() => handleManual(1)} aria-label="Next slide">
        <ChevronRight size={28} />
      </button>

      <div className="slide-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentIndex ? 'dot-active' : ''}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <style>{`
        .hero-carousel {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 620px;
          overflow: hidden;
          background: #1a1510;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.7s ease-in-out;
          pointer-events: none;
        }

        .hero-slide.active {
          opacity: 1;
          pointer-events: auto;
        }

        .hero-slide.exit {
          opacity: 0;
        }

        .slide-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .slide-overlay {
          position: absolute;
          inset: 0;
        }

        .overlay-intro {
          background: linear-gradient(to right, rgba(30, 20, 12, 0.78) 0%, rgba(74, 59, 50, 0.5) 55%, transparent 100%);
        }

        .overlay-dest {
          background: linear-gradient(135deg, rgba(20, 15, 10, 0.82) 0%, rgba(74, 59, 50, 0.55) 50%, transparent 100%);
        }

        .hero-carousel-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: 0 80px;
          z-index: 10;
          pointer-events: none;
        }

        .slide-text-block {
          max-width: 680px;
          color: #fff;
          pointer-events: auto;
        }

        .fade-up {
          animation: fadeUp 0.65s ease-out both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .slide-tagline {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--color-accent-gold);
          margin-bottom: 16px;
        }

        .slide-title {
          font-family: var(--font-heading);
          font-size: 3.2rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 10px;
          color: #fff;
        }

        .slide-subtitle {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 400;
          font-style: italic;
          line-height: 1.2;
          margin-bottom: 20px;
          color: rgba(255,255,255,0.85);
        }

        .slide-description {
          font-size: 1.05rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
          margin-bottom: 36px;
          max-width: 580px;
        }

        .slide-cta {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px 36px;
          border-radius: 4px;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .cta-primary {
          background-color: var(--color-accent-terracotta);
          color: #fff;
          box-shadow: 0 6px 20px rgba(192, 108, 84, 0.45);
        }

        .cta-primary:hover {
          background-color: #b85e47;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(192, 108, 84, 0.55);
        }

        .cta-secondary {
          background-color: rgba(255, 255, 255, 0.12);
          color: #fff;
          border: 1.5px solid rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(8px);
        }

        .cta-secondary:hover {
          background-color: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.8);
          transform: translateY(-2px);
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          background: rgba(255, 255, 255, 0.12);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-50%) scale(1.08);
        }

        .nav-prev { left: 28px; }
        .nav-next { right: 28px; }

        .slide-indicators {
          position: absolute;
          bottom: 36px;
          left: 80px;
          display: flex;
          gap: 10px;
          z-index: 20;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot-active {
          background: #fff;
          width: 28px;
          border-radius: 5px;
        }

        @media (max-width: 768px) {
          .hero-carousel-content {
            padding: 0 28px;
            align-items: flex-end;
            padding-bottom: 100px;
          }

          .slide-title {
            font-size: 2.2rem;
          }

          .slide-subtitle {
            font-size: 1.3rem;
          }

          .slide-description {
            font-size: 0.95rem;
          }

          .nav-prev { left: 14px; }
          .nav-next { right: 14px; }

          .slide-indicators {
            left: 50%;
            transform: translateX(-50%);
            bottom: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default DestinationCarousel;
