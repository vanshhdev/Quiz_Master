interface ResultData{
    totalQuestions:number;
    correctAnswers: number;
    wrongAnswers: number;
    percantage: number;
}

interface ResultScreenProps{
    result: ResultData;
    onRestart: () => void;
}

export default function ResultScreen({
    result,
    onRestart
  }:ResultScreenProps) {

    const {totalQuestions, correctAnswers, wrongAnswers, percantage} = result;

    return (
        <div className="flex flex-col items-center justify-center text-center gap-6">

            <div className="text-7xl">
                {percantage === 100 ? '🏆' : percantage >= 60 ? '🎉' : '📚'}
            </div>

            <h1 className="text-4xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {percantage === 100 ? 'Perfect!' : percantage >= 60 ? 'Great Job!' : 'Keep Practicing!'}
            </h1>

            {/* Score circle */}
            <div className="flex flex-col items-center gap-1 bg-gray-800/50 border border-gray-700 rounded-2xl px-16 py-8">
                <span className="text-6xl font-bold text-purple-400">
                   {correctAnswers}
                </span>
                <p className="text-2xl font-bold text-purple-400">Out of</p>
                <span className="text-6xl font-bold text-purple-400">
                   {totalQuestions}
                </span>
                <span className="text-gray-400 text-sm">Correct Answers</span>
                <span className="text-2xl font-semibold text-cyan-400 mt-2">
                    {percantage}%
                </span>
            </div>

            {/* Answers summary */}
            <div className="flex gap-8">
                <span className="text-green-400 text-sm">Correct :{correctAnswers}</span>
                <span className="text-red-400 text-sm">Wrong :{wrongAnswers}</span>
            </div>

            <button
              onClick={onRestart}
                className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
            >
                Try Again
            </button>

        </div>
    );
}