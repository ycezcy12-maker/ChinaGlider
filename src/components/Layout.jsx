import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="main-header">
        <div className="container header-content">
          <Link to="/" className="logo">
            <Compass size={28} color="var(--color-accent-terracotta)" />
            <span className="logo-text">ChinaGlider</span>
          </Link>
          <nav className="nav-links">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/quiz" className="nav-item">Travel MBTI</Link>
            <Link to="/poi-selection" className="nav-item">Personalized Spots</Link>
            <Link to="/trip-basics" className="nav-item">Smart Itinerary</Link>
            <Link to="/starter-pack" className="nav-item">Starter Pack</Link>
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
          position: absolute;
          width: 100%;
          top: 0;
          z-index: 10;
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
          font-size: 1rem;
          position: relative;
        }

        .nav-item:hover {
          color: var(--color-accent-terracotta);
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
      `}</style>
    </div>
  );
};

export default Layout;
