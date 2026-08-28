"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// IMPORT EACH SUBJECT'S QUESTION BANK - USING RELATIVE PATHS
import aptitudeQuestions from "../../data/questions/aptitude";
import mathematicsQuestions from "../../data/questions/mathematics";
import chemistryQuestions from "../../data/questions/chemistry";
import physicsQuestions from "../../data/questions/physics";
import biologyQuestions from "../../data/questions/biology";

// Map subject keys to their question array and display name
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

  // Build exam from questions
  useEffect(() => {
    if (subjects.length !== 4) return;

    let selectedQuestions = [];
    for (const subjectKey of subjects) {
      const data = SUBJECT_DATA[subjectKey];
      if (!data) continue;

      const pool = data.questions;
      if (!Array.isArray(pool) || pool.length === 0) {
        console.warn(`No questions found for ${data.name}`);
        continue;
      }

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

    // Shuffle overall order
    selectedQuestions.sort(() => Math.random() - 0.5);
    setExamQuestions(selectedQuestions);
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
