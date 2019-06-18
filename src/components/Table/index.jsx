import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './table.css';
import Pagination from '../Pagination';

const Table = () => {
  
  const [photos, setPhotos] = useState(null);
  const [itemLength, setItemLength] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState({
    path: 'id',
    order: 'asc'
  })

  useEffect(() => {
    async function fetchData() {
      const { data: { photos, pageNumber } } = await axios.get(`/api/photos?page=${currentPage}`);
      setPhotos(photos)
      setItemLength(pageNumber);
    }
    fetchData();
  }, [itemLength]);

  useEffect(() => {
    const newPhotos = _.orderBy(photos, [sortColumn.path], [sortColumn.order])
    setPhotos(newPhotos);
  }, [sortColumn, currentPage]);

  const handleSort = path => {
    let order = 'asc'
    if( sortColumn.path === path ) {
      order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    }
    setSortColumn({ path, order })
  }

  const handelePageChange = async page => {
    const { data: { photos } } = await axios.get(`/api/photos?page=${page}`);
    setPhotos(photos)
    setCurrentPage(page);
  }

  const handleSortClassName = column => {
    if ( column !== sortColumn.path ) return
    if(sortColumn.order === 'asc') return 'sorted asc'
    return 'sorted desc'
  }

  return (
    <div className="container">
      <h1>Table Representation of API data.</h1>
      <div className="table-1">
        <table>
          <tbody>
            <tr>
              <th className={ handleSortClassName('id') } onClick={() => handleSort('id')}>ID</th>
              <th className={ handleSortClassName('title') } onClick={() => handleSort('title')}>Title</th>
              <th className={ handleSortClassName('url') } onClick={() => handleSort('url')}>URL</th>
            </tr>
            { !photos && (
              <p>Loading..</p>
            )}
            { photos && photos.map(el => (
              <tr key={el.id}>
                <td data-th="ID">{ el.id }</td>
                <td data-th="Title">{el.title.length > 40 ? `${el.title.slice(0, 40)}...` : el.title }</td>
                <td data-th="URL"> {el.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemsCount={itemLength || 10} pageSize={pageSize} onPageChange={handelePageChange} currentPage={currentPage}/>
      </div>
    </div>
   );
}
 
export default Table
