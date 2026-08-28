"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// Imports for LaTeX rendering
import Latex from "react-katex";
import "katex/dist/katex.min.css";

// Import question data
import { aptitudeQuestions } from "../../data/questions/aptitude";
import { mathematicsQuestions } from "../../data/questions/mathematics";
import { chemistryQuestions } from "../../data/questions/chemistry";
import { physicsQuestions } from "../../data/questions/physics";
import { biologyQuestions } from "../../data/questions/biology";

const SUBJECT_DATA = {
  aptitude: {
    label: "Aptitude",
    questions: aptitudeQuestions || [],
    icon: "🧠",
  },
  mathematics: {
    label: "Mathematics",
    questions: mathematicsQuestions || [],
    icon: "📐",
  },
  chemistry: {
    label: "Chemistry",
    questions: chemistryQuestions || [],
    icon: "🧪",
  },
  physics: {
    label: "Physics",
    questions: physicsQuestions || [],
    icon: "⚡",
  },
  biology: {
    label: "Biology",
    questions: biologyQuestions || [],
    icon: "🌿",
  },
};

const QUESTIONS_PER_SUBJECT = 10;

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- SAFE MATH RENDERER (FIXED) ----------
function MathRenderer({ text }) {
  if (!text) return null;

  // Split text into plain text and LaTeX segments
  const parts = text.split(/(\$[^$]+\$|\\\([^)]+\\\))/g);

  return (
    <>
      {parts.map((part, index) => {
        // If it's a math block (e.g., $x^2$ or \(x^2\))
        if (
          (part.startsWith("$") && part.endsWith("$")) ||
          (part.startsWith("\\(") && part.endsWith("\\)"))
        ) {
          try {
            return <Latex key={index}>{part}</Latex>;
          } catch (error) {
            console.warn("KaTeX failed, showing raw:", part);
            return <span key={index}>{part}</span>;
          }
        } else {
          // Plain text – render as is
          return <span key={index}>{part}</span>;
        }
      })}
    </>
  );
}
// ------------------------------------------------

export default function CBTPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
  const [subjectSections, setSubjectSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Load subjects from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("oau-cbt-subjects");
    if (!saved) {
      router.push("/");
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      if (parsed.length !== 4 || !parsed.includes("aptitude")) {
        router.push("/");
        return;
      }
      setSubjects(parsed);
    } catch (_) {
      router.push("/");
    }
  }, [router]);

  // Build exam grouped by subject
  useEffect(() => {
    if (subjects.length !== 4) return;

    let allQuestions = [];
    let sections = [];

    for (const subjectKey of subjects) {
      const data = SUBJECT_DATA[subjectKey];
      if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
        setError(`No questions found for ${data?.label || subjectKey}`);
        return;
      }

      const shuffled = shuffleArray(data.questions);
      const picked = shuffled.slice(0, QUESTIONS_PER_SUBJECT);

      const enriched = picked.map((q) => ({
        ...q,
        subjectKey,
        subjectLabel: data.label,
        subjectIcon: data.icon,
      }));

      const startIndex = allQuestions.length;
      const endIndex = startIndex + enriched.length - 1;
      sections.push({
        key: subjectKey,
        label: data.label,
        icon: data.icon,
        startIndex,
        endIndex,
        count: enriched.length,
      });

      allQuestions = [...allQuestions, ...enriched];
    }

    if (allQuestions.length === 0) {
      setError("No questions could be loaded.");
      return;
    }

    setExamQuestions(allQuestions);
    setSubjectSections(sections);
    setError(null);
  }, [subjects]);

  // Timer
  useEffect(() => {
    if (examQuestions.length === 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examQuestions, submitted]);

  // Auto-submit
  useEffect(() => {
    if (submitted && examQuestions.length > 0) {
      let correct = 0;
      const total = examQuestions.length;
      for (let i = 0; i < total; i++) {
        if (answers[i] === examQuestions[i].answer) correct++;
      }
      const result = {
        correct,
        total,
        answers,
        questions: examQuestions,
        subjects,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("oau-cbt-result", JSON.stringify(result));
      router.push("/results");
    }
  }, [submitted, examQuestions, answers, subjects, router]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>⚠️ Error loading exam</h2>
        <p>{error}</p>
        <button onClick={() => router.push("/")} className={styles.errorButton}>
          Go back to subject selection
        </button>
      </div>
    );
  }

  if (subjects.length === 0 || examQuestions.length === 0) {
    return (
      <div className={styles.loading}>
        <p>Loading your exam...</p>
      </div>
    );
  }

  const currentQuestion = examQuestions[currentIndex];
  const totalQuestions = examQuestions.length;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const answeredCount = Object.keys(answers).length;

  const currentSection = subjectSections.find(
    (s) => currentIndex >= s.startIndex && currentIndex <= s.endIndex
  );

  const handleAnswer = (idx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
  };

  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit your exam?")) {
      setSubmitted(true);
    }
  };

  // Jump to a specific question (used by palette and tabs)
  const goToQuestion = (index) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* ---------- HEADER ---------- */}
        <div className={styles.header}>
          <div>
            <div className={styles.title}>OAU POST-UTME CBT</div>
            <div className={styles.questionCounter}>
              Question {currentIndex + 1} of {totalQuestions}
            </div>
          </div>
          <div className={styles.timer}>
            <span className={styles.timerIcon}>⏱️</span>
            <span className={styles.timerText}>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className={styles.answeredCount}>
              {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* ---------- PROGRESS BAR ---------- */}
        <div className={styles.progressBarWrapper}>
          <div
            className={styles.progressBar}
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* ---------- SUBJECT TABS (NEW) ---------- */}
        <div className={styles.subjectTabs}>
          {subjectSections.map((section) => (
            <button
              key={section.key}
              className={`${styles.tab} ${
                currentSection?.key === section.key ? styles.activeTab : ""
              }`}
              onClick={() => goToQuestion(section.startIndex)}
            >
              {section.icon} {section.label}
            </button>
          ))}
        </div>

        {/* ---------- QUESTION CARD ---------- */}
        <div className={styles.questionCard}>
          <div className={styles.questionText}>
            <MathRenderer text={currentQuestion.question} />
          </div>
          <div className={styles.options}>
            {currentQuestion.options.map((option, idx) => (
              <div
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`${styles.option} ${
                  answers[currentIndex] === idx ? styles.selectedOption : ""
                }`}
              >
                <span className={styles.optionLetter}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>
                  <MathRenderer text={option} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- NAVIGATION BUTTONS ---------- */}
        <div className={styles.navigation}>
          <button
            onClick={() => goToQuestion(currentIndex - 1)}
            disabled={currentIndex === 0}
            className={styles.navButton}
          >
            ← Previous
          </button>
          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => goToQuestion(currentIndex + 1)}
              className={styles.navButton}
            >
              Next →
            </button>
          ) : (
            <button onClick={handleSubmit} className={styles.submitButton}>
              Submit Exam
            </button>
          )}
        </div>

        {/* ---------- QUESTION PALETTE ---------- */}
        <div className={styles.palette}>
          <div className={styles.paletteLabel}>Question Navigator</div>
          <div className={styles.paletteGrid}>
            {examQuestions.map((_, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurrent = idx === currentIndex;
              const section = subjectSections.find(
                (s) => idx >= s.startIndex && idx <= s.endIndex
              );
              return (
                <button
                  key={idx}
                  onClick={() => goToQuestion(idx)}
                  className={`${styles.paletteItem} ${
                    isAnswered ? styles.paletteAnswered : ""
                  } ${isCurrent ? styles.paletteCurrent : ""}`}
                  style={
                    section && idx === section.startIndex
                      ? { borderLeft: "3px solid #2563eb" }
                      : {}
                  }
                  title={`${section?.label || ""} - Q${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div className={styles.paletteLegend}>
            {subjectSections.map((s) => (
              <span key={s.key} className={styles.legendItem}>
                <span className={styles.legendIcon}>{s.icon}</span>
                {s.label} ({s.startIndex + 1}–{s.endIndex + 1})
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  }
