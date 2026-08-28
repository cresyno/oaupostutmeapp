export const SUBJECTS = [
  "Aptitude",
  "Mathematics",
  "Chemistry",
  "Physics",
  "Biology",
];

export const OPTIONAL_SUBJECTS = [
  "Mathematics",
  "Chemistry",
  "Physics",
  "Biology",
];

export const QUESTIONS_PER_SUBJECT = 10;
export const TOTAL_QUESTIONS = 40;

export function shuffle(items) {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function createExam(questionBank, selectedSubjects) {
  if (!Array.isArray(selectedSubjects)) {
    throw new Error("Please select your subjects.");
  }

  if (selectedSubjects.length !== 3) {
    throw new Error(
      "You must select exactly 3 optional subjects."
    );
  }

  const subjects = ["Aptitude", ...selectedSubjects];

  const uniqueSubjects = [...new Set(subjects)];

  if (uniqueSubjects.length !== 4) {
    throw new Error(
      "Each subject can only be selected once."
    );
  }

  for (const subject of selectedSubjects) {
    if (!OPTIONAL_SUBJECTS.includes(subject)) {
      throw new Error(
        `${subject} is not an available optional subject.`
      );
    }
  }

  const exam = [];

  for (const subject of subjects) {
    const pool = questionBank.filter(
      (question) => question.subject === subject
    );

    if (pool.length < QUESTIONS_PER_SUBJECT) {
      throw new Error(
        `${subject} needs at least ${QUESTIONS_PER_SUBJECT} questions.`
      );
    }

    exam.push(
      ...shuffle(pool).slice(0, QUESTIONS_PER_SUBJECT)
    );
  }

  return shuffle(exam).map((question, index) => ({
    ...question,
    examNumber: index + 1,
  }));
}

export function scoreExam(exam, answers) {
  return exam.reduce(
    (score, question) =>
      score +
      (answers[question.id] === question.answer ? 1 : 0),
    0
  );
}
