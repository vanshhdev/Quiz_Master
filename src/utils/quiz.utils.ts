import type { Question } from "../types/quiz.types";

export const shuffleOptions = (question: Question): string[] => {
  const options = [...question.incorrect_answers, question.correct_answer];

  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [options[i], options[j]] = [options[j], options[i]];
  }

  return options;
};
