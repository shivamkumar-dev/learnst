import React from 'react';

const QuizCard = ({ item }) => {
  const { title, level, category } = item;
  return (
    <div class='col-sm-6'>
      <div class='card'>
        <div class='card-body'>
          <h3 class='card-title'>{title}</h3>
          <h5 class='card-title'>Category: {category.name}</h5>
          <p class='card-text'>Level: {level.name}</p>
          <a href='#' class='btn btn-primary'>
            Start Quiz
          </a>
          {/* <div className='row-col m-3'>
          <Button className='btn btn-warning me-3' label='Update' />
          <Button className='btn btn-danger ms-3' label='Delete' />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
