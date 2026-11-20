import { useState } from "react";

interface StartScreenProps {
  onStart: (settings: QuizSettings) => void;
}

export interface QuizSettings {
  category: number;
  difficulty: "easy" | "medium" | "hard";
  amount: number;
}

const categories = [
  { id: 18, name: "Science: Computers" },
  { id: 9, name: "General Knowledge" },
  { id: 17, name: "Science & Nature" },
  { id: 21, name: "Sports" },
  { id: 23, name: "History" },
  { id: 22, name: "Geography" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
];

export default function StartScreen({ onStart }: StartScreenProps) {
  const [category, setCategory] = useState(18);
  const [difficulty, setDifficulty] =
    useState<QuizSettings["difficulty"]>("easy");
  const [amount, setAmount] = useState(20);

  const handleStart = () => {
    onStart({
      category,
      difficulty,
      amount,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
      {/* Header */}
      <div className="text-center">
        <div className="text-6xl mb-4">🧠</div>

        <h1 className="text-5xl font-extrabold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Quiz Master
        </h1>

        <p className="text-gray-400 mt-3">
          Test your knowledge across questions
        </p>
      </div>

      {/* Settings Card */}
      <div className="w-full bg-gray-900/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 md:p-10 shadow-2xl shadow-purple-900/20">
        {/* Category and Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-semibold mb-3">
              📚 Select Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-4 outline-none focus:border-purple-500"
            >
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-semibold mb-3">
              ⚡ Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as QuizSettings["difficulty"])
              }
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-4 outline-none focus:border-purple-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Question Count */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-white font-semibold">
              📝 Number of Questions
            </label>

            <span className="text-purple-400 font-bold text-xl">{amount}</span>
          </div>

          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />

          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>5 Questions</span>
            <span>50 Questions</span>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleStart}
            className="px-12 py-4 rounded-full bg-linear-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            ▶️ Start Quiz →
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          🏆 Choose your settings and begin your challenge
        </p>
      </div>
    </div>
  );
}
