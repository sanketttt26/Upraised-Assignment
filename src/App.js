import React, { useState, useEffect } from 'react';
import StartQuiz from './Components/startquiz';
import Quiz from './Components/quiz';
import Result from './Components/result';
import quizData from './Json/quizquestions.json';

let interval;
function App() {
  const [menu, setMenu] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (menu === 'result') {
      clearInterval(interval);
    }
  }, [menu]);

  // Quiz starting logic
  const quizStartHandler = () => {
    setMenu('quiz');
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  // Restart the Quiz logic
  const resetClickHandler = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setMenu('start');
    setTime(0);
  };

  return (
  <div className="w-full h-screen bg-gradient-to-b from-transparent to-purple-400 flex items-center justify-center">
    {menu === 'start' && <StartQuiz onQuizStart={quizStartHandler} />}
    {menu === 'quiz' && (
      <Quiz
        data={quizData.data[currentQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={quizData.data.length}
        currentQuestion={currentQuestion}
        onSetCurrentQuestion={setCurrentQuestion}
        onSetMenu={setMenu}
      />
    )}
    {menu === 'result' && (
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

// -----------------Above code is used for manually adding questions in quizquestions.js file 
// ------------------------------Below code uses API to fetch questions 

// import React, { useState, useEffect } from 'react';
// import StartQuiz from './Components/startquiz';
// import Quiz from './Components/quiz';
// import Result from './Components/result';

// let interval;

// function App() {
//   const [menu, setMenu] = useState('start');
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [time, setTime] = useState(0);
//   const [quizData, setQuizData] = useState([]); // State to hold fetched quiz data
//   const [loading, setLoading] = useState(true); // State to manage loading status

//   useEffect(() => {
//     // Fetch quiz questions from the Open Trivia Database API
//     const fetchQuizData = async () => {
//       try {
//         const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
//         const data = await response.json();
        
//         // Map through the fetched questions to format them
//         const formattedData = data.results.map((item, index) => ({
//           question: item.question,
//           options: [...item.incorrect_answers, item.correct_answer], // Combine correct and incorrect answers
//           answer: item.correct_answer, // Store the correct answer
//           id: index // Optionally store the question ID or index
//         }));
        
//         setQuizData(formattedData); // Update the quizData state with formatted questions
//         setLoading(false); // Set loading to false once data is fetched
//       } catch (error) {
//         console.error("Error fetching quiz data:", error);
//         setLoading(false); // Ensure loading is false even if there's an error
//       }
//     };

//     fetchQuizData();
//   }, []); // Empty dependency array means this runs once on component mount

//   useEffect(() => {
//     if (menu === 'result') {
//       clearInterval(interval);
//     }
//   }, [menu]);

//   // Quiz starting logic
//   const quizStartHandler = () => {
//     setMenu('quiz');
//     setTime(0);
//     interval = setInterval(() => {
//       setTime((prevTime) => prevTime + 1);
//     }, 1000);
//   };

//   // Restart the Quiz logic
//   const resetClickHandler = () => {
//     setCurrentQuestion(0);
//     setAnswers([]);
//     setMenu('start');
//     setTime(0);
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Optional loading state
//   }

//   return (
//     <div className="w-full h-screen bg-gradient-to-b from-transparent to-purple-400 flex items-center justify-center">
//       {menu === 'start' && <StartQuiz onQuizStart={quizStartHandler} />}
//       {menu === 'quiz' && (
//         <Quiz
//           data={quizData[currentQuestion]} // Use fetched quiz data
//           onAnswerUpdate={setAnswers}
//           numberOfQuestions={quizData.length} // Update to use length of fetched data
//           currentQuestion={currentQuestion}
//           onSetCurrentQuestion={setCurrentQuestion}
//           onSetMenu={setMenu}
//         />
//       )}
//       {menu === 'result' && (
//         <Result
//           results={answers}
//           data={quizData} // Use fetched quiz data
//           onReset={resetClickHandler}
//           time={time}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
