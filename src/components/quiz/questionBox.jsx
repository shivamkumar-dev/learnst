import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const QuestionBox = ({ quiz }) => {
  // States
  const [answerBox, setAnswerBox] = useState([]);
  const [score, setScore] = useState(0);
  const [displayResult, setDisplayResult] = useState(false);
  const history = useHistory();

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
  const handleSubmit = () => {
    let countScore = 0;
    answerBox.map((a) =>
      a.selectedAnswer === a.answer ? (countScore = countScore + 1) : null
    );
    setScore(countScore);
    setDisplayResult(true);
  };

  // Display Result
  if (displayResult)
    return (
      <>
        <h1>
          Got {score}...Attempted {answerBox.length}...Total Question{' '}
          {quiz.length}
        </h1>
        <button
          onClick={() => history.push('/quizzes')}
          className='btn btn-primary me-4'
        >
          Back
        </button>
      </>
    );

  // Display Questions
  return (
    <>
      {quiz.map((q, l) => (
        <div key={q._id}>
          <h5>
            Q{`${l + 1}.)`} {q.question}
          </h5>
          <div onChange={(e) => handleAnswer(e)}>
            {q.options.map((option, i) => (
              <span key={i}>
                {`${i + 1}.)`}{' '}
                <input type='radio' value={i} name={q.question} /> {option}
                <br />
              </span>
            ))}
          </div>
          <br />
        </div>
      ))}
      <button
        onClick={() => history.push('/quizzes')}
        className='btn btn-primary me-4'
      >
        Back
      </button>
      <button onClick={handleSubmit} className='btn btn-primary my-4'>
        Submit
      </button>
    </>
  );
};

export default QuestionBox;
