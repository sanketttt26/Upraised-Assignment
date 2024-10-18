import React from 'react';
import Logo from '../Icons/logo.svg';
import Quiz_Logo from '../Icons/quiz.svg';

const StartQuiz = ({ onQuizStart }) => {
  return (
    <div className="flex flex-col w-4/12 items-center justify-between h-screen bg-gradient-to-b from-transparent to-purple-500">
      
      {/* Logo at the top */}
      <div className="mt-8">
        <img className="w-40" src={Logo} alt="Logo" />
      </div>
      
      {/* Quiz logo in the center */}
      <div className="flex justify-center items-center flex-">
        <img className="w-48 h-48 " src={Quiz_Logo} alt="Quiz Logo" />
      </div>
      
      {/* Start button at the bottom */}
      <div className="mb-10 w-full flex justify-center">
        <button
          className="bg-red-500 text-white font-bold text-2xl py-3 px-16 rounded-full hover:bg-red-600 transition duration-300 ease-in-out shadow-lg"
          onClick={onQuizStart}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartQuiz;
