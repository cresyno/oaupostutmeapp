"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("oau-cbt-result");
    if (!saved) {
      router.push("/");
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      setResult(parsed);
    } catch (_) {
      router.push("/");
    }
  }, [router]);

  if (!result) {
    return (
      <div className={styles.loading}>
        <p>Loading your results...</p>
      </div>
    );
  }

  const { correct, total, answers, questions } = result;
  const percentage = Math.round((correct / total) * 100);
  const incorrect = total - correct;
  const attempted = Object.keys(answers).length;

  const handleRetake = () => {
    localStorage.removeItem("oau-cbt-result");
    localStorage.removeItem("oau-cbt-subjects");
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>📊 Your Results</h1>
          <p className={styles.subtitle}>OAU POST-UTME CBT • Practice Examination</p>
        </div>

        <div className={styles.scoreCard}>
          <div className={styles.scoreCircle}>
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={percentage >= 70 ? "#22c55e" : percentage >= 50 ? "#eab308" : "#ef4444"}
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 50}
                strokeDashoffset={2 * Math.PI * 50 * (1 - percentage / 100)}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                className={styles.scoreCircleProgress}
              />
              <text x="60" y="68" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1f2937">
                {percentage}%
              </text>
            </svg>
          </div>
          <div className={styles.scoreDetails}>
            <div className={styles.scoreBig}>
              {correct} / {total}
            </div>
            <div className={styles.scoreStats}>
              <span className={styles.scoreCorrect}>✅ {correct} Correct</span>
              <span className={styles.scoreIncorrect}>❌ {incorrect} Incorrect</span>
              <span className={styles.scoreAttempted}>📝 {attempted} Attempted</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={handleRetake} className={styles.retakeButton}>
            🔄 Retake Exam
          </button>
          <button onClick={() => router.push("/")} className={styles.homeButton}>
            🏠 Home
          </button>
        </div>

        <div className={styles.footer}>
          <p>Review your answers below to improve your score.</p>
        </div>
      </div>
    </div>
  );
    }
