"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import katex from "katex";
import "katex/dist/katex.min.css";

// Reusable Math Renderer
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

export default function CorrectionPage() {
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [filter, setFilter] = useState("all"); // all | correct | wrong
  const [filteredIndices, setFilteredIndices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Build filtered list when result or filter changes
  useEffect(() => {
    if (!result) return;
    const { questions, answers } = result;
    let indices = questions.map((_, i) => i);

    if (filter === "correct") {
      indices = indices.filter((i) => answers[i] === questions[i].answer);
    } else if (filter === "wrong") {
      indices = indices.filter((i) => answers[i] !== questions[i].answer);
    }

    setFilteredIndices(indices);
    setCurrentIndex(0);
  }, [result, filter]);

  if (!result) {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  const { questions, answers } = result;

  if (filteredIndices.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Review Answers</h1>
          <p className={styles.emptyMessage}>
            {filter === "wrong" ? "🎉 No wrong answers! Perfect score!" : "No questions found for this filter."}
          </p>
          <div className={styles.actions}>
            <button onClick={() => setFilter("all")} className={styles.filterButton}>
              Show All
            </button>
            <button onClick={() => router.push("/results")} className={styles.backButton}>
              ← Back to Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  const actualIndex = filteredIndices[currentIndex];
  const question = questions[actualIndex];
  const userAnswer = answers[actualIndex];
  const correctAnswer = question.answer;
  const isCorrect = userAnswer === correctAnswer;

  const totalFiltered = filteredIndices.length;

  const handleNext = () => {
    if (currentIndex < totalFiltered - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleGoTo = (filteredIdx) => {
    setCurrentIndex(filteredIdx);
  };

  const handleBack = () => {
    router.push("/results");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Review Answers</h1>
            <p className={styles.subtitle}>
              Question {currentIndex + 1} of {totalFiltered} {filter !== "all" && `(${filter === "correct" ? "Correct" : "Wrong"} only)`}
            </p>
          </div>
          <button onClick={handleBack} className={styles.backButton}>
            ← Results
          </button>
        </div>

        {/* Filter Buttons */}
        <div className={styles.filterBar}>
          <button
            className={`${styles.filterButton} ${filter === "all" ? styles.filterActive : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({questions.length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === "correct" ? styles.filterActiveCorrect : ""}`}
            onClick={() => setFilter("correct")}
          >
            ✅ Correct ({questions.filter((_, i) => answers[i] === questions[i].answer).length})
          </button>
          <button
            className={`${styles.filterButton} ${filter === "wrong" ? styles.filterActiveWrong : ""}`}
            onClick={() => setFilter("wrong")}
          >
            ❌ Wrong ({questions.filter((_, i) => answers[i] !== questions[i].answer).length})
          </button>
        </div>

        {/* Question Card */}
        <div className={styles.questionCard}>
          <div className={styles.questionHeader}>
            <span className={styles.questionNumber}>Q{actualIndex + 1}</span>
            <span
              className={`${styles.statusBadge} ${
                isCorrect ? styles.statusCorrect : styles.statusWrong
              }`}
            >
              {isCorrect ? "✅ Correct" : "❌ Wrong"}
            </span>
          </div>

          <div className={styles.questionText}>
            <MathRenderer text={question.question} />
          </div>

          {/* Options */}
          <div className={styles.options}>
            {question.options.map((option, optIndex) => {
              let optionClass = styles.option;
              if (optIndex === correctAnswer) {
                optionClass += " " + styles.optionCorrect;
              } else if (optIndex === userAnswer) {
                optionClass += " " + styles.optionWrong;
              }
              return (
                <div key={optIndex} className={optionClass}>
                  <span className={styles.optionLetter}>
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                  <span>
                    <MathRenderer text={option} />
                  </span>
                  {optIndex === userAnswer && <span className={styles.userAnswerTag}>Your Answer</span>}
                  {optIndex === correctAnswer && <span className={styles.correctAnswerTag}>Correct</span>}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          {question.explanation && (
            <div className={styles.explanation}>
              <strong>💡 Explanation:</strong>
              <MathRenderer text={question.explanation} />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={styles.navButton}
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalFiltered - 1}
            className={styles.navButton}
          >
            Next →
          </button>
        </div>

        {/* Question Palette */}
        <div className={styles.palette}>
          <div className={styles.paletteLabel}>Jump to Question</div>
          <div className={styles.paletteGrid}>
            {filteredIndices.map((qIndex, filteredIdx) => {
              const isCurrent = filteredIdx === currentIndex;
              const isCorrectQ = answers[qIndex] === questions[qIndex].answer;
              return (
                <button
                  key={qIndex}
                  onClick={() => handleGoTo(filteredIdx)}
                  className={`${styles.paletteItem} ${
                    isCurrent ? styles.paletteCurrent : ""
                  } ${
                    isCorrectQ ? styles.paletteCorrect : styles.paletteWrong
                  }`}
                >
                  {qIndex + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
            }
