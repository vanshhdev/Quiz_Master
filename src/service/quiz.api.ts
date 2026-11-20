import he from "he";
import type { QuizResponse } from "../types/quiz.types";

export type Difficulty = "easy" | "medium" | "hard";

export interface QuizSetting{
  category: number;
  difficulty: Difficulty;
  amount: number;
}


export const fetchQuestion = async ({
  category,
  difficulty,
  amount,
}:QuizSetting): Promise<QuizResponse> => {

  const params = new URLSearchParams({
    amount:String(amount),
    category:String(category),
    difficulty,
    type:"multiple",
  });

  const API_URL = `https://opentdb.com/api.php?${params}`;
  try {
    const response = await fetch(API_URL);

    if(!response.ok){
      throw new Error("failed to fetch questions");
    }

    const data: QuizResponse = await response.json();

    if(data.response_code !== 0){
      throw new Error("unable to load to quiz questions");
    }

    const decodedQuestions = 
    data.results.map((question) => ({
      ...question,

      question:
      he.decode(question.question),

      correct_answer:
      he.decode(question.correct_answer),

      incorrect_answers:
      question.incorrect_answers.map((answer) => 
      he.decode(answer)
    ),
    }));

    return {
      ...data,
      results: decodedQuestions,
    }
  } catch (error: unknown) {
    if(error instanceof Error){
      throw new Error(error.message);
    }
    
    throw new Error("somthing went wrong");
  }
};
