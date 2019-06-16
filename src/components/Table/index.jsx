import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Table = () => {
  
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const { data } = await axios.get('http://localhost:3001/api/photos');
      const filteredData = data.filter(el => el.id < 100)
      setPhotos(filteredData)
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state;

  return (
    <div className="container">
      <h1>Table Representation of API data</h1>
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
                <td data-th="ID">{el.id}</td>
                <td data-th="Title">{el.title}</td>
                <td data-th="URL"> {el.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   );
}
 
export default Table
