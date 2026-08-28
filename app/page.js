"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// ------------------------------------------------------------------
// SVG Icons (self‑contained)
// ------------------------------------------------------------------
const Icons = {
  aptitude: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  mathematics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" />
      <path d="M9 6v12M15 6v12" />
    </svg>
  ),
  chemistry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v10c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  ),
  physics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.06.07a1.65 1.65 0 0 0 2.36 0l.06-.07a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78" />
    </svg>
  ),
  biology: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

const OPTIONAL_SUBJECTS = [
  { key: "mathematics", label: "Mathematics", icon: Icons.mathematics },
  { key: "chemistry", label: "Chemistry", icon: Icons.chemistry },
  { key: "physics", label: "Physics", icon: Icons.physics },
  { key: "biology", label: "Biology", icon: Icons.biology },
];

const TOTAL_QUESTIONS = 40;

export default function Home() {
  const router = useRouter();
  const [selectedOptional, setSelectedOptional] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("oau-cbt-subjects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const optional = parsed.filter((s) =>
          OPTIONAL_SUBJECTS.some((sub) => sub.key === s.toLowerCase())
        );
        if (optional.length <= 3) setSelectedOptional(optional);
      } catch (_) {}
    }
  }, []);

  const isReady = selectedOptional.length === 3;

  const toggleSubject = (key) => {
    setSelectedOptional((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }
      if (prev.length >= 3) return prev; // prevent >3
      return [...prev, key];
    });
  };

  const startExam = () => {
    if (!isReady) return;
    const subjects = ["aptitude", ...selectedOptional];
    localStorage.setItem("oau-cbt-subjects", JSON.stringify(subjects));
    router.push("/cbt");
  };

  // Circular progress (SVG ring)
  const progress = (selectedOptional.length / 3) * 100;
  const circumference = 2 * Math.PI * 40; // r=40

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header with OAU crest */}
        <div className={styles.header}>
          <div className={styles.crest}>
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" fill="#1a3a7a" stroke="#d4af37" strokeWidth="3" />
              <text x="50" y="55" textAnchor="middle" fill="#d4af37" fontSize="24" fontFamily="serif" fontWeight="bold">OAU</text>
            </svg>
          </div>
          <div className={styles.headerText}>
            <h1 className={styles.title}>OAU POST-UTME CBT</h1>
            <p className={styles.subtitle}>Practice Examination • 2026 Session</p>
          </div>
        </div>

        {/* Compulsory Subject */}
        <div className={styles.compulsoryCard}>
          <div className={styles.compulsoryIcon}>{Icons.aptitude}</div>
          <div className={styles.compulsoryInfo}>
            <span className={styles.compulsoryLabel}>Aptitude</span>
            <span className={styles.badge}>Compulsory</span>
            <span className={styles.questionCount}>10 questions</span>
          </div>
          <div className={styles.lockIcon}>{Icons.lock}</div>
        </div>

        {/* Instruction */}
        <p className={styles.instruction}>
          Select <strong>any 3</strong> of the 4 optional subjects:
        </p>

        {/* Optional Subjects Grid */}
        <div className={styles.grid}>
          {OPTIONAL_SUBJECTS.map(({ key, label, icon }) => {
            const isSelected = selectedOptional.includes(key);
            return (
              <div
                key={key}
                onClick={() => toggleSubject(key)}
                className={`${styles.optionalCard} ${
                  isSelected ? styles.selected : ""
                }`}
              >
                <div className={styles.optionalIcon}>{icon}</div>
                <div className={styles.optionalInfo}>
                  <div className={styles.optionalLabel}>{label}</div>
                  <div className={styles.questionCount}>10 questions</div>
                </div>
                {isSelected && (
                  <div className={styles.checkmark}>{Icons.check}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress with Circular SVG */}
        <div className={styles.progressArea}>
          <div className={styles.progressRing}>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#2563eb"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className={styles.progressCircle}
              />
              <text x="50" y="56" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1f2937">
                {selectedOptional.length}/3
              </text>
            </svg>
          </div>
          <div className={styles.progressText}>
            <span>{selectedOptional.length} of 3 optional selected</span>
            {isReady && <span className={styles.readyBadge}>✅ Ready!</span>}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={startExam}
          disabled={!isReady}
          className={`${styles.startButton} ${isReady ? styles.active : ""}`}
        >
          {isReady ? (
            <>
              <span>Begin {TOTAL_QUESTIONS}-Question CBT</span>
              <span className={styles.arrow}>→</span>
            </>
          ) : (
            `Select ${3 - selectedOptional.length} more optional subject${
              3 - selectedOptional.length !== 1 ? "s" : ""
            }`
          )}
        </button>

        {/* Footer */}
        <p className={styles.footer}>
          Aptitude is compulsory. Total: 4 subjects × 10 questions = {TOTAL_QUESTIONS} questions.
        </p>
      </div>
    </div>
  );
    }
