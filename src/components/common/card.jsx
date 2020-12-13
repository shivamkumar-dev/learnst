import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Card = ({ item }) => {
  const { title, resourceUrl, coverUrl, level } = item;

  return (
    <div className='col text-center'>
      <div className='card'>
        <img src={coverUrl} className='card-img-top' alt={title} />
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

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Card;
