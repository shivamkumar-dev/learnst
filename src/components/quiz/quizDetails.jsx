import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuiz } from '../../services/quizService';
import QuestionBox from './questionBox';
const QuizDetails = () => {
  // State
  const [Quiz, setQuiz] = useState([]);

  // Getting Quiz From API
  const { id } = useParams();
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
      <div className='text-start my-4'>
        <h1>{Quiz.title}</h1>
        <br />
        <div className='container'>
          <QuestionBox quiz={Quiz.quiz} />
        </div>
      </div>
    </>
  );
};

export default QuizDetails;
