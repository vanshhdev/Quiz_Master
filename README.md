🧠 Quiz Master

Test Your Knowledge. Challenge Yourself. Master the Quiz!

Quiz Master is a modern, interactive quiz application built with React, TypeScript, and Tailwind CSS. It allows users to customize their quiz experience by selecting a category, difficulty level, and number of questions.

Questions are fetched dynamically from the Open Trivia Database API, making every quiz session an engaging experience.

---

✨ Features

- 🎯 Dynamic Categories – Choose from multiple quiz categories.
- ⚡ Difficulty Selection – Easy, Medium, and Hard modes.
- 🔢 Custom Question Count – Select 5 to 50 questions.
- ⏱️ Countdown Timer – 20 seconds for each question.
- 🎲 Shuffled Options – Answer options are randomized.
- 📊 Score Calculation – Track correct and incorrect answers.
- 🏆 Result Screen – View your final score and percentage.
- 🔄 Try Again – Restart the quiz using your previous settings.
- 📱 Responsive UI – Clean interface with a modern dark theme.

---

🛠️ Tech Stack

Technology| Purpose
React| UI Development
TypeScript| Type Safety
Tailwind CSS| Styling
React Hooks| State & Lifecycle Management
Open Trivia DB API| Quiz Questions
Lucide React| Icons
Vite| Development & Build Tool

---

🌐 API Integration

Quiz Master uses the free "Open Trivia Database API" (https://opentdb.com/api_config.php).

The API URL is generated dynamically based on the user's selected settings.

Example:

https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple

Supported parameters:

- "amount" – Number of questions
- "category" – Selected quiz category
- "difficulty" – Easy, Medium, or Hard
- "type" – Multiple-choice questions

---

🚀 Getting Started

1. Clone the Repository

git clone (https://github.com/vs6905397-star/Quiz_Master)

2. Navigate to Project

cd quiz-app

3. Install Dependencies

npm install

4. Start Development Server

npm run dev

Open the local URL provided by Vite in your browser.

---

📂 Project Structure

src/
├── components/
│   ├── StartScreen.tsx
│   ├── Question.tsx
│   └── ResultScreen.tsx
│
├── hooks/
│   └── useQuiz.ts
│
├── service/
│   └── quiz.api.ts
│
├── types/
│   └── quiz.types.ts
│
├── utils/
│   └── quiz.utils.ts
│
├── App.tsx
└── main.tsx

---

💡 What I Practiced

Building this project helped me practice:

- TypeScript interfaces and type aliases
- Union types and function typing
- Typed React state using "useState"
- Custom React Hooks
- Async/Await and API integration
- Error handling with Try/Catch
- Array methods such as "map()" and "reduce()"
- Dynamic URL generation
- Props and component communication
- Managing application state and timer logic

---

🎨 UI Theme

Modern dark interface with purple and cyan gradients, glassmorphism effects, and interactive quiz components.

---

👨‍💻 Developer

Vansh Sharma

Built with ❤️ using React + TypeScript.

---


⭐ If you like this project, consider giving it a star!
