import type { Question, QuizeStatus } from "../types/quiz.types";
import { fetchQuestion, type QuizSetting } from "../service/quiz.api";
import { shuffleOptions } from "../utils/quiz.utils";
import { useEffect, useState } from "react";

interface QuizQuestion extends Question {
  options: string[];
}

export const useQuiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<QuizeStatus>("idle");
  const [lastSettings, setLastSettings] = useState<QuizSetting | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(20);

  const startQuiz = async (settings:QuizSetting):Promise<void> => {

    try {
        setStatus("loading");
        setError(null);
        setLastSettings(settings)

        const data = await fetchQuestion(settings);

        const formattedQuestions: QuizQuestion[] = data.results.map(
            (question) => ({
                ...question,
                options: shuffleOptions(question),
            })
        );

        setQuestions(formattedQuestions);
        setCurrentIndex(0);
        setAnswer({});
        setStatus("success");
    } catch (error:unknown) {
        setStatus('error');
        setError(
            error instanceof Error ? error.message :
            "somthing went wrong"
        );
    }
  }

  const restartQuiz = ():void => {
    if(lastSettings){
      startQuiz(lastSettings);
    }
  };


  const selectAnswer = (answer:string): void => {
    setAnswer((previous) => ({
        ...previous,
        [currentIndex]:answer,
    }));
  };

  const nextQuestion = ():void => {
    if(currentIndex < questions.length - 1){
      setCurrentIndex((previous) => previous+1);
      setTimeLeft(20);
    }else{
        setCurrentIndex(questions.length);
    }
  }

  const previousQueestion = ():void => {
    if(currentIndex >0){
    setCurrentIndex((previous) => previous-1);
    setTimeLeft(20);
    }
  }; 

  useEffect(() => {
    if(status !== "success" || currentIndex >= questions.length || answer[currentIndex] !== undefined){
        return;
    }

    if(timeLeft === 0){
        nextQuestion();
        return;
    }

    const timer = setTimeout(() => {
        setTimeLeft((previus) => previus-1);
    },1000);

    return () => clearTimeout(timer);
  },[timeLeft, status, currentIndex, questions.length, answer]);

  const calculateScore = ():number => {
    return questions.reduce((score, question, index) => {
        return answer[index] === question.correct_answer ? score +1 : score;
    }, 0);
  }

  const getResult = () => {
    const score = calculateScore();

    return {
        totalQuestions: questions.length,
        correctAnswers:score,
        wrongAnswers:questions.length - score,
        percantage: Math.round((score/questions.length) * 100),
    }
  }

  const isComplete = currentIndex >= questions.length;

  return {
    questions,
    currentIndex,
    answer,
    status,
    error,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQueestion,
    timeLeft,
    calculateScore,
    isComplete,
    getResult,
    restartQuiz,
  };
};
