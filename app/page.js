"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

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

  useEffect(() => {
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
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }
      if (prev.length >= 3) return prev;
      return [...prev, key];
    });
  };

  const isReady = selected.length === 3;

  const startExam = () => {
    if (!isReady) return;
    const subjects = ["aptitude", ...selected];
    localStorage.setItem("oau-cbt-subjects", JSON.stringify(subjects));
    router.push("/cbt");
  };

  const progress = (selected.length / 3) * 100;
  const circumference = 2 * Math.PI * 40;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.crest}>🏛️</span>
          <div>
            <h1 className={styles.title}>OAU POST-UTME CBT</h1>
            <p className={styles.subtitle}>Practice Examination • 2026 Session</p>
          </div>
        </div>

        <div className={styles.compulsoryCard}>
          <span className={styles.compulsoryIcon}>🧠</span>
          <div className={styles.compulsoryInfo}>
            <span className={styles.compulsoryLabel}>Aptitude</span>
            <span className={styles.badge}>Compulsory</span>
            <span className={styles.questionCount}>10 questions</span>
          </div>
          <span className={styles.lockIcon}>🔒</span>
        </div>

        <p className={styles.instruction}>
          Select <strong>any 3</strong> of the 4 optional subjects:
        </p>

        <div className={styles.grid}>
          {OPTIONAL_KEYS.map((key) => {
            const isSelected = selected.includes(key);
            const icons = {
              mathematics: "📐",
              chemistry: "🧪",
              physics: "⚡",
              biology: "🌿",
            };
            return (
              <div
                key={key}
                onClick={() => toggleSubject(key)}
                className={`${styles.optionalCard} ${
                  isSelected ? styles.selected : ""
                }`}
              >
                <span className={styles.optionalIcon}>{icons[key]}</span>
                <div className={styles.optionalInfo}>
                  <div className={styles.optionalLabel}>
                    {SUBJECT_LABELS[key]}
                  </div>
                  <div className={styles.questionCount}>10 questions</div>
                </div>
                {isSelected && <span className={styles.checkmark}>✓</span>}
              </div>
            );
          })}
        </div>

        <div className={styles.progressArea}>
          <div className={styles.progressRing}>
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#2563eb"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={
                  circumference - (progress / 100) * circumference
                }
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className={styles.progressCircle}
              />
              <text
                x="50"
                y="56"
                textAnchor="middle"
                fontSize="20"
                fontWeight="bold"
                fill="#1f2937"
              >
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
            {isReady && <span className={styles.readyBadge}>✅ Ready!</span>}
          </div>
        </div>

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
            `Select ${3 - selected.length} more subject${
              3 - selected.length !== 1 ? "s" : ""
            }`
          )}
        </button>

        <p className={styles.footer}>
          Aptitude is compulsory. Total: 4 subjects × 10 questions ={" "}
          {TOTAL_QUESTIONS} questions.
        </p>
      </div>
    </div>
  );
                  }
