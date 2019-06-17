import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './table.css';
import Pagination from '../Pagination';

const Table = () => {
  
  const [photos, setPhotos] = useState(null);
  const [itemLength, setItemLength] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10)

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const { data: { photos, itemsNumber } } = await axios.get(`http://localhost:3001/api/photos?page=${currentPage}`);
      setPhotos(photos)
      setItemLength(itemsNumber);
    }
    fetchData();
  }, [itemLength]); // Or [] if effect doesn't need props or state;

  // const 

  const handelePageChange = async page => {
    console.log(page)
    const { data: { photos } } = await axios.get(`http://localhost:3001/api/photos?page=${page}`);
    setPhotos(photos)
    setCurrentPage(page);
  }

  return (
    <div className="container">
      <h1>Table Representation of API data.</h1>
      <div className="table-1">
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>URL</th>
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
