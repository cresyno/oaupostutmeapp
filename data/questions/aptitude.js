export const aptitudeQuestions = [
  {
    id: "APT-001",
    subject: "Aptitude",
    question:
      "A sequence begins 3, 8, 18, 38, 78, ?. What is the next term?",
    options: ["148", "156", "158", "160"],
    answer: 2,
    explanation:
      "Each term is obtained by multiplying the previous term by 2 and adding 2: 78 × 2 + 2 = 158."
  },
  {
    id: "APT-002",
    subject: "Aptitude",
    question:
      "If CODE is written as DPEF, how would LOGIC be written using the same rule?",
    options: ["MPHJD", "MPHDB", "KNFHB", "MNFJD"],
    answer: 0,
    explanation:
      "Each letter is shifted forward by one position: L→M, O→P, G→H, I→J, C→D."
  },
  {
    id: "APT-003",
    subject: "Aptitude",
    question:
      "A man walks 8 km north, turns east and walks 6 km, then walks 8 km south. How far is he from his starting point?",
    options: ["2 km", "6 km", "8 km", "14 km"],
    answer: 1,
    explanation:
      "The northward and southward movements cancel. He is therefore 6 km east of his starting point."
  },
  {
    id: "APT-004",
    subject: "Aptitude",
    question:
      "Find the missing number: 2, 6, 12, 20, 30, 42, ?",
    options: ["54", "56", "58", "60"],
    answer: 1,
    explanation:
      "The differences are 4, 6, 8, 10, 12. The next difference is 14, giving 42 + 14 = 56."
  },
  {
    id: "APT-005",
    subject: "Aptitude",
    question:
      "All lecturers in a department are graduates. Some graduates are researchers. Which conclusion is necessarily true?",
    options: [
      "All lecturers are researchers",
      "Some lecturers are researchers",
      "All researchers are lecturers",
      "All lecturers are graduates"
    ],
    answer: 3,
    explanation:
      "The statement directly establishes that every lecturer is a graduate. Nothing necessarily establishes that lecturers are researchers."
  },
  {
    id: "APT-006",
    subject: "Aptitude",
    question:
      "A clock gains 5 minutes every hour. If it is set correctly at 8:00 a.m., what time will it show at 2:00 p.m.?",
    options: ["2:05 p.m.", "2:20 p.m.", "2:30 p.m.", "2:35 p.m."],
    answer: 2,
    explanation:
      "Six hours × 5 minutes = 30 minutes gained. Therefore it displays 2:30 p.m."
  },
  {
    id: "APT-007",
    subject: "Aptitude",
    question:
      "If 5 machines produce 5 units in 5 minutes at the same rate, how many units will 20 machines produce in 20 minutes?",
    options: ["20", "40", "60", "80"],
    answer: 3,
    explanation:
      "One machine produces one unit in 5 minutes. In 20 minutes, one machine produces 4 units. Twenty machines produce 80 units."
  },
  {
    id: "APT-008",
    subject: "Aptitude",
    question:
      "Choose the word that does NOT belong to the group.",
    options: ["Mercury", "Venus", "Mars", "Moon"],
    answer: 3,
    explanation:
      "Mercury, Venus and Mars are planets. The Moon is a natural satellite."
  },
  {
    id: "APT-009",
    subject: "Aptitude",
    question:
      "A father is three times as old as his son. In 12 years, he will be twice as old as his son. How old is the son now?",
    options: ["10 years", "12 years", "14 years", "16 years"],
    answer: 1,
    explanation:
      "Let the son's age be x. Father = 3x. Then 3x + 12 = 2(x + 12), giving x = 12."
  },
  {
    id: "APT-010",
    subject: "Aptitude",
    question:
      "If today is Wednesday, what day of the week will it be 100 days from today?",
    options: ["Thursday", "Friday", "Saturday", "Sunday"],
    answer: 1,
    explanation:
      "100 ÷ 7 leaves remainder 2. Two days after Wednesday is Friday."
  },
  {
    id: "APT-011",
    subject: "Aptitude",
    question:
      "A, B, C, D and E are arranged from left to right. A is before B, C is after B, D is before A, and E is after C. Which must be first?",
    options: ["A", "B", "C", "D"],
    answer: 3,
    explanation:
      "The relationships force D < A < B < C < E, so D must be first."
  },
  {
    id: "APT-012",
    subject: "Aptitude",
    question:
      "A number is increased by 20% and then decreased by 20%. What is the overall percentage change?",
    options: ["No change", "2% decrease", "4% decrease", "4% increase"],
    answer: 2,
    explanation:
      "Using 100: 100 × 1.2 = 120; 120 × 0.8 = 96. The overall change is a 4% decrease."
  },
  {
    id: "APT-013",
    subject: "Aptitude",
    question:
      "Complete the analogy: BOOK : AUTHOR :: BUILDING : ?",
    options: ["Brick", "Architect", "Builder", "Engineer"],
    answer: 1,
    explanation:
      "An author creates a book; an architect designs a building."
  },
  {
    id: "APT-014",
    subject: "Aptitude",
    question:
      "A bag contains 4 red, 3 blue and 3 green balls. What is the minimum number of balls that must be drawn without looking to guarantee two balls of the same colour?",
    options: ["2", "3", "4", "5"],
    answer: 2,
    explanation:
      "There are three colours. Drawing four balls guarantees that at least two have the same colour."
  },
  {
    id: "APT-015",
    subject: "Aptitude",
    question:
      "If SOUTH is coded as 12345 and NORTH as 67845, which digit represents H?",
    options: ["3", "4", "5", "8"],
    answer: 2,
    explanation:
      "From SOUTH, H corresponds to the fifth character, represented by 5."
  },
  {
    id: "APT-016",
    subject: "Aptitude",
    question:
      "A student scored 72, 68, 81 and 79 in four tests. What score must the student obtain in the fifth test to have an average of 76?",
    options: ["76", "78", "80", "82"],
    answer: 0,
    explanation:
      "Required total = 76 × 5 = 380. Existing total = 300. Required score = 80."
  },
  {
    id: "APT-017",
    subject: "Aptitude",
    question:
      "Which number replaces the question mark? 4, 9, 19, 39, 79, ?",
    options: ["119", "149", "159", "169"],
    answer: 2,
    explanation:
      "Each term is multiplied by 2 and then increased by 1."
  },
  {
    id: "APT-018",
    subject: "Aptitude",
    question:
      "A train travels 180 km in 3 hours. At the same speed, how far will it travel in 4 hours 30 minutes?",
    options: ["240 km", "250 km", "270 km", "300 km"],
    answer: 2,
    explanation:
      "Speed = 180/3 = 60 km/h. In 4.5 hours: 60 × 4.5 = 270 km."
  },
  {
    id: "APT-019",
    subject: "Aptitude",
    question:
      "If some doctors are writers and all writers are readers, which statement must be true?",
    options: [
      "All doctors are readers",
      "Some doctors are readers",
      "All readers are doctors",
      "No doctor is a reader"
    ],
    answer: 1,
    explanation:
      "The doctors who are writers must also be readers because all writers are readers."
  },
  {
    id: "APT-020",
    subject: "Aptitude",
    question:
      "A farmer has chickens and goats. There are 20 animals and 56 legs altogether. How many goats are there?",
    options: ["6", "8", "10", "12"],
    answer: 1,
    explanation:
      "If all 20 were chickens there would be 40 legs. The extra 16 legs come from goats, each contributing 2 extra legs. 16/2 = 8 goats."
  },

  // Continue APT-021 through APT-100 here.
];
