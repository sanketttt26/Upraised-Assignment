import React, { useState, useEffect, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Quiz_Bubbles from '../Icons/quiz_bubbles.svg';
import Next_Arrow from '../Icons/next.svg';

const Quiz = ({
    data,
    onAnswerUpdate,
    numberOfQuestions,
    currentQuestion,
    onSetCurrentQuestion,
    onSetMenu,
}) => {
    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    const radiosWrapper = useRef();
    const [key, setKey] = useState(0);

    useEffect(() => {
        const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
        if (findCheckedInput) {
            findCheckedInput.checked = false;
        }
    }, [data]);

    const changeHandler = (e) => {
        setSelected(e.target.value);
        if (error) setError('');
    };

    const nextClickHandler = () => {
        onAnswerUpdate((prevState) => [...prevState, { q: data.question, a: selected }]);
        setSelected('');
        if (currentQuestion < numberOfQuestions - 1) {
            onSetCurrentQuestion(currentQuestion + 1);
        } else {
            onSetMenu('result');
        }
        setKey((prevKey) => prevKey + 1); // Restart the timer
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentQuestion === numberOfQuestions - 1) {
                onSetMenu('result');
            } else {
                onSetCurrentQuestion(currentQuestion + 1);
            }
        }, 10 * 1000);
        return () => clearTimeout(timer);
    }, [currentQuestion]);

    const renderTime = () => (
        <div className="flex items-center justify-center text-4xl font-extrabold">
            {currentQuestion + 1}/{numberOfQuestions}
        </div>
    );

    return (
        <div className="relative w-full h-full bg-gradient-to-b from-transparent to-purple-300 flex flex-col items-center">
            <img src={Quiz_Bubbles} alt="Quiz Bubbles" className="w-1/2 sm:w-1/3 lg:w-1/4 mt-4" />

            {/* Added flex and items-center to the timer container for better alignment */}
            <div className="relative flex justify-center items-center w-64 h-64 bg-white rounded-full z-10 mt-6">
                <CountdownCircleTimer
                    key={key}
                    size={222}
                    strokeWidth={15}
                    isPlaying
                    rotation="counterclockwise"
                    duration={10}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: true })}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </div>

            <div className="bg-white w-full max-w-lg rounded-t-3xl shadow-lg mt-8 p-6">
                <h2 className="text-3xl font-bold mb-6">{data.question}</h2>
                {data.src && <img src={data.src} alt="Question Visual" className="w-full mb-6" />}
                <div className="space-y-4" ref={radiosWrapper}>
                    {data.choices.map((choice, i) => (
                        <label key={i} className="flex items-center bg-gray-100 p-4 rounded-lg hover:border-green-500 hover:border-2">
                            <input
                                type="radio"
                                name="answer"
                                value={choice}
                                onChange={changeHandler}
                                className="w-6 h-6 mr-4"
                            />
                            <span className="text-xl">{choice}</span>
                        </label>
                    ))}
                </div>
                <button
                    className="bg-red-500 text-white font-bold text-xl py-4 w-full rounded-xl mt-8 hover:bg-red-600 transition-all"
                    onClick={nextClickHandler}
                >
                    <img src={Next_Arrow} alt="Next" className="inline-block" />
                </button>
            </div>
        </div>

    );
};

export default Quiz;

// -----------------Above code is used for manually adding questions in quizquestions.js file *****************************
// ------------------------------Below code uses API to fetch questions ***********************************

// import React, { useState, useEffect, useRef } from 'react';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// import Quiz_Bubbles from '../Icons/quiz_bubbles.svg';
// import Next_Arrow from '../Icons/next.svg';

// const Quiz = ({
//     data,
//     onAnswerUpdate,
//     numberOfQuestions,
//     currentQuestion,
//     onSetCurrentQuestion,
//     onSetMenu,
// }) => {
//     const [selected, setSelected] = useState('');
//     const [error, setError] = useState('');
//     const radiosWrapper = useRef();
//     const [key, setKey] = useState(0);

//     useEffect(() => {
//         const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
//         if (findCheckedInput) {
//             findCheckedInput.checked = false;
//         }
//     }, [data]);

//     const changeHandler = (e) => {
//         setSelected(e.target.value);
//         if (error) setError('');
//     };

//     const nextClickHandler = () => {
//         onAnswerUpdate((prevState) => [...prevState, { q: data.question, a: selected }]);
//         setSelected('');
//         if (currentQuestion < numberOfQuestions - 1) {
//             onSetCurrentQuestion(currentQuestion + 1);
//         } else {
//             onSetMenu('result');
//         }
//         setKey((prevKey) => prevKey + 1); // Restart the timer
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             if (currentQuestion === numberOfQuestions - 1) {
//                 onSetMenu('result');
//             } else {
//                 onSetCurrentQuestion(currentQuestion + 1);
//             }
//         }, 10 * 1000);
//         return () => clearTimeout(timer);
//     }, [currentQuestion]);

//     const renderTime = () => (
//         <div className="flex items-center justify-center text-4xl font-extrabold">
//             {currentQuestion + 1}/{numberOfQuestions}
//         </div>
//     );

//     return (
//         <div className="relative w-full h-full bg-gradient-to-b from-transparent to-purple-300 flex flex-col items-center">
//             <img src={Quiz_Bubbles} alt="Quiz Bubbles" className="w-1/2 sm:w-1/3 lg:w-1/4 mt-4" />

//             <div className="relative flex justify-center items-center w-64 h-64 bg-white rounded-full z-10 mt-6">
//                 <CountdownCircleTimer
//                     key={key}
//                     size={222}
//                     strokeWidth={15}
//                     isPlaying
//                     rotation="counterclockwise"
//                     duration={10}
//                     colors={['#004777', '#F7B801', '#A30000', '#A30000']}
//                     colorsTime={[10, 6, 3, 0]}
//                     onComplete={() => ({ shouldRepeat: true })}
//                 >
//                     {renderTime}
//                 </CountdownCircleTimer>
//             </div>

//             <div className="bg-white w-full max-w-lg rounded-t-3xl shadow-lg mt-8 p-6">
//                 <h2 className="text-3xl font-bold mb-6">{data.question}</h2>
//                 {data.src && <img src={data.src} alt="Question Visual" className="w-full mb-6" />}
//                 <div className="space-y-4" ref={radiosWrapper}>
//                     {data.choices && data.choices.length > 0 ? (
//                         data.choices.map((choice, i) => (
//                             <label key={i} className="flex items-center bg-gray-100 p-4 rounded-lg hover:border-green-500 hover:border-2">
//                                 <input
//                                     type="radio"
//                                     name="answer"
//                                     value={choice}
//                                     onChange={changeHandler}
//                                     className="w-6 h-6 mr-4"
//                                 />
//                                 <span className="text-xl">{choice}</span>
//                             </label>
//                         ))
//                     ) : (
//                         <p>No choices available.</p> // Handle the case where choices are not defined
//                     )}
//                 </div>
//                 <button
//                     className="bg-red-500 text-white font-bold text-xl py-4 w-full rounded-xl mt-8 hover:bg-red-600 transition-all"
//                     onClick={nextClickHandler}
//                 >
//                     <img src={Next_Arrow} alt="Next" className="inline-block" />
//                 </button>
//             </div>
//         </div>
//     );
// };

// // Default props to avoid errors if data is not passed
// Quiz.defaultProps = {
//     data: {
//         question: '',
//         choices: [],
//         src: ''
//     }
// };

// export default Quiz;
