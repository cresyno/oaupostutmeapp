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

  if (selectedSubjects.length !== 4) {
    throw new Error("A CBT must contain exactly 4 subjects.");
  }

  if (selectedSubjects[0] !== "Aptitude") {
    throw new Error("Aptitude is compulsory.");
  }

  const optional = selectedSubjects.slice(1);

  if (optional.length !== 3) {
    throw new Error(
      "Please select exactly 3 optional subjects."
    );
  }

  for (const subject of optional) {
    if (!OPTIONAL_SUBJECTS.includes(subject)) {
      throw new Error(`${subject} is not available.`);
    }
  }

  const uniqueSubjects = [...new Set(selectedSubjects)];

  if (uniqueSubjects.length !== 4) {
    throw new Error("Subjects cannot be repeated.");
  }

  const exam = [];

  for (const subject of selectedSubjects) {
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
