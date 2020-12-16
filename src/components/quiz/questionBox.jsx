import React, { useState } from 'react';

const QuestionBox = ({ quiz }) => {
  // States
  const [answerBox, setAnswerBox] = useState([]);
  const [score, setScore] = useState(0);

  // Alraedy Attempted & New Attempted Question Handler
  const handleAnswer = ({ target }) => {
    let newAnswerBox = [...answerBox];
    // If Question is already Attempted
    let attempted = newAnswerBox.find((a) => a.question === target.name);
    if (attempted) {
      const index = newAnswerBox.indexOf(attempted);
      newAnswerBox[index].selectedAnswer = target.value;
      setAnswerBox(newAnswerBox);

      // If Question is not Attempted
    } else {
      let attemptedAnswer = quiz.find((a) => a.question === target.name);
      const index = quiz.indexOf(attemptedAnswer);

      attempted = {
        question: target.name,
        selectedAnswer: target.value,
        answer: quiz[index].answer,
      };
      newAnswerBox = [...newAnswerBox, attempted];
      setAnswerBox(newAnswerBox);
    }
  };

  // Score Handler
  const handleScore = () => {
    let countScore = 0;
    answerBox.map((a) =>
      a.selectedAnswer === a.answer ? (countScore = countScore + 1) : null
    );
    setScore(countScore);
  };

  // Display Result
  if (score > 0)
    return (
      <h1>
        Got {score}...Attempted {answerBox.length}...Total Question{' '}
        {quiz.length}
      </h1>
    );

  // Display Questions
  return (
    <>
      {quiz.map((q) => (
        <div key={q._id}>
          <h5>Q. {q.question}</h5>
          <div onChange={(e) => handleAnswer(e)}>
            {q.options.map((option, i) => (
              <span key={i}>
                <input type='radio' value={option} name={q.question} />
                {option}
              </span>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleScore}>Submit</button>
    </>
  );
};

export default QuestionBox;
