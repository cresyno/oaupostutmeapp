export const SUBJECTS = [
  "Aptitude",
  "Mathematics",
  "Chemistry",
  "Physics",
];

export function shuffle(items) {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function createExam(questionBank) {
  const exam = [];

  for (const subject of SUBJECTS) {
    const pool = questionBank.filter(
      (question) => question.subject === subject
    );

    if (pool.length < 10) {
      throw new Error(
        `${subject} needs at least 10 questions in the question bank.`
      );
    }

    exam.push(...shuffle(pool).slice(0, 10));
  }

  return shuffle(exam).map((question, index) => ({
    ...question,
    examNumber: index + 1,
  }));
}

export function scoreExam(exam, answers) {
  return exam.reduce((score, question) => {
    return score + (
      answers[question.id] === question.answer ? 1 : 0
    );
  }, 0);
}
