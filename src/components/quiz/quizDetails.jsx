import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getQuiz } from '../../services/quizService';
import QuestionBox from './questionBox';
const QuizDetails = () => {
  // State
  const [Quiz, setQuiz] = useState([]);

  const { id } = useParams();
  const history = useHistory();

  // Getting Quiz From API
  useEffect(() => {
    const quizId = id;
    let mounted = true;
    (async () => {
      const { data } = await getQuiz(quizId);
      if (mounted) {
        setQuiz(data);
      }
    })();
    return () => (mounted = false);
  }, [id]);

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
