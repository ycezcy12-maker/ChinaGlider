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
          <div className="slide-fade-top" />
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
        <ChevronLeft size={24} />
      </button>
      <button className="nav-btn nav-next" onClick={() => handleManual(1)} aria-label="Next slide">
        <ChevronRight size={24} />
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
          min-height: 640px;
          overflow: hidden;
          background: #f2e8da;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
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
          object-position: center bottom;
          display: block;
        }

        .slide-fade-top {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            #f2e8da 0%,
            rgba(242, 232, 218, 0.92) 18%,
            rgba(242, 232, 218, 0.6) 36%,
            rgba(242, 232, 218, 0.1) 55%,
            transparent 70%
          );
        }

        .hero-carousel-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          z-index: 10;
          pointer-events: none;
          text-align: center;
          padding: 90px 40px 0;
        }

        .slide-text-block {
          max-width: 680px;
          pointer-events: auto;
        }

        .fade-up {
          animation: fadeUp 0.65s ease-out both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .slide-tagline {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--color-accent-terracotta);
          margin-bottom: 14px;
          opacity: 0.85;
        }

        .slide-title {
          font-family: var(--font-heading);
          font-size: 3.4rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 6px;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
        }

        .slide-subtitle {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 500;
          line-height: 1.2;
          margin-bottom: 20px;
          color: var(--color-accent-gold);
        }

        .slide-description {
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin-bottom: 36px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        .slide-cta {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px 36px;
          border-radius: 50px;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
        }

        .cta-primary {
          background-color: var(--color-accent-terracotta);
          color: #fff;
          box-shadow: 0 6px 24px rgba(192, 108, 84, 0.35);
        }

        .cta-primary:hover {
          background-color: #b85e47;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(192, 108, 84, 0.5);
        }

        .cta-secondary {
          background-color: rgba(255, 255, 255, 0.65);
          color: var(--color-text-primary);
          border: 1.5px solid rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(8px);
        }

        .cta-secondary:hover {
          background-color: rgba(255, 255, 255, 0.85);
          border-color: rgba(0, 0, 0, 0.35);
          transform: translateY(-2px);
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          background: rgba(255, 255, 255, 0.55);
          border: 1.5px solid rgba(0, 0, 0, 0.1);
          color: var(--color-text-primary);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(0, 0, 0, 0.2);
          transform: translateY(-50%) scale(1.08);
        }

        .nav-prev { left: 28px; }
        .nav-next { right: 28px; }

        .slide-indicators {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 20;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .dot-active {
          background: var(--color-accent-terracotta);
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .hero-carousel-content {
            padding: 0 24px;
            align-items: center;
          }

          .slide-title {
            font-size: 2.4rem;
          }

          .slide-subtitle {
            font-size: 1.4rem;
          }

          .slide-description {
            font-size: 0.92rem;
          }

          .nav-prev { left: 12px; }
          .nav-next { right: 12px; }
        }
      `}</style>
    </section>
  );
};

export default DestinationCarousel;
