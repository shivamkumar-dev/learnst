import React from 'react';

const Card = ({ item }) => {
  const { title, resourceUrl, coverUrl, level } = item;

  return (
    <div className='col text-center'>
      <div className='card shadow-sm' style={{ width: '15rem' }}>
        <img src={coverUrl} className='card-img-top' alt='...' />
        <div className='card-body'>
          <h4 className='card-title'>{title}</h4>
          <h6>Level: {level.name}</h6>
          <a
            href={resourceUrl}
            className='btn btn-primary'
            target='_blank'
            rel='noreferrer'
          >
            Go To Resource
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
