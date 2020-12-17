import React, { useState, useEffect } from 'react';
import { getQuiz } from '../../services/quizService';
import QuestionBox from './questionBox';
const QuizDetails = ({ match, history }) => {
  // State
  const [Quiz, setQuiz] = useState([]);

  // Getting Quiz From API
  const quizId = match.params.id;
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await getQuiz(quizId);
      if (mounted) {
        setQuiz(data);
      }
    })();
    return () => (mounted = false);
  }, [quizId]);

  // Display "Loading..." until data fetched from API
  if (Quiz.length === 0)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );

  // Display Quiz
  return (
    <>
      <div className='text-center my-4'>
        <h1>{Quiz.title}</h1>
        <div className='wrapper my-4'>
          <QuestionBox quiz={Quiz.quiz} />
        </div>
        <button
          onClick={() => history.push('/quizzes')}
          className='btn btn-primary'
        >
          Back
        </button>
      </div>
    </>
  );
};

export default QuizDetails;
