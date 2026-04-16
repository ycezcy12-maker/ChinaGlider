import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroBg from '../assets/上海秋日街景_1822x1024_完整版.jpg';
import DestinationCarousel from './DestinationCarousel';
import SeasonalRecommendations from './SeasonalRecommendations';
import PopularTravelPlans from './PopularTravelPlans';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content text-center">
          <h1 className="hero-title fade-in">
            Discover Your <br />
            <span className="text-gold">Shanghai Soul</span>
          </h1>
          <p className="hero-subtitle fade-in" style={{ animationDelay: '0.2s' }}>
            Experience the city through a journey tailored to your unique travel personality.
            From the historic French Concession to the modern skyline.
          </p>
          <div className="hero-cta fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/quiz" className="btn-primary">
              Start Your Journey <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
        </div>

        <div className="hero-image-wrapper fade-in" style={{ animationDelay: '0.6s' }}>
          <img src={heroBg} alt="Shanghai Golden Hour" className="hero-image" />
        </div>
      </section>

      <DestinationCarousel />
      <SeasonalRecommendations />
      <PopularTravelPlans />

      <style>{`
        .hero-section {
          position: relative;
          height: 100vh; /* Force full viewport height */
          min-height: 600px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end; /* Align everything to bottom */
          overflow: hidden;
          background-color: var(--color-bg-paper);
          padding-top: 80px;
        }

        .hero-content {
          flex: 0 0 auto; /* Don't stretch */
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          position: absolute; /* Float above image */
          top: 15%; /* Position relative to viewport height */
          left: 0;
          right: 0;
          z-index: 2;
        }

        .hero-title {
          margin-bottom: 16px;
          font-size: 3.5rem; /* Smaller title to save vertical space */
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--color-text-secondary);
          margin-bottom: 32px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta {
          display: flex;
          justify-content: center;
        }

        .hero-image-wrapper {
          flex: 1 1 auto; /* Take remaining space */
          width: 100%;
          display: flex;
          align-items: flex-end; /* Align image to bottom */
          justify-content: center;
          line-height: 0;
          height: 85%; /* Dedicate bottom 85% to image area */
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          /* Blend mask */
          mask-image: linear-gradient(to bottom, transparent 0%, black 25%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 25%);
          display: block;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(192, 108, 84, 0.3);
          padding: 16px 40px; /* Larger button for hero */
          font-size: 1.2rem;
        }


        @media (max-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }
          .hero-section {
            padding-top: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
