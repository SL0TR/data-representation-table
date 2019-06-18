import React, { useState }from 'react';
import propTypes from 'prop-types';
import './pagination.css';

const Pagination = ({ pagesCount, pageSize, currentPage, onPageChange }) => {
  const allPages = Array.from(Array(pagesCount), (_,x) => x+1);
  const [pages, setPages] = useState(allPages.filter(page => page <= 10))
  
  const nextPage = num => {
    setPages(pages.map(el => el + num));
    onPageChange(pages[0] + num)
  }

  const prevPage = num => {
    setPages(pages.map(el => el - num));
    onPageChange(pages[0] - num)
  }

  return (
    <div className="pagination">
      <ul>
        {  currentPage > pageSize && (
          <li><a href onClick={() => prevPage(10)}>Prev</a></li>
        ) }
        { pages.map(page => (
            <li key={page} className={currentPage === page ? 'active': null }>
              <a href onClick={() => onPageChange(page)}>{page}</a>
            </li>
        ))}

        { (pages[pages.length - 1]  ) < allPages.length && (
          <li><a href onClick={() => nextPage(10)}>Next</a></li>
        ) }
        
      </ul>
  </div>
  );
}

Pagination.propTypes = {
  pagesCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
}


export default Pagination;