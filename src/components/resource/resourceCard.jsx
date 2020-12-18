import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ResourceCard = ({ item, onDelete }) => {
  const { _id, title, resourceUrl, coverUrl, level } = item;

  return (
    <div className='col text-center'>
      <div className='card'>
        <img
          src={coverUrl}
          style={{ height: 150 }}
          className='card-img-top'
          alt={title}
        />
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
          <div className='row-col m-3'>
            <Link to={`/resources/${_id}`} className='btn btn-warning me-3'>
              Update
            </Link>
            <button
              onClick={() => {
                onDelete(_id);
              }}
              className='btn btn-danger me-3'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ResourceCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ResourceCard;
