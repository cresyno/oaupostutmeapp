"use client";

import { useEffect, useMemo, useState } from "react";
import { questions } from "../../data/questions";
import { calculateScore, createExam } from "../../lib/exam";

export default function CBTPage() {
  const exam = useMemo(() => createExam(questions), []);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const question = exam[current];

  function selectAnswer(optionIndex) {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionIndex,
    }));
  }

  function submitExam() {
    setSubmitted(true);

    const score = calculateScore(exam, answers);
    localStorage.setItem(
      "oau-last-result",
      JSON.stringify({
        score,
        total: exam.length,
        answers,
        exam,
      })
    );
  }

  if (submitted) {
    const score = calculateScore(exam, answers);

    return (
      <main style={{ padding: 24 }}>
        <h1>Exam Submitted</h1>
        <h2>
          {score} / {exam.length}
        </h2>
        <p>{Math.round((score / exam.length) * 100)}%</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <p>
        Question {current + 1} / {exam.length}
      </p>

      <p>
        <strong>{question.subject}</strong>
      </p>

      <h1>{question.question}</h1>

      <div>
        {question.options.map((option, index) => (
          <button
            key={option}
            onClick={() => selectAnswer(index)}
            style={{
              display: "block",
              width: "100%",
              padding: 16,
              margin: "10px 0",
              textAlign: "left",
              border:
                answers[question.id] === index
                  ? "2px solid #111"
                  : "1px solid #ddd",
              borderRadius: 10,
              background:
                answers[question.id] === index ? "#eee" : "#fff",
            }}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 24,
        }}
      >
        <button
          disabled={current === 0}
          onClick={() => setCurrent((value) => value - 1)}
        >
          Previous
        </button>

        {current < exam.length - 1 ? (
          <button onClick={() => setCurrent((value) => value + 1)}>
            Next
          </button>
        ) : (
          <button onClick={submitExam}>Submit Exam</button>
        )}
      </div>
    </main>
  );
}
