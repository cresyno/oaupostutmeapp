export const SUBJECTS = [
  "Aptitude",
  "Mathematics",
  "Chemistry",
  "Physics",
];

export function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function createExam(questionBank) {
  const exam = SUBJECTS.flatMap((subject) => {
    const subjectQuestions = questionBank.filter(
      (question) => question.subject === subject
    );

    if (subjectQuestions.length < 10) {
      throw new Error(
        `${subject} needs at least 10 questions in the question bank.`
      );
    }

    return shuffle(subjectQuestions).slice(0, 10);
  });

  return shuffle(exam).map((question, index) => ({
    ...question,
    examNumber: index + 1,
  }));
}

export function calculateScore(questions, answers) {
  return questions.reduce((score, question) => {
    return score + (answers[question.id] === question.answer ? 1 : 0);
  }, 0);
}
