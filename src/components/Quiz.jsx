import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, personalityTypes, positionMultipliers, positionSides, positionLabels } from '../data/quizData';
import { ArrowLeft } from 'lucide-react';

// Cube positions: 0=Strongly Left, 1=Lean Left, 2=Lean Right, 3=Strongly Right
const POSITIONS = 4;
const POSITION_LABELS = ['Strongly Left', 'Lean Left', 'Lean Right', 'Strongly Right'];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({
    soulSeeker: 0, pleasureSeeker: 0, connector: 0, wanderer: 0,
    explorer: 0, comfortKeeper: 0, architect: 0, flowWalker: 0
  });
  // cubePos[questionIndex] = 0..3 or null (unselected)
  const [cubePositions, setCubePositions] = useState(Array(questions.length).fill(null));
  const [history, setHistory] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  // Drag state
  const trackRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startPos: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentPos = cubePositions[currentIndex]; // null or 0..3
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const getPhaseLabel = () => {
    if (currentIndex < 4) return 'Phase 1 · Rational Orientation';
    if (currentIndex < 8) return 'Phase 2 · Intuitive Projection';
    return 'Phase 3 · Integrative & Situational';
  };

  const setCubePosForCurrent = (pos) => {
    const next = [...cubePositions];
    next[currentIndex] = pos;
    setCubePositions(next);
  };

  // ── Pointer / touch drag handling ──────────────────────────────────────────
  const CUBE_WIDTH = () => trackRef.current ? trackRef.current.clientWidth / POSITIONS : 80;

  const onPointerDown = (e) => {
    if (!trackRef.current) return;
    dragRef.current = {
      active: true,
      startX: e.clientX ?? e.touches?.[0]?.clientX,
      startPos: currentPos ?? 1  // default start position if none selected
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const delta = x - dragRef.current.startX;
    setDragOffset(delta);

    // Determine position from drag
    const trackW = trackRef.current?.clientWidth || 320;
    const segW = trackW / POSITIONS;
    const rawPos = dragRef.current.startPos + delta / segW;
    const clampedPos = Math.max(0, Math.min(POSITIONS - 1, Math.round(rawPos)));
    setCubePosForCurrent(clampedPos);
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
    setIsDragging(false);
    setDragOffset(0);
  };

  // ── Dot click ───────────────────────────────────────────────────────────────
  const selectPosition = (pos) => {
    setCubePosForCurrent(pos);
  };

  // ── Confirm & advance ───────────────────────────────────────────────────────
  const handleConfirm = () => {
    if (currentPos === null) return;

    const side = positionSides[currentPos]; // 'left' or 'right'
    const multiplier = positionMultipliers[currentPos];
    const weight = currentQuestion.weight || 1.0;
    const impact = side === 'left' ? currentQuestion.leftImpact : currentQuestion.rightImpact;

    const newScores = { ...scores };
    Object.keys(impact).forEach(k => {
      newScores[k] = (newScores[k] || 0) + impact[k] * multiplier * weight;
    });

    const newHistory = [...history, { scores, cubePositions: [...cubePositions] }];
    setHistory(newHistory);
    setScores(newScores);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz(newScores);
    }
  };

  // ── Back ────────────────────────────────────────────────────────────────────
  const handleBack = () => {
    if (currentIndex === 0 || history.length === 0) return;
    const prev = history[history.length - 1];
    setScores(prev.scores);
    setCubePositions(prev.cubePositions);
    setHistory(history.slice(0, -1));
    setCurrentIndex(currentIndex - 1);
  };

  // ── Finish ──────────────────────────────────────────────────────────────────
  const finishQuiz = (finalScores) => {
    const getWinner = (sideA, sideB) => {
      if (finalScores[sideA] > finalScores[sideB]) return sideA;
      if (finalScores[sideB] > finalScores[sideA]) return sideB;
      return sideA;
    };
    const winners = {
      selfExpansion: getWinner('soulSeeker', 'pleasureSeeker'),
      placeResonance: getWinner('connector', 'wanderer'),
      openness: getWinner('explorer', 'comfortKeeper'),
      structuration: getWinner('architect', 'flowWalker')
    };
    const mapping = {
      'soulSeeker-connector-explorer-architect': 'high-high-high-high',
      'soulSeeker-connector-explorer-flowWalker': 'high-high-high-low',
      'soulSeeker-wanderer-comfortKeeper-architect': 'high-low-low-high',
      'soulSeeker-wanderer-explorer-flowWalker': 'high-low-high-low',
      'soulSeeker-connector-comfortKeeper-architect': 'high-high-low-high',
      'soulSeeker-connector-comfortKeeper-flowWalker': 'high-high-low-low',
      'soulSeeker-wanderer-explorer-architect': 'high-low-high-high',
      'soulSeeker-wanderer-comfortKeeper-flowWalker': 'high-low-low-low',
      'pleasureSeeker-connector-explorer-flowWalker': 'low-high-high-low',
      'pleasureSeeker-connector-explorer-architect': 'low-high-high-high',
      'pleasureSeeker-connector-comfortKeeper-architect': 'low-high-low-high',
      'pleasureSeeker-connector-comfortKeeper-flowWalker': 'low-high-low-low',
      'pleasureSeeker-wanderer-explorer-architect': 'low-low-high-high',
      'pleasureSeeker-wanderer-explorer-flowWalker': 'low-low-high-low',
      'pleasureSeeker-wanderer-comfortKeeper-flowWalker': 'low-low-low-low',
      'pleasureSeeker-wanderer-comfortKeeper-architect': 'low-low-low-high'
    };
    const key = `${winners.selfExpansion}-${winners.placeResonance}-${winners.openness}-${winners.structuration}`;
    const typeKey = mapping[key] || 'high-high-high-high';
    const result = personalityTypes[typeKey];
    navigate('/result', { state: { result, scores: finalScores, winners } });
  };

  // Position of the cube handle on the track (0..3 mapped to %)
  const handlePct = currentPos !== null ? (currentPos / (POSITIONS - 1)) * 100 : null;

  return (
    <div className="quiz-wrap">
      {/* Top progress bar */}
      <div className="top-bar">
        <div className="top-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz-stage">
        <div className="quiz-card">
          {/* Header */}
          <div className="qc-header">
            <button
              className="btn-back"
              onClick={handleBack}
              style={{ visibility: currentIndex > 0 ? 'visible' : 'hidden' }}
            >
              <ArrowLeft size={17} /> Back
            </button>
            <div className="qc-meta">
              <span className="phase-badge">{getPhaseLabel()}</span>
              <span className="q-counter">{currentIndex + 1} / {questions.length}</span>
            </div>
          </div>

          {/* Question */}
          <h2 className="q-text">{currentQuestion.text}</h2>

          {/* Spectrum cube slider */}
          <div className="spectrum-wrap">
            {/* Pole labels */}
            <div className="poles">
              <span className="pole pole-left">{currentQuestion.leftLabel}</span>
              <span className="pole pole-right">{currentQuestion.rightLabel}</span>
            </div>

            {/* Track + cube */}
            <div
              className="cube-track"
              ref={trackRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              {/* Track line */}
              <div className="track-line" />

              {/* Fill line up to cube position */}
              {handlePct !== null && (
                <div
                  className="track-fill"
                  style={{ width: `${handlePct}%` }}
                />
              )}

              {/* 4 snap points */}
              {[0, 1, 2, 3].map(pos => (
                <div
                  key={pos}
                  className={`snap-dot ${currentPos === pos ? 'snap-active' : ''}`}
                  style={{ left: `${(pos / (POSITIONS - 1)) * 100}%` }}
                  onPointerDown={e => { e.stopPropagation(); selectPosition(pos); }}
                />
              ))}

              {/* Sliding cube handle */}
              <div
                className={`cube-handle ${currentPos !== null ? 'cube-placed' : ''} ${isDragging ? 'cube-dragging' : ''}`}
                style={{
                  left: handlePct !== null ? `${handlePct}%` : '50%',
                  opacity: handlePct !== null ? 1 : 0,
                  pointerEvents: handlePct !== null ? 'auto' : 'none'
                }}
              >
                <div className="cube-face-front">
                  {currentPos !== null ? POSITION_LABELS[currentPos] : ''}
                </div>
              </div>
            </div>

            {/* 4 click-target labels below */}
            <div className="position-labels">
              {POSITION_LABELS.map((label, pos) => (
                <button
                  key={pos}
                  className={`pos-label ${currentPos === pos ? 'pos-label-active' : ''}`}
                  onClick={() => selectPosition(pos)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Selection hint */}
            <p className="spectrum-hint">
              {currentPos !== null
                ? `You chose: ${POSITION_LABELS[currentPos]}`
                : 'Drag the slider or click a position to choose'}
            </p>
          </div>

          {/* Confirm button */}
          <div className="qc-footer">
            <button
              className="btn-confirm"
              disabled={currentPos === null}
              onClick={handleConfirm}
            >
              {currentIndex < questions.length - 1 ? 'Next Question' : 'See My Result'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .quiz-wrap {
          min-height: 100vh;
          background: linear-gradient(150deg, #faf8f4 0%, #ede8e0 100%);
          padding-top: 72px;
          display: flex;
          flex-direction: column;
        }

        /* Progress bar */
        .top-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: rgba(0,0,0,0.07);
          z-index: 300;
        }
        .top-bar-fill {
          height: 100%;
          background: var(--color-accent-terracotta);
          transition: width 0.45s ease;
        }

        /* Stage */
        .quiz-stage {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px 56px;
        }

        /* Card */
        .quiz-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 48px rgba(0,0,0,0.09);
          width: 100%;
          max-width: 720px;
          padding: 48px 48px 40px;
        }

        /* Header */
        .qc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .btn-back {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: 0.88rem;
          cursor: pointer;
          padding: 6px 0;
          transition: color 0.2s;
        }
        .btn-back:hover { color: var(--color-accent-terracotta); }

        .qc-meta {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .phase-badge {
          background: var(--color-accent-teal);
          color: #fff;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .q-counter {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          letter-spacing: 0.06em;
        }

        /* Question text */
        .q-text {
          font-size: 1.65rem;
          color: var(--color-text-primary);
          line-height: 1.35;
          margin-bottom: 48px;
          text-align: center;
        }

        /* ── Spectrum ── */
        .spectrum-wrap {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Pole labels */
        .poles {
          display: flex;
          justify-content: space-between;
          gap: 24px;
        }

        .pole {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.45;
          max-width: 42%;
        }

        .pole-left { text-align: left; }
        .pole-right { text-align: right; }

        /* Track */
        .cube-track {
          position: relative;
          height: 72px;
          cursor: grab;
          user-select: none;
          touch-action: none;
        }
        .cube-track:active { cursor: grabbing; }

        .track-line {
          position: absolute;
          top: 50%;
          left: 0; right: 0;
          height: 4px;
          background: rgba(0,0,0,0.08);
          border-radius: 2px;
          transform: translateY(-50%);
        }

        .track-fill {
          position: absolute;
          top: 50%;
          left: 0;
          height: 4px;
          background: var(--color-accent-terracotta);
          border-radius: 2px;
          transform: translateY(-50%);
          transition: width 0.18s ease;
          pointer-events: none;
        }

        /* Snap dots */
        .snap-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(0,0,0,0.12);
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          z-index: 1;
        }
        .snap-dot.snap-active {
          background: var(--color-accent-terracotta);
          transform: translate(-50%, -50%) scale(1.3);
        }

        /* Cube handle */
        .cube-handle {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: left 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s;
        }
        .cube-handle.cube-dragging {
          transition: opacity 0.2s;
        }

        .cube-face-front {
          width: 100%;
          height: 100%;
          background: var(--color-accent-terracotta);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          text-align: center;
          padding: 4px 6px;
          box-shadow:
            0 4px 16px rgba(192,108,84,0.35),
            inset 0 1px 0 rgba(255,255,255,0.2),
            inset 0 -2px 0 rgba(0,0,0,0.12);
          user-select: none;
          transition: background 0.2s;
          line-height: 1.2;
        }

        .cube-handle:not(.cube-placed) .cube-face-front {
          background: rgba(0,0,0,0.15);
          box-shadow: none;
        }

        /* Position labels below track */
        .position-labels {
          display: flex;
          justify-content: space-between;
          margin-top: -12px;
        }

        .pos-label {
          flex: 1;
          text-align: center;
          font-size: 0.73rem;
          color: var(--color-text-secondary);
          background: none;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 6px;
          padding: 6px 4px;
          cursor: pointer;
          margin: 0 3px;
          transition: all 0.18s;
          font-family: var(--font-body);
          line-height: 1.2;
        }
        .pos-label:first-child { margin-left: 0; }
        .pos-label:last-child { margin-right: 0; }

        .pos-label:hover {
          border-color: var(--color-accent-terracotta);
          color: var(--color-accent-terracotta);
          background: rgba(192,108,84,0.04);
        }

        .pos-label-active {
          border-color: var(--color-accent-terracotta) !important;
          color: var(--color-accent-terracotta) !important;
          background: rgba(192,108,84,0.08) !important;
          font-weight: 700;
        }

        /* Hint */
        .spectrum-hint {
          text-align: center;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          font-style: italic;
          min-height: 20px;
          margin: 0;
        }

        /* Footer */
        .qc-footer {
          margin-top: 40px;
          display: flex;
          justify-content: center;
        }

        .btn-confirm {
          background: var(--color-accent-terracotta);
          color: #fff;
          border: none;
          padding: 15px 48px;
          border-radius: 40px;
          font-size: 1rem;
          font-weight: 700;
          font-family: var(--font-body);
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 4px 18px rgba(192,108,84,0.28);
          letter-spacing: 0.02em;
        }
        .btn-confirm:hover:not(:disabled) {
          background: #b05840;
          box-shadow: 0 6px 24px rgba(192,108,84,0.38);
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
          .q-text { font-size: 1.3rem; margin-bottom: 36px; }
          .pole { font-size: 0.8rem; max-width: 44%; }
          .cube-handle { width: 68px; height: 42px; }
          .cube-face-front { font-size: 0.6rem; border-radius: 8px; }
          .pos-label { font-size: 0.65rem; padding: 5px 2px; }
        }
      `}</style>
    </div>
  );
};

export default Quiz;
