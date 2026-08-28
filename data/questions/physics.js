export const physicsQuestions = [
  {
    id: "PHY-001",
    subject: "Physics",
    question: "A particle moves from rest with a constant acceleration of 4 m s⁻². What distance does it cover in the fifth second?",
    options: ["18 m", "20 m", "22 m", "24 m"],
    answer: 2,
    explanation: "Distance in the nth second is sₙ = u + ½a(2n−1). For n=5: 0 + ½(4)(9) = 18 m."
  },
  {
    id: "PHY-002",
    subject: "Physics",
    question: "A 2 kg body moving at 6 m s⁻¹ collides with a stationary 4 kg body and they move together. What is their common velocity?",
    options: ["1 m s⁻¹", "2 m s⁻¹", "3 m s⁻¹", "4 m s⁻¹"],
    answer: 1,
    explanation: "Conservation of momentum: (2)(6) + (4)(0) = (2+4)v. Therefore v = 2 m s⁻¹."
  },
  {
    id: "PHY-003",
    subject: "Physics",
    question: "A stone is projected vertically upward at 20 m s⁻¹. Taking g = 10 m s⁻², what maximum height does it reach?",
    options: ["10 m", "20 m", "30 m", "40 m"],
    answer: 1,
    explanation: "At maximum height v=0. Using v²=u²−2gh: 0=400−20h, so h=20 m."
  },
  {
    id: "PHY-004",
    subject: "Physics",
    question: "A force of 50 N acts on a body through a distance of 8 m in the direction of the force. What work is done?",
    options: ["58 J", "250 J", "400 J", "800 J"],
    answer: 2,
    explanation: "W = Fs cos θ. Since θ=0°, W=50×8=400 J."
  },
  {
    id: "PHY-005",
    subject: "Physics",
    question: "A machine receives 500 J of energy and produces 350 J of useful output. What is its efficiency?",
    options: ["50%", "60%", "70%", "85%"],
    answer: 2,
    explanation: "Efficiency = useful output/input ×100 = 350/500 ×100 = 70%."
  },
  {
    id: "PHY-006",
    subject: "Physics",
    question: "Two resistors of 6 Ω and 3 Ω are connected in parallel. What is their effective resistance?",
    options: ["1 Ω", "2 Ω", "3 Ω", "9 Ω"],
    answer: 1,
    explanation: "1/R = 1/6 + 1/3 = 3/6 = 1/2. Hence R=2 Ω."
  },
  {
    id: "PHY-007",
    subject: "Physics",
    question: "A 12 V battery is connected across a 4 Ω resistor. What current flows through the resistor?",
    options: ["0.33 A", "2 A", "3 A", "48 A"],
    answer: 2,
    explanation: "Ohm's law: I=V/R=12/4=3 A."
  },
  {
    id: "PHY-008",
    subject: "Physics",
    question: "A 60 W lamp operates continuously for 5 hours. How much electrical energy does it consume?",
    options: ["0.012 kWh", "0.30 kWh", "3.0 kWh", "12 kWh"],
    answer: 1,
    explanation: "Energy = power × time = 0.060 kW × 5 h = 0.30 kWh."
  },
  {
    id: "PHY-009",
    subject: "Physics",
    question: "A wave has frequency 500 Hz and wavelength 0.68 m. What is its speed?",
    options: ["340 m s⁻¹", "500 m s⁻¹", "735 m s⁻¹", "850 m s⁻¹"],
    answer: 0,
    explanation: "v=fλ=500×0.68=340 m s⁻¹."
  },
  {
    id: "PHY-010",
    subject: "Physics",
    question: "An object is placed 30 cm in front of a converging lens of focal length 10 cm. What is the image distance?",
    options: ["10 cm", "15 cm", "20 cm", "30 cm"],
    answer: 1,
    explanation: "Using 1/f = 1/u + 1/v: 1/10 = 1/30 + 1/v. Therefore 1/v=1/15, so v=15 cm."
  },
  {
    id: "PHY-011",
    subject: "Physics",
    question: "A projectile is fired horizontally from a height of 45 m. Taking g=10 m s⁻², how long does it take to reach the ground?",
    options: ["2 s", "3 s", "4 s", "4.5 s"],
    answer: 1,
    explanation: "Vertical motion: h=½gt². 45=5t², so t=3 s."
  },
  {
    id: "PHY-012",
    subject: "Physics",
    question: "A body of mass 5 kg is lifted vertically through 4 m. Taking g=10 m s⁻², what increase in gravitational potential energy occurs?",
    options: ["20 J", "50 J", "100 J", "200 J"],
    answer: 3,
    explanation: "GPE=mgh=5×10×4=200 J."
  },
  {
    id: "PHY-013",
    subject: "Physics",
    question: "A gas at constant volume has a pressure of 100 kPa at 300 K. What will its pressure be at 450 K?",
    options: ["125 kPa", "150 kPa", "200 kPa", "300 kPa"],
    answer: 1,
    explanation: "At constant volume, P/T is constant. P₂=100×450/300=150 kPa."
  },
  {
    id: "PHY-014",
    subject: "Physics",
    question: "A metal rod of length 2 m has a linear expansivity of 1.2×10⁻⁵ K⁻¹. What is its increase in length for a temperature rise of 100 K?",
    options: ["0.00024 m", "0.0012 m", "0.0024 m", "0.024 m"],
    answer: 2,
    explanation: "ΔL=αLΔT=(1.2×10⁻⁵)(2)(100)=0.0024 m."
  },
  {
    id: "PHY-015",
    subject: "Physics",
    question: "A 2 kg object moving at 10 m s⁻¹ has what kinetic energy?",
    options: ["20 J", "50 J", "100 J", "200 J"],
    answer: 2,
    explanation: "KE=½mv²=½(2)(100)=100 J."
  },
  {
    id: "PHY-016",
    subject: "Physics",
    question: "A satellite moves in a circular orbit around Earth. Which force provides the centripetal force?",
    options: ["Magnetic force", "Gravitational force", "Electrostatic force", "Frictional force"],
    answer: 1,
    explanation: "Earth's gravitational attraction provides the centripetal force required to maintain the satellite's orbit."
  },
  {
    id: "PHY-017",
    subject: "Physics",
    question: "A transformer has 500 turns in its primary coil and 100 turns in its secondary coil. If the primary voltage is 240 V, what is the secondary voltage?",
    options: ["24 V", "48 V", "120 V", "480 V"],
    answer: 1,
    explanation: "Vs/Vp=Ns/Np=100/500. Therefore Vs=240×1/5=48 V."
  },
  {
    id: "PHY-018",
    subject: "Physics",
    question: "A radioactive sample has a half-life of 6 hours. What fraction remains after 18 hours?",
    options: ["1/2", "1/4", "1/8", "1/16"],
    answer: 2,
    explanation: "18 hours represents 3 half-lives. Remaining fraction = (1/2)³ = 1/8."
  },
  {
    id: "PHY-019",
    subject: "Physics",
    question: "Which phenomenon provides strong evidence for the wave nature of light?",
    options: ["Photoelectric effect", "Interference", "Thermionic emission", "Electron emission"],
    answer: 1,
    explanation: "Interference is a characteristic wave phenomenon and demonstrates the wave nature of light."
  },
  {
    id: "PHY-020",
    subject: "Physics",
    question: "A charged particle moves perpendicular to a uniform magnetic field. Which quantity changes continuously while its speed remains constant?",
    options: ["Mass", "Kinetic energy", "Direction of velocity", "Magnitude of momentum"],
    answer: 2,
    explanation: "The magnetic force is perpendicular to the velocity, so it changes the direction of motion but does no work. The speed and kinetic energy remain constant."
  }
];
