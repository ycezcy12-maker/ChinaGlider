import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setScrolled(false);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const transparent = isHome && !scrolled;

  return (
    <div className="app-container">
      <header className={`main-header ${transparent ? 'header-transparent' : 'header-solid'}`}>
        <div className="container header-content">
          <Link to="/" className="logo">
            <Compass size={28} color={transparent ? '#DBB469' : 'var(--color-accent-terracotta)'} />
            <span className={`logo-text ${transparent ? 'logo-light' : ''}`}>ChinaGlider</span>
          </Link>
          <nav className="nav-links">
            <Link to="/" className={`nav-item ${transparent ? 'nav-item-light' : ''}`}>Home</Link>
            <Link to="/quiz" className={`nav-item ${transparent ? 'nav-item-light' : ''}`}>Travel MBTI</Link>
            <Link to="/poi-selection" className={`nav-item ${transparent ? 'nav-item-light' : ''}`}>Personalized Spots</Link>
            <Link to="/trip-basics" className={`nav-item ${transparent ? 'nav-item-light' : ''}`}>Smart Itinerary</Link>
            <Link to="/starter-pack" className={`nav-item ${transparent ? 'nav-item-light' : ''}`}>Starter Pack</Link>
          </nav>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="main-footer">
        <div className="container">
          <p>&copy; 2024 ChinaGlider. Discover Your Shanghai Soul.</p>
        </div>
      </footer>

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-header {
          padding: 20px 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 100;
          transition: background-color 0.4s ease, box-shadow 0.4s ease;
        }

        .header-transparent {
          background-color: transparent;
          box-shadow: none;
        }

        .header-solid {
          background-color: #fff;
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-text {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .logo-light {
          color: #fff;
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-item {
          text-decoration: none;
          color: var(--color-text-primary);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.95rem;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-item-light {
          color: rgba(255, 255, 255, 0.9);
        }

        .nav-item:hover,
        .nav-item-light:hover {
          color: var(--color-accent-gold);
        }

        main {
          flex: 1;
        }

        .main-footer {
          padding: 40px 0;
          text-align: center;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          border-top: 1px solid rgba(74, 59, 50, 0.1);
        }

        @media (max-width: 768px) {
          .nav-links {
            gap: 16px;
          }

          .nav-item {
            font-size: 0.82rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
