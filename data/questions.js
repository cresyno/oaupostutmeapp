export const questions = [
  // APTITUDE
  {
    id: "APT-001",
    subject: "Aptitude",
    question: "If 3, 7, 15, 31, 63, ... follows a pattern, what is the next term?",
    options: ["95", "111", "127", "129"],
    answer: 2,
    explanation: "Each term is obtained by multiplying the previous term by 2 and adding 1."
  },
  {
    id: "APT-002",
    subject: "Aptitude",
    question: "A clock gains 5 minutes every hour. How many minutes will it gain in 6 hours?",
    options: ["25", "30", "35", "40"],
    answer: 1,
    explanation: "5 × 6 = 30 minutes."
  },
  {
    id: "APT-003",
    subject: "Aptitude",
    question: "Find the odd one out: 16, 25, 36, 49, 63.",
    options: ["16", "25", "49", "63"],
    answer: 3,
    explanation: "16, 25, 36 and 49 are perfect squares. 63 is not."
  },
  {
    id: "APT-004",
    subject: "Aptitude",
    question: "If BOOK is coded as 2665 using A=1, B=2, ..., Z=26, what is the sum of the values of BOOK?",
    options: ["41", "43", "45", "47"],
    answer: 1,
    explanation: "B + O + O + K = 2 + 15 + 15 + 11 = 43."
  },
  {
    id: "APT-005",
    subject: "Aptitude",
    question: "A man walks 5 km north and then 12 km east. What is the shortest distance from his starting point?",
    options: ["13 km", "15 km", "17 km", "19 km"],
    answer: 0,
    explanation: "By Pythagoras, distance = √(5² + 12²) = 13 km."
  },
  {
    id: "APT-006",
    subject: "Aptitude",
    question: "If all doctors are graduates and some graduates are researchers, which conclusion must be true?",
    options: [
      "All researchers are doctors",
      "Some doctors are researchers",
      "All doctors are graduates",
      "No graduate is a doctor"
    ],
    answer: 2,
    explanation: "The first statement directly establishes that all doctors are graduates."
  },
  {
    id: "APT-007",
    subject: "Aptitude",
    question: "Complete the sequence: 2, 6, 12, 20, 30, ...",
    options: ["36", "40", "42", "44"],
    answer: 2,
    explanation: "The pattern is n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, so the next is 6×7 = 42."
  },
  {
    id: "APT-008",
    subject: "Aptitude",
    question: "A train travels 180 km in 3 hours. What is its average speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    answer: 1,
    explanation: "Average speed = distance/time = 180/3 = 60 km/h."
  },
  {
    id: "APT-009",
    subject: "Aptitude",
    question: "If yesterday was Monday, what day will it be 10 days from today?",
    options: ["Thursday", "Friday", "Saturday", "Sunday"],
    answer: 1,
    explanation: "Yesterday Monday means today Tuesday. Ten days after Tuesday is Friday."
  },
  {
    id: "APT-010",
    subject: "Aptitude",
    question: "Which number completes the pattern: 4, 9, 19, 39, 79, ...?",
    options: ["119", "149", "159", "169"],
    answer: 2,
    explanation: "Each term is twice the previous term plus 1."
  },

  // MATHEMATICS
  {
    id: "MAT-001",
    subject: "Mathematics",
    question: "If the roots of x² − 7x + k = 0 differ by 1, determine k.",
    options: ["10", "12", "14", "16"],
    answer: 1,
    explanation: "The roots are 4 and 3, so k = 4 × 3 = 12."
  },
  {
    id: "MAT-002",
    subject: "Mathematics",
    question: "Solve: 2x + 5 = 17.",
    options: ["5", "6", "7", "8"],
    answer: 1,
    explanation: "2x = 12, hence x = 6."
  },
  {
    id: "MAT-003",
    subject: "Mathematics",
    question: "If log₂x = 5, find x.",
    options: ["10", "16", "25", "32"],
    answer: 3,
    explanation: "x = 2⁵ = 32."
  },
  {
    id: "MAT-004",
    subject: "Mathematics",
    question: "Find the gradient of the line joining (2, 3) and (6, 11).",
    options: ["1", "2", "3", "4"],
    answer: 1,
    explanation: "Gradient = (11 − 3)/(6 − 2) = 8/4 = 2."
  },
  {
    id: "MAT-005",
    subject: "Mathematics",
    question: "Differentiate y = x³ − 4x with respect to x.",
    options: ["3x² − 4", "3x − 4", "x² − 4", "3x² − 4x"],
    answer: 0,
    explanation: "dy/dx = 3x² − 4."
  },
  {
    id: "MAT-006",
    subject: "Mathematics",
    question: "Evaluate ∫ 2x dx.",
    options: ["x² + C", "2x² + C", "x + C", "x²/2 + C"],
    answer: 0,
    explanation: "The integral of 2x is x² + C."
  },
  {
    id: "MAT-007",
    subject: "Mathematics",
    question: "A fair die is thrown once. What is the probability of obtaining a prime number?",
    options: ["1/3", "1/2", "2/3", "5/6"],
    answer: 1,
    explanation: "Prime outcomes are 2, 3 and 5: 3/6 = 1/2."
  },
  {
    id: "MAT-008",
    subject: "Mathematics",
    question: "If sin θ = 3/5 and θ is acute, find cos θ.",
    options: ["2/5", "3/5", "4/5", "5/6"],
    answer: 2,
    explanation: "Using the 3-4-5 triangle, cos θ = 4/5."
  },
  {
    id: "MAT-009",
    subject: "Mathematics",
    question: "The sum of the first 10 terms of an arithmetic progression is 95. If the first term is 5, find the common difference.",
    options: ["1", "2", "3", "4"],
    answer: 0,
    explanation: "95 = 10/2[2(5)+9d]. Thus 19 = 10 + 9d, giving d = 1."
  },
  {
    id: "MAT-010",
    subject: "Mathematics",
    question: "Find the determinant of [[2, 3], [1, 4]].",
    options: ["5", "6", "7", "8"],
    answer: 0,
    explanation: "Determinant = (2×4) − (3×1) = 5."
  },

  // CHEMISTRY
  {
    id: "CHE-001",
    subject: "Chemistry",
    question: "What volume of oxygen at STP is required to completely burn 0.50 mol of methane?",
    options: ["11.2 L", "22.4 L", "44.8 L", "56.0 L"],
    answer: 1,
    explanation: "CH₄ requires 2 mol O₂ per mol CH₄. Thus 0.50 mol requires 1 mol O₂ = 22.4 L at STP."
  },
  {
    id: "CHE-002",
    subject: "Chemistry",
    question: "Which quantum number determines the shape of an orbital?",
    options: ["Principal", "Azimuthal", "Magnetic", "Spin"],
    answer: 1,
    explanation: "The azimuthal quantum number determines orbital shape."
  },
  {
    id: "CHE-003",
    subject: "Chemistry",
    question: "What is the oxidation number of sulfur in H₂SO₄?",
    options: ["+2", "+4", "+6", "−2"],
    answer: 2,
    explanation: "2(+1) + S + 4(−2) = 0, so S = +6."
  },
  {
    id: "CHE-004",
    subject: "Chemistry",
    question: "Which gas turns limewater milky?",
    options: ["O₂", "CO₂", "H₂", "NH₃"],
    answer: 1,
    explanation: "CO₂ reacts with limewater to form insoluble CaCO₃."
  },
  {
    id: "CHE-005",
    subject: "Chemistry",
    question: "Which type of bond exists between sodium and chlorine in NaCl?",
    options: ["Covalent", "Metallic", "Ionic", "Hydrogen"],
    answer: 2,
    explanation: "Na transfers an electron to Cl, forming an ionic bond."
  },
  {
    id: "CHE-006",
    subject: "Chemistry",
    question: "What is the pH of a neutral solution at 25°C?",
    options: ["0", "5", "7", "14"],
    answer: 2,
    explanation: "At 25°C, a neutral aqueous solution has pH 7."
  },
  {
    id: "CHE-007",
    subject: "Chemistry",
    question: "Which process involves the gain of electrons?",
    options: ["Oxidation", "Reduction", "Ionisation", "Neutralisation"],
    answer: 1,
    explanation: "Reduction is gain of electrons."
  },
  {
    id: "CHE-008",
    subject: "Chemistry",
    question: "How many moles are present in 18 g of water? (H₂O = 18 g/mol)",
    options: ["0.5", "1", "2", "18"],
    answer: 1,
    explanation: "Moles = mass/molar mass = 18/18 = 1 mol."
  },
  {
    id: "CHE-009",
    subject: "Chemistry",
    question: "Which hydrocarbon belongs to the alkene homologous series?",
    options: ["CH₄", "C₂H₆", "C₂H₄", "C₃H₈"],
    answer: 2,
    explanation: "Alkenes have the general formula CₙH₂ₙ; C₂H₄ is ethene."
  },
  {
    id: "CHE-010",
    subject: "Chemistry",
    question: "A catalyst increases the rate of a reaction mainly by:",
    options: [
      "Increasing product energy",
      "Lowering activation energy",
      "Increasing temperature",
      "Increasing equilibrium constant"
    ],
    answer: 1,
    explanation: "A catalyst provides an alternative pathway with lower activation energy."
  },

  // PHYSICS
  {
    id: "PHY-001",
    subject: "Physics",
    question: "A body is projected vertically upward at 20 m/s. Taking g = 10 m/s², find its maximum height.",
    options: ["10 m", "20 m", "30 m", "40 m"],
    answer: 1,
    explanation: "Using v² = u² − 2gh: 0 = 400 − 20h, so h = 20 m."
  },
  {
    id: "PHY-002",
    subject: "Physics",
    question: "A force of 20 N acts on a mass of 5 kg. What acceleration is produced?",
    options: ["2 m/s²", "4 m/s²", "5 m/s²", "10 m/s²"],
    answer: 1,
    explanation: "F = ma, so a = 20/5 = 4 m/s²."
  },
  {
    id: "PHY-003",
    subject: "Physics",
    question: "What is the SI unit of electric potential difference?",
    options: ["Ampere", "Coulomb", "Volt", "Ohm"],
    answer: 2,
    explanation: "Electric potential difference is measured in volts."
  },
  {
    id: "PHY-004",
    subject: "Physics",
    question: "A 6 Ω resistor is connected to a 12 V source. What current flows through it?",
    options: ["0.5 A", "2 A", "6 A", "72 A"],
    answer: 1,
    explanation: "Ohm's law gives I = V/R = 12/6 = 2 A."
  },
  {
    id: "PHY-005",
    subject: "Physics",
    question: "Which quantity has both magnitude and direction?",
    options: ["Speed", "Distance", "Mass", "Velocity"],
    answer: 3,
    explanation: "Velocity is a vector quantity."
  },
  {
    id: "PHY-006",
    subject: "Physics",
    question: "The area under a velocity-time graph represents:",
    options: ["Acceleration", "Displacement", "Force", "Power"],
    answer: 1,
    explanation: "The integral of velocity with respect to time gives displacement."
  },
  {
    id: "PHY-007",
    subject: "Physics",
    question: "Which electromagnetic radiation has the shortest wavelength?",
    options: ["Radio waves", "Microwaves", "Visible light", "Gamma rays"],
    answer: 3,
    explanation: "Gamma rays have the shortest wavelength and highest frequency."
  },
  {
    id: "PHY-008",
    subject: "Physics",
    question: "A machine does 600 J of work in 20 seconds. What is its power?",
    options: ["20 W", "30 W", "40 W", "60 W"],
    answer: 1,
    explanation: "Power = work/time = 600/20 = 30 W."
  },
  {
    id: "PHY-009",
    subject: "Physics",
    question: "If the frequency of a wave is 50 Hz, how many complete oscillations occur in 4 seconds?",
    options: ["100", "150", "200", "250"],
    answer: 2,
    explanation: "Number of oscillations = frequency × time = 50 × 4 = 200."
  },
  {
    id: "PHY-010",
    subject: "Physics",
    question: "Which principle explains why a hydraulic press can multiply force?",
    options: ["Archimedes' principle", "Pascal's principle", "Hooke's law", "Boyle's law"],
    answer: 1,
    explanation: "Pascal's principle states that pressure applied to an enclosed fluid is transmitted throughout the fluid."
  }
];
