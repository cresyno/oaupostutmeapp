"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// IMPORT EACH SUBJECT'S QUESTION BANK
import { aptitude as aptitudeQuestions } from "../../data/questions/aptitude";
import { mathematics as mathematicsQuestions } from "../../data/questions/mathematics";
import { chemistry as chemistryQuestions } from "../../data/questions/chemistry";
import { physics as physicsQuestions } from "../../data/questions/physics";
import { biology as biologyQuestions } from "../../data/questions/biology";
// Debug: log imported data
console.log("Aptitude questions:", aptitudeQuestions?.length);
console.log("Math questions:", mathematicsQuestions?.length);
console.log("Chemistry questions:", chemistryQuestions?.length);
console.log("Physics questions:", physicsQuestions?.length);
console.log("Biology questions:", biologyQuestions?.length);

const SUBJECT_DATA = {
  aptitude: {
    name: "Aptitude",
    questions: aptitudeQuestions,
  },
  mathematics: {
    name: "Mathematics",
    questions: mathematicsQuestions,
  },
  chemistry: {
    name: "Chemistry",
    questions: chemistryQuestions,
  },
  physics: {
    name: "Physics",
    questions: physicsQuestions,
  },
  biology: {
    name: "Biology",
    questions: biologyQuestions,
  },
};

const QUESTIONS_PER_SUBJECT = 10;

export default function CBTPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Load subjects from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("oau-cbt-subjects");
    console.log("Raw localStorage data:", saved);
    if (!saved) {
      console.error("No saved subjects, redirecting to home.");
      router.push("/");
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      console.log("Parsed subjects:", parsed);
      if (parsed.length !== 4 || !parsed.includes("aptitude")) {
        console.error("Invalid subjects, redirecting to home.");
        router.push("/");
        return;
      }
      setSubjects(parsed);
    } catch (e) {
      console.error("Error parsing subjects:", e);
      router.push("/");
    }
  }, [router]);

  // Build exam from questions
  useEffect(() => {
    if (subjects.length !== 4) {
      console.log("Subjects not ready yet:", subjects);
      return;
    }

    console.log("Building exam for subjects:", subjects);
    let selectedQuestions = [];
    let missingSubjects = [];

    for (const subjectKey of subjects) {
      const data = SUBJECT_DATA[subjectKey];
      if (!data) {
        console.error(`No data found for subject key: ${subjectKey}`);
        missingSubjects.push(subjectKey);
        continue;
      }

      const pool = data.questions;
      if (!Array.isArray(pool) || pool.length === 0) {
        console.warn(`No questions found for ${data.name}`);
        missingSubjects.push(subjectKey);
        continue;
      }

      console.log(`${data.name} has ${pool.length} questions`);

      // Enrich questions with subject info
      const enriched = pool.map((q) => ({
        ...q,
        subject: data.name,
        subjectKey: subjectKey,
      }));

      // Shuffle and pick 10
      const shuffled = [...enriched].sort(() => Math.random() - 0.5);
      const picked = shuffled.slice(0, QUESTIONS_PER_SUBJECT);
      selectedQuestions = [...selectedQuestions, ...picked];
    }

    if (missingSubjects.length > 0) {
      setError(`Missing questions for: ${missingSubjects.join(", ")}. Please check your question data.`);
      return;
    }

    if (selectedQuestions.length === 0) {
      setError("No questions could be loaded. Check your question files.");
      return;
    }

    // Shuffle overall order
    selectedQuestions.sort(() => Math.random() - 0.5);
    console.log("Final exam has", selectedQuestions.length, "questions");
    setExamQuestions(selectedQuestions);
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

  // Auto-submit when time runs out
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

  const handleAnswer = (idx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: idx }));
  };

  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit your exam?")) {
      setSubmitted(true);
    }
  };

  const subjectDisplay = currentQuestion.subject || "General";

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
            <span className={styles.timerIcon}>⏱️</span>
            <span className={styles.timerText}>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className={styles.answeredCount}>
              {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className={styles.questionCard}>
          <div className={styles.subjectTag}>{subjectDisplay}</div>
          <div className={styles.questionText}>{currentQuestion.question}</div>
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
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <button
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
            className={styles.navButton}
          >
            ← Previous
          </button>
          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
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

        {/* Question Palette */}
        <div className={styles.palette}>
          <div className={styles.paletteLabel}>Question Navigator</div>
          <div className={styles.paletteGrid}>
            {examQuestions.map((_, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`${styles.paletteItem} ${
                    isAnswered ? styles.paletteAnswered : ""
                  } ${isCurrent ? styles.paletteCurrent : ""}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
                             }
