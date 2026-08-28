"use client";

import { useState, useEffect, Component } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import katex from "katex";
import "katex/dist/katex.min.css";

// Import question data
import { aptitudeQuestions } from "../../data/questions/aptitude";
import { mathematicsQuestions } from "../../data/questions/mathematics";
import { chemistryQuestions } from "../../data/questions/chemistry";
import { physicsQuestions } from "../../data/questions/physics";
import { biologyQuestions } from "../../data/questions/biology";

// ---------- INTERACTIVE SVG SUBJECT ICONS ----------
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
        {/* + */}
        <line x1="6" y1="6" x2="12" y2="6"></line>
        <line x1="9" y1="3" x2="9" y2="9"></line>
        {/* - */}
        <line x1="14" y1="6" x2="20" y2="6"></line>
        {/* × */}
        <line x1="5" y1="13" x2="11" y2="19"></line>
        <line x1="11" y1="13" x2="5" y2="19"></line>
        {/* ÷ */}
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

  // Modern gradient backgrounds for the "3D" feel
  const gradients = {
    aptitude: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
    mathematics: "linear-gradient(135deg, #f59e0b, #b45309)",
    chemistry: "linear-gradient(135deg, #ec4899, #be185d)",
    physics: "linear-gradient(135deg, #ef4444, #b91c1c)",
    biology: "linear-gradient(135deg, #22c55e, #15803d)"
  };

  return (
    <span
      className={styles.subjectIcon}
      style={{ background: gradients[subjectKey] || "#333" }}
    >
      {icons[subjectKey] || null}
    </span>
  );
};

// ---------- SAFE MATH RENDERER ----------
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
              throwOnError: false, // Never crash, just show raw text
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

// ---------- ERROR BOUNDARY (clean, no button) ----------
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", background: "#fef2f2", borderRadius: "0.5rem", margin: "1rem 0" }}>
          <p style={{ color: "#b91c1c", fontWeight: "600" }}>⚠️ This question could not be rendered.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------- SUBJECT DATA ----------
const SUBJECT_DATA = {
  aptitude: { label: "Aptitude", questions: aptitudeQuestions || [], iconKey: "aptitude" },
  mathematics: { label: "Mathematics", questions: mathematicsQuestions || [], iconKey: "mathematics" },
  chemistry: { label: "Chemistry", questions: chemistryQuestions || [], iconKey: "chemistry" },
  physics: { label: "Physics", questions: physicsQuestions || [], iconKey: "physics" },
  biology: { label: "Biology", questions: biologyQuestions || [], iconKey: "biology" },
};

const QUESTIONS_PER_SUBJECT = 10;
const EXAM_DURATION_SECONDS = 3600; // 1 hour

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CBTPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
  const [subjectSections, setSubjectSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
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

  // Build exam
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
        subjectIcon: data.iconKey,
      }));

      const startIndex = allQuestions.length;
      const endIndex = startIndex + enriched.length - 1;
      sections.push({
        key: subjectKey,
        label: data.label,
        icon: data.iconKey,
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
      for (let i = 0; i < examQuestions.length; i++) {
        if (answers[i] === examQuestions[i].answer) correct++;
      }
      const result = {
        correct,
        total: examQuestions.length,
        answers,
        questions: examQuestions,
        subjects,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("oau-cbt-result", JSON.stringify(result));
      router.push("/results");
    }
  }, [submitted, examQuestions, answers, subjects, router]);

  // Refresh protection (beforeunload)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!submitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [submitted]);

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

  const goToQuestion = (index) => {
    if (index >= 0 && index < totalQuestions) setCurrentIndex(index);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.title}>OAU POST-UTME CBT</div>
            <div className={styles.questionCounter}>
              Question {currentIndex + 1} of {totalQuestions}
            </div>
          </div>
          <div className={styles.timer}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "5px" }}>
              <circle cx="12" cy="13" r="8"></circle>
              <path d="M12 9v4l2 2"></path>
              <path d="M9 2h6"></path>
            </svg>
            <span className={styles.timerText}>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className={styles.answeredCount}>
              {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBarWrapper}>
          <div
            className={styles.progressBar}
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Subject Tabs */}
        <div className={styles.subjectTabs}>
          {subjectSections.map((section) => (
            <button
              key={section.key}
              className={`${styles.tab} ${
                currentSection?.key === section.key ? styles.activeTab : ""
              }`}
              onClick={() => goToQuestion(section.startIndex)}
            >
              <SubjectIcon subjectKey={section.icon} />
              {section.label}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <ErrorBoundary>
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
        </ErrorBoundary>

        {/* Navigation */}
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

        {/* Palette */}
        <div className={styles.palette}>
          <div className={styles.paletteLabel}>Question Navigator</div>
          <div className={styles.paletteGrid}>
            {examQuestions.map((_, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToQuestion(idx)}
                  className={`${styles.paletteItem} ${
                    isAnswered ? styles.paletteAnswered : ""
                  } ${isCurrent ? styles.paletteCurrent : ""}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <div className={styles.paletteLegend}>
            {subjectSections.map((s) => (
              <span key={s.key} className={styles.legendItem}>
                <SubjectIcon subjectKey={s.icon} />
                {s.label} ({s.startIndex + 1}–{s.endIndex + 1})
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
          }
