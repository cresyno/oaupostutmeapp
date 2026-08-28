"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// ------------------------------------------------------------------
// SVG Icons (self‑contained, subject‑appropriate)
// ------------------------------------------------------------------
const Icons = {
  aptitude: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
    </svg>
  ),
  mathematics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <text x="3" y="20" fontSize="16" fontWeight="700" fill="currentColor" stroke="none">+</text>
      <text x="14" y="20" fontSize="16" fontWeight="700" fill="currentColor" stroke="none">−</text>
      <text x="3" y="8" fontSize="16" fontWeight="700" fill="currentColor" stroke="none">×</text>
      <text x="14" y="8" fontSize="16" fontWeight="700" fill="currentColor" stroke="none">÷</text>
    </svg>
  ),
  chemistry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v9c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 11c0 1.66 3.13 3 7 3s7-1.34 7-3" />
      <path d="M12 20v-5" />
      <path d="M9 15l3 2 3-2" />
    </svg>
  ),
  physics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="16" x2="21" y2="16" />
      <line x1="7" y1="8" x2="7" y2="20" />
      <line x1="11" y1="8" x2="11" y2="20" />
      <line x1="15" y1="8" x2="15" y2="20" />
      <line x1="19" y1="8" x2="19" y2="20" />
    </svg>
  ),
  biology: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v8" />
      <path d="M8 10l2 2-2 2" />
      <path d="M16 10l-2 2 2 2" />
      <path d="M10 12h4" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

  // Load previously saved selection (if any)
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
      // If already selected, deselect
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }
      // If trying to select more than 3, ignore
      if (prev.length >= 3) {
        return prev;
      }
      // Add the subject
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
  const circumference = 2 * Math.PI * 40;

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
            <span>
              {selectedOptional.length === 0
                ? "Select 3 optional subjects"
                : `${selectedOptional.length} of 3 optional selected`}
            </span>
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
