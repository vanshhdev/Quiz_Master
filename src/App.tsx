import './App.css'
import StartScreen from "./components/StartScreen"
import Question from './components/Question'
import ResultScreen from './components/ResultScreen'
import { useQuiz } from './hooks/useQuiz'

function App() {

  const {
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
    isComplete,
    getResult,
    restartQuiz,
  } = useQuiz();

  if(status === "loading"){
    return (
      <main className='min-h-screen bg-gray-950 text-white flex items-center justify-center'>
        Loading Questions....
      </main>
    )
  }

  if(status === "error"){
    return (
      <main className='min-h-screen bg-gray-950 text-white flex flex-col gap-4 items-center justify-center'>
       <p className=' text-red-400'>{error}</p>
       <button onClick={restartQuiz} className='bg-purple-600 px-6 py-3 rounded-full'>Try Again...</button>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gray-950 text-white flex items-center justify-center p-5'>
      <div className='w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-10'>
        {status === "idle" && (
          <StartScreen onStart={startQuiz} />
        )}

        {status === "success" && !isComplete && (
          <Question
          currentQuestion={questions[currentIndex]}
          currentQuestionIndex={currentIndex}
          totalQuestion={questions.length}
          selectedAnswer={answer[currentIndex]}
          timeLeft={timeLeft}
          onSelectAnswer={selectAnswer}
          onNext={nextQuestion}
          onPrevious={previousQueestion}
          />
        )}

        {status === "success" && isComplete && (
          <ResultScreen
          result={getResult()}
          onRestart={restartQuiz}
          />
        )}

      </div>
    </main>
  )
}

export default App
