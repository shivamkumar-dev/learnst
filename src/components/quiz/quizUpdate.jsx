import React from 'react';

const QuizUpdate = ({ match, history }) => {
  return (
    <div>
      <h1>Update Quiz-{match.params.id}</h1>
      <button
        onClick={() => history.push('/quizzes')}
        className='btn btn-primary'
      >
        Back
      </button>
    </div>
  );
};

export default QuizUpdate;
