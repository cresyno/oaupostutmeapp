"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const OPTIONAL_SUBJECTS = [
  { key: "mathematics", label: "Mathematics" },
  { key: "chemistry", label: "Chemistry" },
  { key: "physics", label: "Physics" },
  { key: "biology", label: "Biology" },
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
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      if (prev.length >= 3) return prev;
      return [...prev, key];
    });
  };

  const startExam = () => {
    if (!isReady) return;
    const subjects = ["aptitude", ...selectedOptional];
    localStorage.setItem("oau-cbt-subjects", JSON.stringify(subjects));
    router.push("/cbt");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.icon}>🏛️</span> OAU POST-UTME CBT
          </h1>
          <p className={styles.subtitle}>Practice Examination</p>
        </div>

        <div className={styles.compulsoryCard}>
          <div>
            <div className={styles.compulsoryLabel}>
              Aptitude
              <span className={styles.badge}>Compulsory</span>
            </div>
            <div className={styles.questionCount}>10 questions</div>
          </div>
          <div className={styles.lockIcon}>🔒</div>
        </div>

        <p className={styles.instruction}>
          Select <strong>any 3</strong> of the 4 optional subjects:
        </p>

        <div className={styles.grid}>
          {OPTIONAL_SUBJECTS.map(({ key, label }) => {
            const isSelected = selectedOptional.includes(key);
            const isDisabled = selectedOptional.length >= 3 && !isSelected;
            return (
              <div
                key={key}
                onClick={() => toggleSubject(key)}
                className={`${styles.optionalCard} ${
                  isSelected ? styles.selected : ""
                } ${isDisabled ? styles.disabled : ""}`}
              >
                <div>
                  <div className={styles.optionalLabel}>{label}</div>
                  <div className={styles.questionCount}>10 questions</div>
                </div>
                {isSelected && <span className={styles.checkmark}>✓</span>}
              </div>
            );
          })}
        </div>

        <div className={styles.progressArea}>
          <div className={styles.progressText}>
            <span>Progress</span>
            <span>{selectedOptional.length} of 3 optional selected</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(selectedOptional.length / 3) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={startExam}
          disabled={!isReady}
          className={`${styles.startButton} ${isReady ? styles.active : ""}`}
        >
          {isReady
            ? `Start ${TOTAL_QUESTIONS}-Question CBT`
            : `Select ${3 - selectedOptional.length} more optional subject${
                3 - selectedOptional.length !== 1 ? "s" : ""
              }`}
        </button>

        <p className={styles.footer}>
          Aptitude is compulsory. Total: 4 subjects × 10 questions ={" "}
          {TOTAL_QUESTIONS} questions.
        </p>
      </div>
    </div>
  );
                  }
