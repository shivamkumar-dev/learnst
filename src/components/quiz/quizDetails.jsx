import React, { useState, useEffect } from 'react';
import { getQuizzes } from '../../services/quizService';
import QuestionBox from './questionBox';
const QuizDetails = ({ match, history }) => {
  // State
  const [quizzes, setQuizzes] = useState([]);

  // Getting All Quizzes From API
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await getQuizzes();
      if (mounted) {
        setQuizzes(data);
      }
    })();
    return () => (mounted = false);
  }, []);

  // Display "Loading..." until data fetched from API
  if (quizzes.length === 0) return <h1>Loading...</h1>;

  // Filtering Selected Quiz with  Quiz ID
  const [filteredQuiz] = quizzes.filter((q) => q._id === match.params.id);
  const { title, quiz } = filteredQuiz;

  // Display Quiz
  return (
    <div className='text-center my-4'>
      <h1>{title}</h1>
      <div className='wrapper my-4'>
        <QuestionBox quiz={quiz} />
      </div>
      <button
        onClick={() => history.push('/quizzes')}
        className='btn btn-primary'
      >
        Back
      </button>
    </div>
  );
};

export default QuizDetails;
