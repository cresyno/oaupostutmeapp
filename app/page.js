"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// ---------- SVG ICONS (same style as CBT page) ----------
const SubjectIcon = ({ subjectKey }) => {
  const icons = {
    aptitude: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path>
        <circle cx="12" cy="12" r="7"></circle>
      </svg>
    ),
    mathematics: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="6" y1="6" x2="12" y2="6"></line>
        <line x1="9" y1="3" x2="9" y2="9"></line>
        <line x1="14" y1="6" x2="20" y2="6"></line>
        <line x1="5" y1="13" x2="11" y2="19"></line>
        <line x1="11" y1="13" x2="5" y2="19"></line>
        <line x1="14" y1="15" x2="20" y2="15"></line>
        <circle cx="17" cy="11" r="1.2" fill="currentColor" stroke="none"></circle>
        <circle cx="17" cy="19" r="1.2" fill="currentColor" stroke="none"></circle>
      </svg>
    ),
    chemistry: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v6L4 20h16L14 8V2"></path>
        <line x1="8" y1="16" x2="16" y2="16"></line>
      </svg>
    ),
    physics: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"></path>
      </svg>
    ),
    biology: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"></path>
        <path d="M12 12C12 8 9 6 5 6C5 10 8 12 12 12Z"></path>
        <path d="M12 12C12 8 15 6 19 6C19 10 16 12 12 12Z"></path>
      </svg>
    )
  };

  const gradients = {
    aptitude: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
    mathematics: "linear-gradient(135deg, #f59e0b, #b45309)",
    chemistry: "linear-gradient(135deg, #ec4899, #be185d)",
    physics: "linear-gradient(135deg, #ef4444, #b91c1c)",
    biology: "linear-gradient(135deg, #22c55e, #15803d)"
  };

  return (
    <span className={styles.subjectIcon} style={{ background: gradients[subjectKey] || "#333" }}>
      {icons[subjectKey] || null}
    </span>
  );
};

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// ---------- CONSTANTS ----------
const OPTIONAL_KEYS = ["mathematics", "chemistry", "physics", "biology"];
const SUBJECT_LABELS = {
  aptitude: "Aptitude",
  mathematics: "Mathematics",
  chemistry: "Chemistry",
  physics: "Physics",
  biology: "Biology",
};
const TOTAL_QUESTIONS = 40;

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);
  const [studentName, setStudentName] = useState("");

  // Load saved name and subjects on mount
  useEffect(() => {
    const savedName = localStorage.getItem("oau-cbt-name");
    if (savedName) setStudentName(savedName);

    const saved = localStorage.getItem("oau-cbt-subjects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const optional = parsed.filter((s) => OPTIONAL_KEYS.includes(s));
        if (optional.length <= 3) setSelected(optional);
      } catch (_) {}
    }
  }, []);

  const toggleSubject = (key) => {
    setSelected((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= 3) return prev;
      return [...prev, key];
    });
  };

  const isReady = selected.length === 3 && studentName.trim().length > 0;

  const startExam = () => {
    if (!isReady) return;
    const subjects = ["aptitude", ...selected];
    localStorage.setItem("oau-cbt-subjects", JSON.stringify(subjects));
    localStorage.setItem("oau-cbt-name", studentName.trim());
    router.push("/cbt");
  };

  const progress = (selected.length / 3) * 100;
  const circumference = 2 * Math.PI * 40;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header / Logo */}
        <div className={styles.header}>
          <div className={styles.crest}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"></path>
            </svg>
          </div>
          <div>
            <h1 className={styles.title}>OAU POST-UTME CBT</h1>
            <p className={styles.subtitle}>Practice Examination • 2026 Session</p>
          </div>
        </div>

        {/* Name input */}
        <div className={styles.nameInputWrapper}>
          <label className={styles.nameLabel}>Enter Your Name</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g., Adebayo O."
            className={styles.nameInput}
          />
        </div>

        {/* Compulsory subject card */}
        <div className={styles.compulsoryCard}>
          <SubjectIcon subjectKey="aptitude" />
          <div className={styles.compulsoryInfo}>
            <span className={styles.compulsoryLabel}>Aptitude</span>
            <span className={styles.badge}>Compulsory</span>
            <span className={styles.questionCount}>10 questions</span>
          </div>
          <LockIcon />
        </div>

        <p className={styles.instruction}>
          Select <strong>any 3</strong> of the 4 optional subjects:
        </p>

        {/* Optional subjects grid */}
        <div className={styles.grid}>
          {OPTIONAL_KEYS.map((key) => {
            const isSelected = selected.includes(key);
            return (
              <div
                key={key}
                onClick={() => toggleSubject(key)}
                className={`${styles.optionalCard} ${isSelected ? styles.selected : ""}`}
              >
                <SubjectIcon subjectKey={key} />
                <div className={styles.optionalInfo}>
                  <div className={styles.optionalLabel}>
                    {SUBJECT_LABELS[key]}
                  </div>
                  <div className={styles.questionCount}>10 questions</div>
                </div>
                {isSelected && <span className={styles.checkmark}><CheckIcon /></span>}
              </div>
            );
          })}
        </div>

        {/* Progress ring */}
        <div className={styles.progressArea}>
          <div className={styles.progressRing}>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none" stroke="#2563eb" strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className={styles.progressCircle}
              />
              <text x="50" y="56" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1f2937">
                {selected.length}/3
              </text>
            </svg>
          </div>
          <div className={styles.progressText}>
            <span>
              {selected.length === 0
                ? "Select 3 optional subjects"
                : `${selected.length} of 3 optional selected`}
            </span>
            {selected.length === 3 && studentName.trim() !== "" && (
              <span className={styles.readyBadge}>✅ Ready!</span>
            )}
            {studentName.trim() === "" && (
              <span className={styles.nameWarning}>Enter your name to start</span>
            )}
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={startExam}
          disabled={!isReady}
          className={`${styles.startButton} ${isReady ? styles.active : ""}`}
        >
          {isReady ? (
            <>
              <span>Begin {TOTAL_QUESTIONS}-Question CBT</span>
              <span className={styles.arrow}><ArrowIcon /></span>
            </>
          ) : (
            <span>
              {studentName.trim() === ""
                ? "Enter your name first"
                : `Select ${3 - selected.length} more subject${3 - selected.length !== 1 ? "s" : ""}`}
            </span>
          )}
        </button>

        <p className={styles.footer}>
          Aptitude is compulsory. Total: 4 subjects × 10 questions = {TOTAL_QUESTIONS} questions.
        </p>
      </div>
    </div>
  );
  }
