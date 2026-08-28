export const chemistryQuestions = [
  {
    id: "CHE-001",
    subject: "Chemistry",
    question:
      "A sample of calcium carbonate, CaCO₃, has a mass of 5.00 g. What volume of CO₂ would be produced at STP if the sample reacts completely with excess hydrochloric acid? [Ca = 40, C = 12, O = 16; molar volume at STP = 22.4 dm³]",
    options: ["0.56 dm³", "1.12 dm³", "2.24 dm³", "5.60 dm³"],
    answer: 1,
    explanation:
      "Molar mass of CaCO₃ = 100 g mol⁻¹. Moles = 5/100 = 0.05 mol. One mole of CaCO₃ produces one mole of CO₂. Volume = 0.05 × 22.4 = 1.12 dm³."
  },

  {
    id: "CHE-002",
    subject: "Chemistry",
    question:
      "For the equilibrium N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat, which change will increase the equilibrium yield of ammonia?",
    options: [
      "Increasing the temperature",
      "Decreasing the pressure",
      "Increasing the pressure",
      "Adding a catalyst only"
    ],
    answer: 2,
    explanation:
      "There are fewer moles of gas on the product side (2 compared with 4). Increasing pressure shifts equilibrium toward the side with fewer gas molecules, increasing NH₃ yield."
  },

  {
    id: "CHE-003",
    subject: "Chemistry",
    question:
      "A solution has a hydrogen ion concentration of 1.0 × 10⁻³ mol dm⁻³. What is its pH?",
    options: ["2", "3", "11", "13"],
    answer: 1,
    explanation:
      "pH = −log[H⁺] = −log(10⁻³) = 3."
  },

  {
    id: "CHE-004",
    subject: "Chemistry",
    question:
      "Which of the following species has the greatest number of unpaired electrons in its ground state?",
    options: ["Na", "Mg", "Cl", "Fe"],
    answer: 3,
    explanation:
      "Iron has the electron configuration [Ar]3d⁶4s². Its 3d⁶ configuration contains four unpaired electrons, more than the other listed atoms."
  },

  {
    id: "CHE-005",
    subject: "Chemistry",
    question:
      "A current of 2.0 A is passed through molten CuCl₂ for 965 s. What mass of copper is deposited? [Cu = 63.5; F = 96500 C mol⁻¹]",
    options: ["0.318 g", "0.635 g", "1.27 g", "2.54 g"],
    answer: 1,
    explanation:
      "Q = It = 2 × 965 = 1930 C. Moles of electrons = 1930/96500 = 0.020 mol. Cu²⁺ + 2e⁻ → Cu, so moles Cu = 0.010 mol. Mass = 0.010 × 63.5 = 0.635 g."
  },

  {
    id: "CHE-006",
    subject: "Chemistry",
    question:
      "Which compound is most likely to undergo nucleophilic substitution readily under ordinary conditions?",
    options: [
      "Ethene",
      "Benzene",
      "Chloroethane",
      "Ethane"
    ],
    answer: 2,
    explanation:
      "Chloroethane contains a polar C–Cl bond, allowing nucleophiles to replace the chlorine atom."
  },

  {
    id: "CHE-007",
    subject: "Chemistry",
    question:
      "What is the oxidation number of chromium in K₂Cr₂O₇?",
    options: ["+3", "+4", "+6", "+7"],
    answer: 2,
    explanation:
      "Let chromium be x. 2(+1) + 2x + 7(−2) = 0. Therefore 2x = 12 and x = +6."
  },

  {
    id: "CHE-008",
    subject: "Chemistry",
    question:
      "Which factor does NOT change the value of an equilibrium constant for a given reaction?",
    options: [
      "Temperature",
      "Pressure",
      "Concentration",
      "Presence of a catalyst"
    ],
    answer: 3,
    explanation:
      "A catalyst changes the rates of forward and reverse reactions equally. It does not alter the equilibrium constant."
  },

  {
    id: "CHE-009",
    subject: "Chemistry",
    question:
      "A gas occupies 600 cm³ at 27°C. What volume will it occupy at 127°C at constant pressure?",
    options: ["400 cm³", "700 cm³", "800 cm³", "900 cm³"],
    answer: 2,
    explanation:
      "Charles' law: V₁/T₁ = V₂/T₂. T₁ = 300 K and T₂ = 400 K. V₂ = 600 × 400/300 = 800 cm³."
  },

  {
    id: "CHE-010",
    subject: "Chemistry",
    question:
      "Which of the following pairs can form a buffer solution?",
    options: [
      "HCl and NaCl",
      "NaOH and KOH",
      "CH₃COOH and CH₃COONa",
      "HNO₃ and KNO₃"
    ],
    answer: 2,
    explanation:
      "A buffer contains a weak acid and its conjugate base, or a weak base and its conjugate acid. Ethanoic acid and sodium ethanoate form an acidic buffer."
  },

  {
    id: "CHE-011",
    subject: "Chemistry",
    question:
      "The rate of a reaction doubles when the temperature is increased from 20°C to 30°C. Which explanation is most appropriate?",
    options: [
      "All molecules become ionized",
      "The activation energy becomes zero",
      "A greater fraction of molecules has energy equal to or greater than the activation energy",
      "The equilibrium constant must become zero"
    ],
    answer: 2,
    explanation:
      "Increasing temperature increases the fraction of molecules possessing energy at least equal to the activation energy, increasing the frequency of successful collisions."
  },

  {
    id: "CHE-012",
    subject: "Chemistry",
    question:
      "Which substance is expected to have the highest boiling point?",
    options: [
      "CH₄",
      "NH₃",
      "H₂O",
      "H₂S"
    ],
    answer: 2,
    explanation:
      "Water forms extensive hydrogen bonds between its molecules, giving it an unusually high boiling point."
  },

  {
    id: "CHE-013",
    subject: "Chemistry",
    question:
      "A 25.0 cm³ sample of 0.100 mol dm⁻³ HCl requires 20.0 cm³ of NaOH for complete neutralization. What is the concentration of the NaOH?",
    options: [
      "0.080 mol dm⁻³",
      "0.100 mol dm⁻³",
      "0.125 mol dm⁻³",
      "0.200 mol dm⁻³"
    ],
    answer: 2,
    explanation:
      "HCl + NaOH → NaCl + H₂O. Moles HCl = 0.100 × 25/1000 = 0.00250 mol. The same number of moles of NaOH is required. Concentration = 0.00250/0.020 = 0.125 mol dm⁻³."
  },

  {
    id: "CHE-014",
    subject: "Chemistry",
    question:
      "Which property generally increases from left to right across a period?",
    options: [
      "Atomic radius",
      "Metallic character",
      "First ionization energy",
      "Number of occupied shells"
    ],
    answer: 2,
    explanation:
      "Across a period, effective nuclear charge increases while electrons are added to the same principal shell, generally increasing first ionization energy."
  },

  {
    id: "CHE-015",
    subject: "Chemistry",
    question:
      "What volume of 0.50 mol dm⁻³ NaOH is required to completely neutralize 25.0 cm³ of 0.20 mol dm⁻³ H₂SO₄?",
    options: ["10 cm³", "20 cm³", "25 cm³", "40 cm³"],
    answer: 1,
    explanation:
      "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Moles H₂SO₄ = 0.20 × 0.025 = 0.005 mol. NaOH required = 0.010 mol. Volume = 0.010/0.50 = 0.020 dm³ = 20 cm³."
  },

  {
    id: "CHE-016",
    subject: "Chemistry",
    question:
      "Which of the following is an example of disproportionation?",
    options: [
      "Na⁺ + Cl⁻ → NaCl",
      "Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O",
      "HCl + NaOH → NaCl + H₂O",
      "CaCO₃ → CaO + CO₂"
    ],
    answer: 1,
    explanation:
      "In the reaction with hot/cold alkali, chlorine is simultaneously reduced to Cl⁻ and oxidized to ClO⁻. This is disproportionation."
  },

  {
    id: "CHE-017",
    subject: "Chemistry",
    question:
      "Which test is most suitable for distinguishing ethene from ethane?",
    options: [
      "Add aqueous sodium hydroxide",
      "Add bromine water",
      "Add dilute hydrochloric acid",
      "Add sodium chloride solution"
    ],
    answer: 1,
    explanation:
      "Ethene contains a C=C double bond and rapidly decolourizes bromine water through an addition reaction. Ethane does not under ordinary conditions."
  },

  {
    id: "CHE-018",
    subject: "Chemistry",
    question:
      "For a reaction with ΔH = −120 kJ mol⁻¹, which statement is correct?",
    options: [
      "The reaction is endothermic",
      "Heat is absorbed from the surroundings",
      "The products have higher enthalpy than the reactants",
      "The reaction releases 120 kJ per mole of reaction"
    ],
    answer: 3,
    explanation:
      "A negative ΔH indicates an exothermic reaction. Therefore 120 kJ of heat is released per mole of reaction as written."
  },

  {
    id: "CHE-019",
    subject: "Chemistry",
    question:
      "Which quantum number primarily determines the shape of an orbital?",
    options: [
      "Principal quantum number, n",
      "Azimuthal quantum number, l",
      "Magnetic quantum number, m",
      "Spin quantum number, s"
    ],
    answer: 1,
    explanation:
      "The azimuthal quantum number l determines the subshell and therefore the orbital shape: s, p, d or f."
  },

  {
    id: "CHE-020",
    subject: "Chemistry",
    question:
      "A reaction has an activation energy of 75 kJ mol⁻¹. Which statement about a catalyst is correct?",
    options: [
      "It increases the activation energy",
      "It decreases the activation energy by providing an alternative pathway",
      "It increases the enthalpy change of the reaction",
      "It changes the equilibrium composition permanently"
    ],
    answer: 1,
    explanation:
      "A catalyst provides an alternative reaction pathway with lower activation energy. It does not change ΔH or the equilibrium constant."
  }
];
