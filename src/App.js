import React, { useState, useEffect } from "react";
import StartQuiz from "./Components/startquiz";
import Quiz from "./Components/quiz";
import Result from "./Components/result";
import quizData from "./Json/quizquestions.json";

let interval;
function App() {
  const [menu, setMenu] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (menu === "result") {
      clearInterval(interval);
    }
  }, [menu]);

  // Quiz starting logic
  const quizStartHandler = () => {
    setMenu("quiz");
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  // Restart the Quiz logic
  const resetClickHandler = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setMenu("start");
    setTime(0);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-transparent to-purple-400 flex items-center justify-center">
      {menu === "start" && <StartQuiz onQuizStart={quizStartHandler} />}
      {menu === "quiz" && (
        <Quiz
          data={quizData.data[currentQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={quizData.data.length}
          currentQuestion={currentQuestion}
          onSetCurrentQuestion={setCurrentQuestion}
          onSetMenu={setMenu}
        />
      )}
      {menu === "result" && (
        <Result
          results={answers}
          data={quizData.data}
          onReset={resetClickHandler}
          time={time}
        />
      )}
    </div>
  );
}

export default App;
