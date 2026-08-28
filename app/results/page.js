"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import katex from "katex";
import "katex/dist/katex.min.css";

// Reusable Math Renderer (so math doesn't crash on results page too)
function MathRenderer({ text }) {
  if (!text) return null;
  const parts = text.split(/(\$[^$]+\$|\\\([^)]+\\\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const isMath =
          (part.startsWith("$") && part.endsWith("$")) ||
          (part.startsWith("\\(") && part.endsWith("\\)"));
        if (isMath) {
          try {
            let mathString = part;
            if (part.startsWith("$") && part.endsWith("$")) {
              mathString = part.slice(1, -1);
            } else if (part.startsWith("\\(") && part.endsWith("\\)")) {
              mathString = part.slice(2, -2);
            }
            const html = katex.renderToString(mathString, {
              throwOnError: false,
              displayMode: false,
            });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <span key={index}>{part}</span>;
          }
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </>
  );
}

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
          <div className={styles.scoreBig}>
            {correct} / {total}
          </div>
          <div className={styles.scoreStats}>
            <span className={styles.scoreCorrect}>✅ {correct} Correct</span>
            <span className={styles.scoreIncorrect}>❌ {incorrect} Incorrect</span>
            <span className={styles.scoreAttempted}>📝 {attempted} Attempted</span>
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

        {/* -------- New Answer Review Section -------- */}
        <div className={styles.reviewSection}>
          <h2>Detailed Answer Review</h2>
          {questions.map((q, index) => {
            const userAnswer = answers[index];
            const correctAnswer = q.answer;
            const isCorrect = userAnswer === correctAnswer;

            return (
              <div
                key={index}
                className={styles.reviewCard}
                style={{
                  borderLeft: isCorrect ? "5px solid #22c55e" : "5px solid #ef4444"
                }}
              >
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewNumber}>Q{index + 1}</span>
                  <span className={isCorrect ? styles.reviewCorrect : styles.reviewIncorrect}>
                    {isCorrect ? "Correct" : "Wrong"}
                  </span>
                </div>

                <div className={styles.reviewQuestion}>
                  <MathRenderer text={q.question} />
                </div>

                <div className={styles.reviewOptions}>
                  {q.options.map((opt, optIndex) => {
                    let optionClass = styles.reviewOption;
                    if (optIndex === correctAnswer) {
                      optionClass += " " + styles.reviewOptionCorrect;
                    } else if (optIndex === userAnswer) {
                      optionClass += " " + styles.reviewOptionWrong;
                    }
                    return (
                      <div key={optIndex} className={optionClass}>
                        <span>{String.fromCharCode(65 + optIndex)}. </span>
                        <MathRenderer text={opt} />
                        {optIndex === userAnswer && <span> (Your Answer)</span>}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className={styles.reviewExplanation}>
                    <strong>Explanation:</strong> <MathRenderer text={q.explanation} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
      }
