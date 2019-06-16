import React from 'react';
import _ from 'lodash';
import propTypes from 'prop-types';
import './pagination.css';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if(pagesCount === 1 ) return null;
  const pages =  _.range(1, pagesCount + 1);

  return (
    <div className="pagination">
      <ul>
        <li><a href>Prev</a></li>
        { pages.map(page => (
            <li key={page} className={currentPage === page ? 'active': null }>
              <a href onClick={() => onPageChange(page)}>{page}</a>
            </li>
        ))}
        
        <li><a href>Next</a></li>
      </ul>
  </div>
  );
}

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
}


export default Pagination;