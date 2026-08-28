"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONAL_SUBJECTS = [
  "Mathematics",
  "Chemistry",
  "Physics",
  "Biology",
];

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  function toggleSubject(subject) {
    setSelected((current) => {
      if (current.includes(subject)) {
        return current.filter((item) => item !== subject);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, subject];
    });
  }

  function startCBT() {
    if (selected.length !== 3) return;

    localStorage.setItem(
      "oau-cbt-subjects",
      JSON.stringify(["Aptitude", ...selected])
    );

    router.push("/cbt");
  }

  return (
    <main className="home-page">
      <section className="selection-card">
        <p className="eyebrow">OAU POST-UTME CBT</p>

        <h1>Choose Your Subjects</h1>

        <p className="intro">
          Aptitude is compulsory. Select exactly three
          additional subjects.
        </p>

        <div className="subject-list">
          <div className="subject compulsory">
            <div>
              <strong>Aptitude</strong>
              <span>Compulsory • 10 questions</span>
            </div>

            <span className="locked">✓</span>
          </div>

          {OPTIONAL_SUBJECTS.map((subject) => {
            const isSelected = selected.includes(subject);

            return (
              <button
                key={subject}
                type="button"
                className={`subject ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => toggleSubject(subject)}
              >
                <div>
                  <strong>{subject}</strong>
                  <span>10 questions</span>
                </div>

                <span className="checkbox">
                  {isSelected ? "✓" : ""}
                </span>
              </button>
            );
          })}
        </div>

        <div className="selection-status">
          <strong>{selected.length}/3</strong>
          <span>optional subjects selected</span>
        </div>

        <button
          className="start-button"
          disabled={selected.length !== 3}
          onClick={startCBT}
        >
          {selected.length === 3
            ? "Start 40-Question CBT"
            : "Select 3 Subjects"}
        </button>
      </section>
    </main>
  );
    }
