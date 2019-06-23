import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import './table.css';
import Pagination from '../Pagination';
import TrimString from '../../util/trimString';
import fetchApiData from '../../util/fetchData';
import SideBar from '../SideBar';
const Table = () => {
  
  const [photos, setPhotos] = useState(null);
  const [itemPerRequest, setItemPerRequest] = useState(10);
  const [pagesCount, setPagesCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortPath, setSortPath] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sideBar, setSideBar] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const inputEl = useRef(null);

  useEffect(() => {
    async function fetchData() {
      
      // const cachedPhotos = JSON.parse(localStorage.getItem('cachedPhotos'));
      // const cachedPagesCount = parseInt(localStorage.getItem('cachedPagesCount'));
      
      // setPhotos(cachedPhotos)
      // setPagesCount(cachedPagesCount);
      // console.log(photos, 'loaded from cache')

      // if(!cachedPhotos || !cachedPagesCount) {
        // if(!photos && ) {
          const { data: { photos, pagesCount } } = await fetchApiData(currentPage, itemPerRequest);
          setPhotos(photos)
          setPagesCount(pagesCount);
          // localStorage.setItem('cachedPhotos', JSON.stringify(photos));
          // localStorage.setItem('cachedPagesCount', pagesCount);
          console.log({photos, pagesCount}, "initial load")
        // }

      // }
    }
    fetchData();

  }, [pagesCount, itemPerRequest]);

  useEffect(() => {
    const newPhotos = _.orderBy(photos, [sortPath], [sortOrder])
    setPhotos(newPhotos);
    
  }, [sortPath, sortOrder, currentPage ]);

  const handleSort = path => {
    let order = 'asc'
    if( sortPath === path ) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    setSortPath(path)
    setSortOrder(order)
  }

  const handelePageChange = async page => {
    const { data: { photos } } = await fetchApiData(page, itemPerRequest);
    setPhotos(photos)
    setCurrentPage(page);
  }

  const handleSortClassName = column => {
    if ( column !== sortPath ) return
    if(sortOrder === 'asc') return 'sorted asc'
    return 'sorted desc'
  }

  const handlItemPerPageChange = async e => {
    e.preventDefault();
    setItemPerRequest(inputEl.current.value)
    const { data: { photos, pagesCount } } = await fetchApiData(1, itemPerRequest);
    setPhotos(photos)
    setPagesCount(pagesCount);
    setCurrentPage(1);
  }

  const handleRowDetails = item => {
    console.log(item)
    setActiveItem(item);
    setSideBar(true);
  }

  const handleSideBarClose = () => {
    setSideBar(false);
  }

  return (
    <div className="container">
      <h1>Table Representation of API data.</h1>
      <div className="photo-perpage">
        <input placeholder="Enter the number of items per page. 10 is default" ref={inputEl} type="text"/>
        <button onClick={handlItemPerPageChange}>Submit</button>
      </div>
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
            <tr key={el.id} onClick={ () => handleRowDetails(el) }>
              <td data-th="ID">{ el.id }</td>
              <td data-th="Title">{TrimString(el.title, 60, 25) }</td>
              <td data-th="URL">{TrimString(el.url, 60, 25) }</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pagesCount={pagesCount || 10} pageSize={pageSize} onPageChange={handelePageChange} currentPage={currentPage}/>
      <SideBar sideBar={sideBar}  onSideBarClose={handleSideBarClose} item={activeItem} />
    </div>
   );
}
 
export default Table
