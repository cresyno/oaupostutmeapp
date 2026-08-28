export const mathematicsQuestions = [
  {
    id: "MAT-001",
    subject: "Mathematics",
    question:
      "Given the matrix $A=\\begin{pmatrix}2&1\\\\3&4\\end{pmatrix}$, find $\\det(A)$.",
    options: ["5", "8", "11", "13"],
    answer: 0,
    explanation:
      "For a 2 × 2 matrix, det(A) = ad − bc. Therefore, det(A) = (2)(4) − (1)(3) = 5."
  },

  {
    id: "MAT-002",
    subject: "Mathematics",
    question:
      "If $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$ and $B=\\begin{pmatrix}2&0\\\\1&3\\end{pmatrix}$, find $AB$.",
    options: [
      "$\\begin{pmatrix}4&6\\\\10&12\\end{pmatrix}$",
      "$\\begin{pmatrix}4&6\\\\7&12\\end{pmatrix}$",
      "$\\begin{pmatrix}3&6\\\\7&12\\end{pmatrix}$",
      "$\\begin{pmatrix}2&6\\\\6&12\\end{pmatrix}$"
    ],
    answer: 1,
    explanation:
      "Multiply rows of A by columns of B: AB = [[1(2)+2(1), 1(0)+2(3)], [3(2)+4(1), 3(0)+4(3)]] = [[4,6],[10,12]]."
  },

  {
    id: "MAT-003",
    subject: "Mathematics",
    question:
      "Solve $2x^2-7x+3=0$.",
    options: [
      "$x=3,\\frac12$",
      "$x=-3,-\\frac12$",
      "$x=1,3$",
      "$x=-1,\\frac32$"
    ],
    answer: 0,
    explanation:
      "Factorise: 2x² − 7x + 3 = (2x − 1)(x − 3). Hence x = 1/2 or x = 3."
  },

  {
    id: "MAT-004",
    subject: "Mathematics",
    question:
      "If $\\log_2(x-1)=3$, find $x$.",
    options: ["7", "8", "9", "10"],
    answer: 2,
    explanation:
      "log₂(x − 1) = 3 means x − 1 = 2³ = 8. Therefore x = 9."
  },

  {
    id: "MAT-005",
    subject: "Mathematics",
    question:
      "Evaluate $\\frac{3}{4}\\div\\frac{9}{16}$.",
    options: ["$\\frac13$", "$\\frac43$", "$\\frac53$", "$\\frac43$"],
    answer: 1,
    explanation:
      "Dividing by a fraction means multiplying by its reciprocal: (3/4) × (16/9) = 4/3."
  },

  {
    id: "MAT-006",
    subject: "Mathematics",
    question:
      "The roots of $x^2-5x+k=0$ differ by 1. Find $k$.",
    options: ["4", "5", "6", "7"],
    answer: 2,
    explanation:
      "Let the roots be a and a+1. Their sum is 5, giving a = 2 and a+1 = 3. Their product is therefore k = 6."
  },

  {
    id: "MAT-007",
    subject: "Mathematics",
    question:
      "If $\\sin\\theta=\\frac35$ and $\\theta$ is acute, find $\\cos\\theta$.",
    options: [
      "$\\frac25$",
      "$\\frac34$",
      "$\\frac45$",
      "$\\frac54$"
    ],
    answer: 2,
    explanation:
      "Using sin²θ + cos²θ = 1: cos²θ = 1 − 9/25 = 16/25. Since θ is acute, cosθ = 4/5."
  },

  {
    id: "MAT-008",
    subject: "Mathematics",
    question:
      "Find the coefficient of $x^2$ in $(2+x)^5$.",
    options: ["20", "30", "40", "50"],
    answer: 1,
    explanation:
      "The x² term is C(5,2)(2³)x² = 10 × 8 x² = 80x². Therefore the coefficient is 80."
  },

  {
    id: "MAT-009",
    subject: "Mathematics",
    question:
      "If the first term of an arithmetic progression is 7 and its common difference is 4, find the 15th term.",
    options: ["59", "63", "67", "71"],
    answer: 2,
    explanation:
      "Tₙ = a + (n−1)d = 7 + 14(4) = 63."
  },

  {
    id: "MAT-010",
    subject: "Mathematics",
    question:
      "A geometric progression has first term 3 and common ratio 2. Find the sum of its first 6 terms.",
    options: ["96", "126", "189", "192"],
    answer: 2,
    explanation:
      "Sₙ = a(rⁿ−1)/(r−1) = 3(2⁶−1) = 3(63) = 189."
  },

  {
    id: "MAT-011",
    subject: "Mathematics",
    question:
      "Find the gradient of the line passing through $(2,5)$ and $(6,13)$.",
    options: ["1", "2", "3", "4"],
    answer: 1,
    explanation:
      "Gradient = (13−5)/(6−2) = 8/4 = 2."
  },

  {
    id: "MAT-012",
    subject: "Mathematics",
    question:
      "The equation of a circle is $x^2+y^2-6x+4y-12=0$. Find its radius.",
    options: ["3", "4", "5", "6"],
    answer: 2,
    explanation:
      "Completing the square gives (x−3)² + (y+2)² = 25. Therefore the radius is 5."
  },

  {
    id: "MAT-013",
    subject: "Mathematics",
    question:
      "Evaluate $\\lim_{x\\to2}\\frac{x^2-4}{x-2}$.",
    options: ["2", "4", "6", "8"],
    answer: 1,
    explanation:
      "Factor x²−4 = (x−2)(x+2). Cancelling gives x+2, whose limit as x→2 is 4."
  },

  {
    id: "MAT-014",
    subject: "Mathematics",
    question:
      "If $f(x)=x^3-4x^2+7x$, find $f'(2)$.",
    options: ["1", "3", "5", "7"],
    answer: 2,
    explanation:
      "f'(x)=3x²−8x+7. Thus f'(2)=12−16+7=3."
  },

  {
    id: "MAT-015",
    subject: "Mathematics",
    question:
      "Evaluate $\\int_0^2(3x^2+2x)\\,dx$.",
    options: ["8", "10", "12", "14"],
    answer: 2,
    explanation:
      "The integral is [x³+x²]₀² = 8+4 = 12."
  },

  {
    id: "MAT-016",
    subject: "Mathematics",
    question:
      "A fair die is thrown twice. What is the probability that the sum obtained is 9?",
    options: [
      "$\\frac1{12}$",
      "$\\frac19$",
      "$\\frac5{36}$",
      "$\\frac16$"
    ],
    answer: 1,
    explanation:
      "The possible pairs are (3,6), (4,5), (5,4), and (6,3): 4 outcomes out of 36. Probability = 4/36 = 1/9."
  },

  {
    id: "MAT-017",
    subject: "Mathematics",
    question:
      "How many different arrangements can be made from the letters of the word LEVEL?",
    options: ["20", "30", "60", "120"],
    answer: 1,
    explanation:
      "LEVEL has 5 letters, with L repeated twice and E repeated twice. Number = 5!/(2!2!) = 30."
  },

  {
    id: "MAT-018",
    subject: "Mathematics",
    question:
      "If $|2x-5|=7$, find the sum of the possible values of $x$.",
    options: ["4", "5", "6", "7"],
    answer: 2,
    explanation:
      "2x−5=7 gives x=6; 2x−5=−7 gives x=−1. Their sum is 5."
  },

  {
    id: "MAT-019",
    subject: "Mathematics",
    question:
      "The mean of five numbers is 18. If one number is removed, the mean of the remaining four is 16. What number was removed?",
    options: ["24", "25", "26", "28"],
    answer: 2,
    explanation:
      "Original total = 5×18=90. Remaining total = 4×16=64. Removed number = 90−64=26."
  },

  {
    id: "MAT-020",
    subject: "Mathematics",
    question:
      "A matrix $A$ is such that $A^2=I$, where $I$ is the identity matrix. Which statement is necessarily true?",
    options: [
      "$A=I$",
      "$A=-I$",
      "$A^{-1}=A$",
      "$A^{-1}=I$"
    ],
    answer: 2,
    explanation:
      "Since A²=I, multiplying by A⁻¹ gives A=A⁻¹. Thus A is its own inverse."
  }
];
