import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, personalityTypes } from '../data/quizData';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    soulSeeker: 0, pleasureSeeker: 0, connector: 0, wanderer: 0,
    explorer: 0, comfortKeeper: 0, architect: 0, flowWalker: 0
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [cubeIndex, setCubeIndex] = useState(0); // which face of the cube is active
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [history, setHistory] = useState([]);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();
  const cubeRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const totalFaces = currentQuestion.options.length;

  const getPhase = () => {
    if (currentQuestionIndex < 4) return "Phase 1 · Rational Orientation";
    if (currentQuestionIndex < 8) return "Phase 2 · Intuitive Projection";
    return "Phase 3 · Integrative & Situational";
  };

  const navigateCube = (direction) => {
    const newIndex = (cubeIndex + direction + totalFaces) % totalFaces;
    setCubeIndex(newIndex);
  };

  const handleDragStart = (clientX) => {
    setIsDragging(true);
    setDragStartX(clientX);
  };

  const handleDragEnd = (clientX) => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = dragStartX - clientX;
    if (Math.abs(delta) > 50) {
      navigateCube(delta > 0 ? 1 : -1);
    }
  };

  const calculateNewScores = (currentScores, selectedOptionsList, question) => {
    const newScores = { ...currentScores };
    const weight = question.weight || 1.0;
    selectedOptionsList.forEach(option => {
      if (option.impact) {
        Object.keys(option.impact).forEach(side => {
          newScores[side] += option.impact[side] * weight;
        });
      }
    });
    return newScores;
  };

  const commitSelection = (option) => {
    if (transitioning) return;

    if (currentQuestion.multiSelect) {
      const isSelected = selectedOptions.find(o => o.id === option.id);
      if (isSelected) {
        setSelectedOptions(selectedOptions.filter(o => o.id !== option.id));
      } else if (selectedOptions.length < (currentQuestion.maxSelect || 1)) {
        setSelectedOptions([...selectedOptions, option]);
      }
      return;
    }

    setTransitioning(true);
    const newScores = calculateNewScores(scores, [option], currentQuestion);
    const newHistory = [...history, { scores, selectedOptions: [option], cubeIndex }];
    setHistory(newHistory);
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptions([]);
        setCubeIndex(0);
        setTransitioning(false);
      } else {
        finishQuiz(newScores, newHistory);
      }
    }, 400);
  };

  const handleMultiNext = () => {
    if (selectedOptions.length === 0 || transitioning) return;
    setTransitioning(true);
    const newScores = calculateNewScores(scores, selectedOptions, currentQuestion);
    const newHistory = [...history, { scores, selectedOptions, cubeIndex }];
    setHistory(newHistory);
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOptions([]);
        setCubeIndex(0);
        setTransitioning(false);
      } else {
        finishQuiz(newScores, newHistory);
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0 && history.length > 0) {
      const prevStep = history[history.length - 1];
      setScores(prevStep.scores);
      setSelectedOptions(prevStep.selectedOptions);
      setCubeIndex(prevStep.cubeIndex || 0);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setHistory(history.slice(0, -1));
    }
  };

  const finishQuiz = (finalScores, finalHistory) => {
    const getWinner = (sideA, sideB, dimension) => {
      if (finalScores[sideA] > finalScores[sideB]) return sideA;
      if (finalScores[sideB] > finalScores[sideA]) return sideB;
      const tieBreakOrder = [9, 5, 6, 7, 8, 1, 2, 3, 4, 10, 11, 12];
      for (const qId of tieBreakOrder) {
        const step = finalHistory.find((h, idx) => questions[idx].id === qId);
        if (step) {
          if (step.selectedOptions.some(opt => opt.impact && opt.impact[sideA])) return sideA;
          if (step.selectedOptions.some(opt => opt.impact && opt.impact[sideB])) return sideB;
        }
      }
      return sideA;
    };

    const winners = {
      selfExpansion: getWinner('soulSeeker', 'pleasureSeeker', 'selfExpansion'),
      placeResonance: getWinner('connector', 'wanderer', 'placeResonance'),
      openness: getWinner('explorer', 'comfortKeeper', 'openness'),
      structuration: getWinner('architect', 'flowWalker', 'structuration')
    };

    const mapping = {
      'soulSeeker-connector-explorer-architect': 'Soul Pilgrim',
      'soulSeeker-connector-explorer-flowWalker': 'Wandering Poet',
      'soulSeeker-wanderer-comfortKeeper-architect': 'Inner Guardian',
      'soulSeeker-wanderer-explorer-flowWalker': 'Dream Walker',
      'soulSeeker-connector-comfortKeeper-architect': 'Silent Philosopher',
      'soulSeeker-connector-comfortKeeper-flowWalker': 'Mindful Artisan',
      'soulSeeker-wanderer-explorer-architect': 'Insight Scholar',
      'soulSeeker-wanderer-comfortKeeper-flowWalker': 'Spirit Nomad',
      'pleasureSeeker-connector-explorer-flowWalker': 'Festival Mover',
      'pleasureSeeker-connector-explorer-architect': 'Urban Adventurer',
      'pleasureSeeker-connector-comfortKeeper-architect': 'Heritage Keeper',
      'pleasureSeeker-connector-comfortKeeper-flowWalker': 'Serene Bonvivant',
      'pleasureSeeker-wanderer-explorer-architect': 'Solo Observer',
      'pleasureSeeker-wanderer-explorer-flowWalker': 'Gentle Drifter',
      'pleasureSeeker-wanderer-comfortKeeper-flowWalker': 'Calm Drifter',
      'pleasureSeeker-wanderer-comfortKeeper-architect': 'Classic Planner'
    };

    const resultKey = `${winners.selfExpansion}-${winners.placeResonance}-${winners.openness}-${winners.structuration}`;
    const archetype = mapping[resultKey];
    const result = Object.values(personalityTypes).find(type => type.name === archetype) || personalityTypes['high-high-high-high'];
    navigate('/result', { state: { result, scores: finalScores, winners } });
  };

  const currentOption = currentQuestion.options[cubeIndex];
  const isSelected = selectedOptions.find(o => o.id === currentOption?.id);

  // For multi-select: show all options as cube faces you slide through
  // The cube shows one face at a time; left/right arrows + drag to navigate

  return (
    <div className="quiz-container">
      <div className="quiz-progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="quiz-content">
        <div className="quiz-card" key={currentQuestion.id}>
          <div className="quiz-header">
            <div className="header-left">
              {currentQuestionIndex > 0 && (
                <button className="back-button" onClick={handleBack}>
                  <ArrowLeft size={18} /> Back
                </button>
              )}
            </div>
            <div className="header-right">
              <span className="phase-tag">{getPhase()}</span>
              <span className="question-number">{currentQuestionIndex + 1} / {questions.length}</span>
            </div>
          </div>

          <h2 className="question-text">{currentQuestion.text}</h2>
          {currentQuestion.subtext && (
            <p className="question-subtext">{currentQuestion.subtext}</p>
          )}

          {/* Cube slider */}
          <div className="cube-area">
            {/* Dot indicators */}
            <div className="cube-dots">
              {currentQuestion.options.map((_, i) => (
                <button
                  key={i}
                  className={`cube-dot ${i === cubeIndex ? 'active' : ''}`}
                  onClick={() => setCubeIndex(i)}
                  aria-label={`Option ${i + 1}`}
                />
              ))}
            </div>

            {/* Cube track */}
            <div className="cube-track-wrapper">
              {totalFaces > 1 && (
                <button
                  className="cube-nav-btn cube-nav-left"
                  onClick={() => navigateCube(-1)}
                  aria-label="Previous option"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <div
                className="cube-track"
                ref={cubeRef}
                onMouseDown={e => handleDragStart(e.clientX)}
                onMouseUp={e => handleDragEnd(e.clientX)}
                onMouseLeave={e => isDragging && handleDragEnd(e.clientX)}
                onTouchStart={e => handleDragStart(e.touches[0].clientX)}
                onTouchEnd={e => handleDragEnd(e.changedTouches[0].clientX)}
              >
                <div
                  className="cube-slider"
                  style={{ transform: `translateX(calc(-${cubeIndex * 100}%))` }}
                >
                  {currentQuestion.options.map((option, i) => {
                    const sel = selectedOptions.find(o => o.id === option.id);
                    return (
                      <div
                        key={option.id}
                        className={`cube-face ${sel ? 'cube-face-selected' : ''}`}
                        onClick={() => {
                          if (i === cubeIndex) commitSelection(option);
                        }}
                      >
                        <div className="cube-face-inner">
                          <div className="cube-option-label">Option {String.fromCharCode(65 + i)}</div>
                          <p className="cube-option-text">{option.text}</p>
                          {sel && <div className="cube-check-mark">✓</div>}
                          {!currentQuestion.multiSelect && (
                            <div className="cube-select-hint">
                              {i === cubeIndex ? 'Tap to select' : ''}
                            </div>
                          )}
                          {currentQuestion.multiSelect && (
                            <div className="cube-select-hint">
                              {i === cubeIndex ? (sel ? 'Tap to deselect' : 'Tap to select') : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {totalFaces > 1 && (
                <button
                  className="cube-nav-btn cube-nav-right"
                  onClick={() => navigateCube(1)}
                  aria-label="Next option"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Swipe hint */}
            {totalFaces > 1 && (
              <p className="swipe-hint">← Slide to explore all options →</p>
            )}
          </div>

          {/* Multi-select confirm */}
          {currentQuestion.multiSelect && (
            <div className="quiz-actions">
              <button
                className="btn-confirm"
                disabled={selectedOptions.length === 0}
                onClick={handleMultiNext}
              >
                Confirm ({selectedOptions.length}/{currentQuestion.maxSelect || 1} selected)
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .quiz-container {
          min-height: 100vh;
          background: linear-gradient(160deg, #faf8f5 0%, #f0ebe3 100%);
          padding-top: 80px;
          display: flex;
          flex-direction: column;
        }

        .quiz-progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(0,0,0,0.06);
          z-index: 200;
        }

        .progress-fill {
          height: 100%;
          background: var(--color-accent-terracotta);
          transition: width 0.5s ease;
        }

        .quiz-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px 48px;
        }

        .quiz-card {
          background: #fff;
          width: 100%;
          max-width: 680px;
          padding: 48px 40px 40px;
          border-radius: 20px;
          box-shadow: 0 8px 48px rgba(0,0,0,0.08);
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 36px;
        }

        .header-left { display: flex; align-items: center; min-width: 80px; }
        .header-right { display: flex; align-items: center; gap: 14px; }

        .back-button {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          padding: 6px 0;
          transition: color 0.2s;
        }
        .back-button:hover { color: var(--color-accent-terracotta); }

        .phase-tag {
          background: var(--color-accent-teal);
          color: #fff;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .question-number {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          letter-spacing: 0.08em;
        }

        .question-text {
          font-size: 1.7rem;
          color: var(--color-text-primary);
          margin-bottom: 10px;
          line-height: 1.3;
          text-align: center;
        }

        .question-subtext {
          font-size: 1rem;
          color: var(--color-text-secondary);
          margin-bottom: 28px;
          font-style: italic;
          text-align: center;
        }

        /* ── Cube Area ── */
        .cube-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
        }

        .cube-dots {
          display: flex;
          gap: 8px;
        }

        .cube-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.15);
          cursor: pointer;
          padding: 0;
          transition: background 0.25s, transform 0.25s;
        }
        .cube-dot.active {
          background: var(--color-accent-terracotta);
          transform: scale(1.35);
        }

        .cube-track-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .cube-nav-btn {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(74,59,50,0.12);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--color-text-primary);
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .cube-nav-btn:hover {
          border-color: var(--color-accent-terracotta);
          color: var(--color-accent-terracotta);
          box-shadow: 0 4px 16px rgba(192,108,84,0.15);
        }

        .cube-track {
          flex: 1;
          overflow: hidden;
          border-radius: 16px;
          cursor: grab;
          user-select: none;
        }
        .cube-track:active { cursor: grabbing; }

        .cube-slider {
          display: flex;
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cube-face {
          flex: 0 0 100%;
          min-height: 200px;
          background: linear-gradient(135deg, #f9f6f2 0%, #f2ece3 100%);
          border: 2.5px solid rgba(74,59,50,0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 28px;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
          box-sizing: border-box;
        }

        .cube-face:hover {
          border-color: var(--color-accent-terracotta);
          background: linear-gradient(135deg, #fdf8f5 0%, #f9ede8 100%);
          box-shadow: 0 8px 32px rgba(192,108,84,0.12);
        }

        .cube-face-selected {
          border-color: var(--color-accent-terracotta) !important;
          background: linear-gradient(135deg, #fdf1ec 0%, #f9e0d8 100%) !important;
          box-shadow: 0 8px 32px rgba(192,108,84,0.18) !important;
        }

        .cube-face-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          width: 100%;
        }

        .cube-option-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-accent-terracotta);
          opacity: 0.8;
        }

        .cube-option-text {
          font-size: 1.15rem;
          color: var(--color-text-primary);
          line-height: 1.55;
          margin: 0;
          font-family: var(--font-body);
        }

        .cube-check-mark {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--color-accent-terracotta);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 700;
        }

        .cube-select-hint {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          min-height: 18px;
          font-style: italic;
        }

        .swipe-hint {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          opacity: 0.6;
          margin: 0;
          letter-spacing: 0.04em;
        }

        .quiz-actions {
          margin-top: 32px;
          display: flex;
          justify-content: center;
        }

        .btn-confirm {
          background: var(--color-accent-terracotta);
          color: #fff;
          border: none;
          padding: 14px 36px;
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 600;
          font-family: var(--font-body);
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 4px 16px rgba(192,108,84,0.25);
        }

        .btn-confirm:hover:not(:disabled) {
          background: #b05840;
          box-shadow: 0 6px 24px rgba(192,108,84,0.35);
          transform: translateY(-1px);
        }

        .btn-confirm:disabled {
          background: #ccc;
          box-shadow: none;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 600px) {
          .quiz-card { padding: 32px 20px 28px; }
          .question-text { font-size: 1.4rem; }
          .cube-face { min-height: 160px; padding: 24px 20px; }
          .cube-option-text { font-size: 1rem; }
          .cube-nav-btn { width: 36px; height: 36px; }
        }
      `}</style>
    </div>
  );
};

export default Quiz;
