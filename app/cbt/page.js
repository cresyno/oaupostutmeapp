"use client";

import { useEffect, useMemo, useState } from "react";
import { questions } from "../../data/questions";
import { createExam, scoreExam } from "../../lib/exam";

export default function CBTPage() {
  const [subjects, setSubjects] = useState(null);
  const [exam, setExam] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("oau-cbt-subjects");

      if (!saved) {
        setSubjects([]);
        return;
      }

      const parsed = JSON.parse(saved);
      setSubjects(parsed);
    } catch {
      setSubjects([]);
    }
  }, []);

  useEffect(() => {
    if (!subjects || subjects.length !== 4) return;

    try {
      const generatedExam = createExam(questions, subjects);
      setExam(generatedExam);
    } catch (error) {
      console.error(error);
      setExam([]);
    }
  }, [subjects]);

  useEffect(() => {
    if (!exam || submitted) return;

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
  }, [exam, submitted]);

  if (subjects === null || exam === null) {
    return (
      <main className="loading-page">
        <h1>Preparing your CBT...</h1>
        <p>Please wait.</p>
      </main>
    );
  }

  if (subjects.length !== 4 || exam.length !== 40) {
    return (
      <main className="error-page">
        <h1>CBT setup incomplete</h1>
        <p>
          Please return to the subject selection page and
          select exactly 3 optional subjects.
        </p>

        <button
          className="primary-button"
          onClick={() => {
            localStorage.removeItem("oau-cbt-subjects");
            window.location.href = "/";
          }}
        >
          Choose Subjects
        </button>
      </main>
    );
  }

  const question = exam[current];

  const answeredCount = Object.keys(answers).length;
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

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
        subjects,
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
            {subjects.map((subject) => {
              const subjectQuestions = exam.filter(
                (item) => item.subject === subject
              );

              const subjectScore = subjectQuestions.reduce(
                (total, item) =>
                  total +
                  (answers[item.id] === item.answer ? 1 : 0),
                0
              );

              return (
                <div
                  className="subject-result"
                  key={subject}
                >
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
            onClick={() => {
              localStorage.removeItem("oau-cbt-subjects");
              window.location.href = "/";
            }}
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
            Question {current + 1} of 40
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
          QUESTION{" "}
          {String(current + 1).padStart(2, "0")}
        </p>

        <h1>{question.question}</h1>

        <div className="options">
          {question.options.map((option, index) => {
            const selected =
              answers[question.id] === index;

            return (
              <button
                key={index}
                className={`option ${
                  selected ? "selected" : ""
                }`}
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
          onClick={() =>
            setCurrent((value) => value - 1)
          }
        >
          Previous
        </button>

        {current < 39 ? (
          <button
            className="primary-button"
            onClick={() =>
              setCurrent((value) => value + 1)
            }
          >
            Next
          </button>
        ) : (
          <button
            className="submit-button"
            onClick={submitExam}
          >
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
              answers[item.id] !== undefined
                ? "answered"
                : "",
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
