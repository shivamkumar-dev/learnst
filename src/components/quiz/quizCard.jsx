import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = ({ item }) => {
  const { title, level, category, _id } = item;
  // Display All Quizzes On Quizzes Section
  return (
    <div className='col-sm-6 text-center'>
      <div className='card'>
        <div className='card-body'>
          <h3 className='card-title'>{title}</h3>
          <h5 className='card-title'>Category: {category.name}</h5>
          <p className='card-text'>Level: {level.name}</p>
          <Link to={`quizzes/${_id}`} className='btn btn-primary'>
            Start Quiz
          </Link>
          <div className='row-col m-3'>
            <Link to={`quizzes/update/${_id}`} className='btn btn-warning me-3'>
              Update
            </Link>
            <button className='btn btn-danger me-3'>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
