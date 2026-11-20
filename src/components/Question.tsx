import type { Question as QuestionType } from "../types/quiz.types";

interface QuizQuestion extends QuestionType {
  options: string[];
}

interface QuestionProps {
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestion: number;
  selectedAnswer: string | undefined;
  timeLeft: number;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Question({
  currentQuestion,
  currentQuestionIndex,
  totalQuestion,
  selectedAnswer,
  timeLeft,
  onSelectAnswer,
  onNext,
  onPrevious,
}: QuestionProps) {

    const isAnswered = selectedAnswer !== undefined;
    const isLastQuestion = currentQuestionIndex === totalQuestion -1;
    const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress bar */}
      <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
        <span>
          Question {currentQuestionIndex + 1} of {totalQuestion}
        </span>
        <span className="text-purple-400 font-semibold">
          ⏱ {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-linear-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
          style={{
            width: `${((currentQuestionIndex + 1) / totalQuestion) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <h2 className="text-2xl font-bold text-white mt-2">
        {currentQuestion.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === currentQuestion.correct_answer;

          let style =
            "border-gray-700 bg-gray-800/50 hover:border-purple-500 hover:bg-purple-500/10 text-gray-300";

          if (isAnswered) {
            if (isCorrect)
              style = "border-green-500 bg-green-500/10 text-green-400";
            else if (isSelected)
              style = "border-red-500 bg-red-500/10 text-red-400";
            else style = "border-gray-700 bg-gray-800/30 text-gray-500";
          }

          return (
            <button
              key={option}
              onClick={() => onSelectAnswer(option)}
              disabled={isAnswered}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200 ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-2">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className="px-6 py-2 rounded-full border border-gray-700 text-gray-400 hover:border-purple-500 hover:text-purple-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ← Previous
        </button>

        {isAnswered && (
          <button
            onClick={onNext}
            className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all hover:scale-105"
          >
            {isLastQuestion ? "See Results →" : "Next →"}
          </button>
        )}
      </div>
    </div>
  );
}
