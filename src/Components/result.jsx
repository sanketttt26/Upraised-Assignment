import React, { useEffect, useState } from 'react';
import { formatTime } from '../Utils/formattime';
import Quiz_Bubbles from '../Icons/quiz_bubbles.svg';
import Result_Ani from '../Icons/result_ani.svg';
import Speedometer from 'react-d3-speedometer';

const Result = ({ results, data, onReset, time }) => {
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [endTime, setEndTime] = useState('');
  
    useEffect(() => {
      if (time) {
        setEndTime(formatTime(time));
      }
    }, [time]);
  
    useEffect(() => {
      let correct = 0;
      results.forEach((result, index) => {
        if (result.a === data[index].answer) correct++;
      });
      setCorrectAnswers(correct);
    }, [results, data]);
  
    return (
      <div className="relative w-full h-full bg-gradient-to-b from-transparent to-purple-300 flex flex-col items-center">
        {/* Top Bubbles Icon */}
        <img src={Quiz_Bubbles} alt="Quiz Bubbles" className="w-1/2 sm:w-1/3 lg:w-1/4 mt-4" />
        
        {/* Result Card */}
        <div className="bg-white w-full max-w-lg rounded-t-3xl shadow-lg mt-8 p-6 flex flex-col items-center">
          {/* Title */}
          <h3 className="text-2xl sm:text-4xl font-bold mb-8 items-center">Your Result</h3>
          
          {/* Speedometer Section */}
          <div className="relative mb-12 flex items-center justify-center">
            <Speedometer
              width={240}
              height={180}  // Adjusted to improve visual alignment
              minValue={0}
              maxValue={100}
              needleHeightRatio={1}
              needleWidthRatio={2}
              startColor="red"
              endColor="green"
              ringWidth={15}
              segments={50}
              value={Math.floor((correctAnswers / data.length) * 100)}
              maxSegmentLabels={0}
              needleColor="#000080"
            />
            {/* Result Animation Background */}
            <img 
              src={Result_Ani} 
              alt="Result Animation" 
              className="absolute w-full h-full top-0 left-0 object-cover opacity-30 pointer-events-none" 
            />
          </div>

          {/* Stats Section */}
          <div className="flex flex-col items-center mb-6 gap-8">
            {/* Correct */}
            <div className="text-center px-4">
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
              <h5 className="text-lg sm:text-3xl">{correctAnswers}</h5>
              <h6 className="text-sm sm:text-lg opacity-60">Correct</h6>
            </div>
            {/* Incorrect */}
            <div className="text-center px-4">
              <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
              <h5 className="text-lg sm:text-3xl">{data.length - correctAnswers}</h5>
              <h6 className="text-sm sm:text-lg opacity-60"> Incorrect</h6>
            </div>
            {/* Time */}
            <div className="text-center px-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
              <h5 className="text-lg sm:text-3xl">{endTime}</h5>
              <h6 className="text-sm sm:text-lg opacity-60">Your total time</h6>
            </div>
          </div>

          {/* Reset Button */}
          <button
            className="bg-red-500 text-white font-bold text-lg sm:text-xl py-4 w-full rounded-xl hover:bg-red-600 transition-all"
            onClick={onReset}
          >
            Start Again
          </button>
        </div>
      </div>
    );
  };
  
  export default Result;

