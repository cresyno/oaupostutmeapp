export const questions = [
  {
    id: "APT-001",
    subject: "Aptitude",
    topic: "Number Reasoning",
    difficulty: "hard",
    question: "If 3, 7, 15, 31, 63, ... follows a pattern, what is the next term?",
    options: ["95", "111", "127", "129"],
    answer: 2,
    explanation:
      "Each term is obtained by multiplying the previous term by 2 and adding 1."
  },

  {
    id: "MAT-001",
    subject: "Mathematics",
    topic: "Algebra",
    difficulty: "hard",
    question:
      "If the roots of $x^2 - 7x + k = 0$ differ by 1, determine the value of $k$.",
    options: ["10", "12", "14", "16"],
    answer: 1,
    explanation:
      "If the roots are α and β, then α + β = 7 and |α − β| = 1. Solving gives α = 4 and β = 3, so k = αβ = 12."
  },

  {
    id: "CHE-001",
    subject: "Chemistry",
    topic: "Mole Concept",
    difficulty: "hard",
    question:
      "What volume of oxygen at STP is required for the complete combustion of 0.50 mol of methane according to CH₄ + 2O₂ → CO₂ + 2H₂O?",
    options: ["11.2 L", "22.4 L", "44.8 L", "56.0 L"],
    answer: 2,
    explanation:
      "One mole of CH₄ requires two moles of O₂. Therefore 0.50 mol CH₄ requires 1.00 mol O₂, which occupies 22.4 L at STP."
  },

  {
    id: "PHY-001",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "hard",
    question:
      "A body is projected vertically upward with a speed of 20 m/s. Taking g = 10 m/s², what is its maximum height?",
    options: ["10 m", "20 m", "30 m", "40 m"],
    answer: 1,
    explanation:
      "At maximum height, v² = u² − 2gh. Hence 0 = 400 − 20h, giving h = 20 m."
  }
];
