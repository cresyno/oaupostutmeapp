"use client";

import { useEffect, useMemo, useState } from "react";
import { questions } from "../../data/questions";
import { createExam, scoreExam, SUBJECTS } from "../lib/exam";

const EXAM_TIME = 45 * 60;

export default function CBTPage() {
  const exam = useMemo(() => createExam(questions), []);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }

        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  if (!exam || exam.length !== 40) {
    return (
      <main className="error-page">
        <h1>CBT unavailable</h1>
        <p>The question bank needs at least 10 questions per subject.</p>
      </main>
    );
  }

  const question = exam[current];

  const answeredCount = Object.keys(answers).length;
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  function chooseAnswer(index) {
    if (submitted) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: index,
    }));
  }

  function submitExam() {
    setSubmitted(true);

    const score = scoreExam(exam, answers);

    localStorage.setItem(
      "oau-cbt-last-result",
      JSON.stringify({
        score,
        answers,
        exam,
        completedAt: new Date().toISOString(),
      })
    );
  }

  if (submitted) {
    const score = scoreExam(exam, answers);

    return (
      <main className="result-page">
        <div className="result-card">
          <p className="eyebrow">EXAM COMPLETED</p>

          <h1>
            {score} <span>/ 40</span>
          </h1>

          <p className="percentage">
            {Math.round((score / 40) * 100)}%
          </p>

          <div className="subject-results">
            {SUBJECTS.map((subject) => {
              const subjectQuestions = exam.filter(
                (item) => item.subject === subject
              );

              const subjectScore = subjectQuestions.reduce(
                (total, item) =>
                  total + (answers[item.id] === item.answer ? 1 : 0),
                0
              );

              return (
                <div className="subject-result" key={subject}>
                  <span>{subject}</span>
                  <strong>
                    {subjectScore}/10
                  </strong>
                </div>
              );
            })}
          </div>

          <button
            className="primary-button"
            onClick={() => window.location.reload()}
          >
            Start New CBT
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="cbt-page">
      <header className="cbt-header">
        <div>
          <p className="brand">OAU POST-UTME CBT</p>
          <span>
            Question {current + 1} of {exam.length}
          </span>
        </div>

        <div className="timer">
          {minutes}:{seconds}
        </div>
      </header>

      <section className="progress-section">
        <div className="progress-info">
          <span>{answeredCount}/40 answered</span>
          <span>{question.subject}</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-bar"
            style={{
              width: `${((current + 1) / 40) * 100}%`,
            }}
          />
        </div>
      </section>

      <section className="question-card">
        <p className="question-number">
          QUESTION {String(current + 1).padStart(2, "0")}
        </p>

        <h1>{question.question}</h1>

        <div className="options">
          {question.options.map((option, index) => {
            const selected = answers[question.id] === index;

            return (
              <button
                key={index}
                className={`option ${selected ? "selected" : ""}`}
                onClick={() => chooseAnswer(index)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>
            );
          })}
        </div>
      </section>

      <nav className="question-navigation">
        <button
          className="secondary-button"
          disabled={current === 0}
          onClick={() => setCurrent((value) => value - 1)}
        >
          Previous
        </button>

        {current < 39 ? (
          <button
            className="primary-button"
            onClick={() => setCurrent((value) => value + 1)}
          >
            Next
          </button>
        ) : (
          <button className="submit-button" onClick={submitExam}>
            Submit Exam
          </button>
        )}
      </nav>

      <section className="question-grid">
        {exam.map((item, index) => (
          <button
            key={item.id}
            className={[
              "question-dot",
              index === current ? "current" : "",
              answers[item.id] !== undefined ? "answered" : "",
            ].join(" ")}
            onClick={() => setCurrent(index)}
          >
            {index + 1}
          </button>
        ))}
      </section>
    </main>
  );
      }
