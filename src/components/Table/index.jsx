import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './table.css';
import Pagination from '../Pagination';
import axios from 'axios';
const Table = () => {
  
  const [photos, setPhotos] = useState(null);
  const [photosData, setPhotosData] = useState({
    photos: null,
    pagesCount: null
  });
  const [pagesCount, setPagesCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState({
    path: 'id',
    order: 'asc'
  })

  useEffect(() => {
    async function fetchData() {
      
      const cachedPhotos = JSON.parse(localStorage.getItem('cachedPhotos'));
      const cachedPagesCount = parseInt(localStorage.getItem('cachedPagesCount'));

      setPhotosData({
        photos: cachedPhotos,
        pagesCount: cachedPagesCount
      })
      if(!cachedPhotos || !cachedPagesCount) {
        const { data: { photos, pageNumber } } = await axios.get(`/api/photos?page=${currentPage}`);
        console.log({photos, pageNumber})
        setPhotosData({
          photos,
          pagesCount: pageNumber
        })
        localStorage.setItem('cachedPhotos', JSON.stringify(photos));
        localStorage.setItem('cachedPagesCount', pageNumber);
      }
      console.log(cachedPhotos)
      
    }
    fetchData();
  }, [pagesCount]);

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
    const pagesCount = photosData.pagesCount;
    setPhotosData({
      photos,
      pagesCount
    })
    setCurrentPage(page);
    console.log(photosData.pagesCount)
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
            { !photosData.photos && (
              <p>Loading..</p>
            )}
            { photosData.photos && photosData.photos.map(el => (
              <tr key={el.id}>
                <td data-th="ID">{ el.id }</td>
                <td data-th="Title">{el.title.length > 40 ? `${el.title.slice(0, 40)}...` : el.title }</td>
                <td data-th="URL"> {el.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pagesCount={photosData.pagesCount || 10} pageSize={pageSize} onPageChange={handelePageChange} currentPage={currentPage}/>
      </div>
    </div>
   );
}
 
export default Table
